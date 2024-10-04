import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash";
import { BackHandler, SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isLoadingSelector } from "../../appContainer/redux/selectors";
import {
  CustomRenderHtml,
  CustomText,
  CustomTextInput,
  HeaderSVG,
  Loader,
} from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
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
import CustomImageWithZoom from "../../components/CustomImageWithZoom";
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
import CustomDropDown from "../../components/CustomDropdown";
import { localize } from "../../locale/utils";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomSwitch from "../../components/CustomSwitch";

const stateStructure = createStructuredSelector({
  corporateCommuncationDetails: getCorporateCommunicationDetailsSelector,
  isLoading: isLoadingSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
});

const keyValuePairs = [
  { key: "unit_status", label: "Unit Status" },
  { key: "contract", label: "Contract" },
  { key: "brand", label: "Brand" },
];

const yesOrNoPairs = [
  { key: "unit_status", label: "Store Closed" },
  { key: "contract", label: "Wrong Location" },
  { key: "brand", label: "Brand Changed" },
  { key: "contract", label: "Open without Contract" },
  { key: "brand", label: "Others" },
];
const DiscrepancyDetails = (props: any) => {
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
          <ScrollView>
            
          <View style={styles.paddingContainer}>
            <CustomTextInput label={"Mall"} />
          </View>
          <View style={styles.formDropdown}>
            <CustomDropDown
              data={[{ label: "df", value: "sdsd" }]}
              isCard={false}
              label={localize("form.level")}
              placeholder={localize("form.selectAValue")}
              onChange={(item) => {}}
            />
          </View>
          <View style={styles.formDropdown}>
            <CustomDropDown
              data={[{ label: "dfe", value: "sdsd" }]}
              isCard={false}
              label={localize("form.unit")}
              placeholder={localize("form.selectAValue")}
              onChange={(item) => {}}
            />
          </View>
          <View style={styles.paddingContainer}>
            {keyValuePairs?.map(({ key, label }) => (
              <View
                style={{
                  marginTop: RfH(14),
                  flexDirection: "row",
                  alignItems: "center",
                }}
                key={key}
              >
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    marginStart: RfW(5),
                    lineHeight: RfH(20),
                    ...CommonStyles.boldFontStyle,
                  }}
                >
                  {label}:
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    marginStart: RfW(5),
                    lineHeight: RfH(20),
                    ...CommonStyles.regularFont400Style,
                  }}
                >
                  {key}
                </CustomText>
              </View>
            ))}
          </View>
          <View style={styles.paddingContainer}>
            <View
              style={{
                marginTop: RfH(14),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomText
                fontSize={14}
                color={Colors.white}
                styling={{
                  marginStart: RfW(5),
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
              >
                Review Status:
              </CustomText>
              <CustomRadioButton
                icon={
                  false ? Images.radioButtonActive : Images.radioButtonInactive
                }
                labelText={"match" || ""}
                containerStyle={{ width: "50%", paddingTop: RfH(10) }}
                onSelect={() => {}}
              />
              <CustomRadioButton
                icon={
                  false ? Images.radioButtonActive : Images.radioButtonInactive
                }
                labelText={"mismatch" || ""}
                containerStyle={{ width: "50%", paddingTop: RfH(10) }}
                onSelect={() => {}}
              />
            </View>
            <View>
              {yesOrNoPairs?.map(({ label, key }) => (
                <View
                  style={{
                    marginTop: RfH(14),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'space-between'
                  }}
                  key={key}
                >
                  <CustomText
                    fontSize={14}
                    color={Colors.white}
                    styling={{
                      marginStart: RfW(5),
                      lineHeight: RfH(20),
                      ...CommonStyles.boldFontStyle,
                    }}
                  >
                    {label}:
                  </CustomText>
                  <CustomSwitch
                    disabled={false}
                    onValueChange={() => {}}
                    value={true}
                  />
                </View>
              ))}
            </View>
          </View>
          </ScrollView>
        </View>
        {/* <Loader isLoading={isLoading || partialLoading} /> */}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default DiscrepancyDetails;
