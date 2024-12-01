import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isLoadingSelector } from "../../appContainer/redux/selectors";
import {
  CustomRenderHtml,
  CustomText,
  HeaderSVG,
  Loader,
} from "../../components";
import { Colors } from "../../theme";
import { EVENT_NAME, trackEvent } from "../../utils/analytics";
import {
  LOCAL_STORAGE_DATA_KEY,
  CC_TEMPLATE_TEXT,
  CC_TEMPLATE_IMAGE,
  CC_TEMPLATE_HTML,
} from "../../utils/constants";
import { RfH, RfW, getImageUrl } from "../../utils/helper";
import { getCorporateCommunicationDetails } from "../Home/redux/actions";
import { getCorporateCommunicationDetailsSelector } from "../Home/redux/selectors";
import styles from "./styles";
import {
  deviceWidth,
  getSaveData,
  isValidHtml,
  storeData,
} from "../../utils/helpers";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { isDarkModeSelector } from "../redux/selectors";
import Markdown from "react-native-markdown-display";
import WrapperContainer from "../../components/WrapperContainer";

const stateStructure = createStructuredSelector({
  corporateCommuncationDetails: getCorporateCommunicationDetailsSelector,
  isLoading: isLoadingSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
});

const CorporateCommunicationDetails = (props: any) => {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {
    corporateCommuncationDetails,
    isLoading,
    myProfileDetails,
    isDarkMode,
  } = useSelector(stateStructure);

  const [info, setInfo] = useState({
    source: "",
    height: 0,
    title: "",
    template: "",
  });
  const [partialLoading, setPartialLoading] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  // state to show loading indicator while we compute image dimensions
  const [isImageLoading, setIsImageLoading] = useState(true);
  useEffect(() => {
    setPartialLoading(true);
    trackEvent(EVENT_NAME.SCREEN_CORPORATE_COMM_DETAILS);
    setInfo({ source: "", height: 0, template: "", title: "" });
    dispatch(getCorporateCommunicationDetails.trigger({ id }));
  }, []);

  const updateCorporateList = async (clickedItemId?: string) => {
    const allSavedData = JSON.parse(
      (await getSaveData(LOCAL_STORAGE_DATA_KEY.CORP_COMMU_READED_DATA)) || "{}"
    );
    let readIds = allSavedData?.[myProfileDetails?.username] || [];

    if (clickedItemId) {
      readIds.push(clickedItemId);
    }

    // setReadItems(readIds);
    storeData(LOCAL_STORAGE_DATA_KEY.CORP_COMMU_READED_DATA, {
      ...allSavedData,
      [myProfileDetails?.username]: readIds,
    });
  };

  useEffect(() => {
    if (info?.template === CC_TEMPLATE_IMAGE && info?.source) {
      setIsImageLoading(true);
      Image.getSize(
        info?.source,
        (width, height) => {
          const screenWidth = Dimensions.get("window").width;
          const screenHeight = Dimensions.get("window").height;
          const imageAspectRatio = width / height;
          const screenAspectRatio = screenWidth / screenHeight;

          let newWidth: number;
          let newHeight: number;

          if (imageAspectRatio > screenAspectRatio) {
            newWidth = screenWidth;
            newHeight = screenWidth / imageAspectRatio;
          } else {
            newHeight = screenHeight * 0.8;
            newWidth = newHeight * imageAspectRatio;
          }

          setImageDimensions({ width: newWidth, height: newHeight });
          setIsImageLoading(false);
        },
        (error) => {
          console.error("Error getting image size:", error);
          setIsImageLoading(false);
        }
      );
    }
  }, [info?.source, info?.template]);

  useEffect(() => {
    if (!isEmpty(corporateCommuncationDetails)) {
      updateCorporateList(corporateCommuncationDetails?.id);
      const { template, content, mainImage, title } =
        corporateCommuncationDetails || {};

      const source =
        template === CC_TEMPLATE_IMAGE ? getImageUrl(mainImage?.url) : content;
      setInfo({ source, height: mainImage.height, template, title });

      setPartialLoading(false);
    }
  }, [corporateCommuncationDetails]);

  const backHandler = () => {
    setInfo({ source: "", height: 0, template: "", title: "" });
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("useCallback>>hardwareBackPress");
      if (isFocused) {
        BackHandler.addEventListener("hardwareBackPress", backHandler);
      }
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backHandler);
      };
    }, [isFocused])
  );

  const mainSection = () => {
    if (info?.template === CC_TEMPLATE_HTML) {
      return (
        <ScrollView>
          {isValidHtml(info?.source) ? (
            <CustomRenderHtml
              source={`<div>${info?.source}</div>`}
              tagsStyles={{
                div: {
                  maxWidth: deviceWidth(),
                  // marginHorizontal: RfW(12)
                },
              }}
              style={{
                backgroundColor: isDarkMode
                  ? Colors.darkModeBackground
                  : Colors.transparent,
              }}
            />
          ) : (
            <CustomText
              color={Colors.white}
              fontSize={15}
              styling={{ marginHorizontal: RfW(24), paddingBottom: RfH(30) }}
            >
              {info.source}
            </CustomText>
          )}
        </ScrollView>
      );
    } else if (info?.template === CC_TEMPLATE_TEXT) {
      return (
        <ScrollView
          style={{
            maxWidth: deviceWidth(),
            paddingHorizontal: RfW(24),
          }}
        >
          <Markdown
            style={
              isDarkMode
                ? {
                    text: {
                      color: Colors.white,
                    },
                  }
                : {
                    text: {
                      color: Colors.white,
                    },
                  }
            }
          >
            {info.source}
          </Markdown>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingTop: RfH(20),
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          }}
        >
          {info?.source ? (
            isImageLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            ) : (
              <Image
                source={{ uri: info.source }}
                style={{
                  width: imageDimensions.width,
                  height: imageDimensions.height,
                }}
                resizeMode="contain"
              />
            )
          ) : null}
        </ScrollView>
      );
    }
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode
            ? info?.template !== CC_TEMPLATE_TEXT || !isValidHtml(info?.source)
              ? Colors.darkModeBackground
              : Colors.white
            : Colors.transparent,
        }}
      >
        <View
          style={{
            flex: 1,
            // paddingTop: RfH(10),
          }}
        >
          <HeaderSVG
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText={
              !isEmpty(corporateCommuncationDetails) ? info?.title : ""
            }
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => backHandler()}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
            containerStyle={{ zIndex: 99999 }}
          />
          {!isEmpty(corporateCommuncationDetails) ? mainSection() : <></>}
        </View>
        <Loader isLoading={isLoading || partialLoading} />
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default CorporateCommunicationDetails;
