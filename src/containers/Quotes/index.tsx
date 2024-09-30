import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Linking,
  Button,
  StyleSheet,
  Text,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { CustomImage, CustomText, IconButtonWrapper } from "../../components";
import CustomModal from "../../components/CustomModal";
import { Colors, CommonStyles, Fonts, Images } from "../../theme";
import { RfH, RfW } from "../../utils/helper";
import { deviceWidth, getSaveData, storeData } from "../../utils/helpers";
import { localize } from "../../locale/utils";
import { LOCAL_STORAGE_DATA_KEY } from "../../utils/constants";
import { createStructuredSelector } from "reselect";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { useSelector } from "react-redux";
import NavigationRouteNames from "../../routes/ScreenNames";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
});

const Quotes = (props: any) => {
  const navigation = useNavigation();
  const { isVisible, list = [], onRequestClose, isDarkMode } = props || {};
  const [activeSlide, setActiveSlide] = useState(0);

  const { myProfileDetails } = useSelector(stateSelector);

  // const updateReadedQuoteList = async (clickedItemId?: string) => {
  //   const allSavedData = JSON.parse(
  //     (await getSaveData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA)) || '{}'
  //   );
  //   let readIds = allSavedData?.[myProfileDetails?.username] || [];

  //   if (clickedItemId) {
  //     readIds.push(clickedItemId);
  //   }

  //   storeData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA, {
  //     ...allSavedData,
  //     [myProfileDetails?.username]: readIds
  //   });
  // };

  useEffect(() => {
    storeData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA, {
      [myProfileDetails?.username]: list[0]?.createdAt,
    });
    // viewQuote(0);
  }, []);

  const renderQuotesList = ({ item }) => {
    console.log("items is full", item);
    return (
      <View
        style={{
          // backgroundColor: isDarkMode
          //   ? Colors.darkModeButton
          //   : 'background: rgba(238, 236, 236, 1)',
          height: RfH(270),
          marginTop: RfH(15),
        }}
      >
        {/* <CustomImage
          image={Images.formatQuoteIcon}
          imageHeight={RfH(50)}
          imageWidth={RfH(50)}
          styling={{ marginTop: RfH(10), marginLeft: RfW(10) }}
          tintColor={Colors.calendarPrimaryColor}
        /> */}
        <View style={{ flex: 1 }}>
          <CustomText
            fontSize={22}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(32),
              marginLeft: RfW(15),
              textAlign: "center",
            }}
          >
            {`${item?.quote?.content?.[0]?.content?.[0]?.value}`}
          </CustomText>
          <CustomText
            numberOfLines={2}
            fontSize={12}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(12),
              marginLeft: RfW(2),
              marginTop: RfH(10),
              marginBottom: RfH(7),
              textAlign: "center",
            }}
          >
            {item?.author || ""}
          </CustomText>

          {/* <CustomText
            fontSize={22}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(32),
              marginLeft: RfW(15),
              textAlign: "center",
            }}
            onPress={() =>
              Linking.openURL(item?.quote.content[1].content[1].data.uri)
            }
          >
            {`${item?.quote.content[1].content[1].content[0].value}`}
          </CustomText>
          <CustomText
            fontSize={22}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(32),
              marginLeft: RfW(15),
              textAlign: "center",
            }}
            onPress={() =>
              Linking.openURL(item?.quote.content[2].content[1].data.uri)
            }
          >
            {`${item?.quote.content[2].content[1].content[0].value}`}
          </CustomText> */}

          <View style={styles.container}>
            {/* <View style={styles.buttonContainer}> */}
            <TouchableOpacity
              style={styles.button}
              onPress={
                () => {
                  Linking.openURL(item?.quote?.content?.[1]?.content?.[1]?.data?.uri);
                  onRequestClose();
                }
                // Linking.openURL(item?.quote.content[1].content[1].data.uri)
              }
            >
              <Text style={styles.buttonText}>
                {item?.quote?.content?.[1]?.content?.[1]?.content?.[0]?.value}
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>

          {/* <CustomText
            fontSize={16}
            styling={{
              lineHeight: RfH(24),
              marginLeft: RfW(15),
              marginTop: RfH(16),
              ...CommonStyles.regularFont500Style
            }}>
            {item?.author}
          </CustomText> */}
        </View>
        {/* 
        <CustomImage
          image={Images.ellipseIcon}
          imageHeight={RfH(121)}
          imageWidth={RfH(50)}
          styling={{ alignSelf: 'flex-end' }}
        /> */}
      </View>
    );
  };

  // const viewQuote = (activeIndex) => {
  //   const filteredData = list?.find((_, fi) => activeIndex === fi);
  //   updateReadedQuoteList(filteredData?.id);
  // };

  if (isVisible) {
    return (
      <CustomModal
        modalVisible={isVisible}
        onRequestClose={onRequestClose}
        modalStyle={{
          width: deviceWidth() - RfW(20),
          backgroundColor: isDarkMode ? Colors.darkModeShadow : Colors.white,
          paddingBottom: 0,
        }}
      >
        <View
          style={{
            maxHeight: RfH(380),
            backgroundColor: isDarkMode
              ? Colors.darkModeShadow
              : Colors.primaryContainerColor,
            paddingHorizontal: RfW(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ paddingTop: RfH(20) }}>
              <CustomText
                fontSize={18}
                styling={{ ...CommonStyles.regularFont500Style }}
              >
                {/* {localize("quote.quoteOfTheDay")} */}
                {props?.list[0].internalName}
              </CustomText>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onRequestClose}
              style={{ marginRight: RfW(-12), padding: RfH(12) }}
            >
              <IconButtonWrapper
                iconWidth={RfH(18)}
                iconHeight={RfH(18)}
                iconImage={isDarkMode ? Images.crossWhite : Images.crossBlack}
              />
            </TouchableOpacity>
          </View>
          <Carousel
            data={list || []}
            renderItem={renderQuotesList}
            sliderWidth={deviceWidth() - RfW(40)}
            itemWidth={deviceWidth() - RfW(40)}
            onSnapToItem={(index) => {
              setActiveSlide(index);
              // viewQuote(index);
            }}
          />

          <Pagination
            dotsLength={list?.length}
            activeDotIndex={activeSlide}
            containerStyle={{
              position: "absolute",
              bottom: -RfH(25),
              justifyContent: "center",
              alignSelf: "center",
            }}
            dotStyle={{
              width: RfH(10),
              height: RfH(10),
              borderRadius: RfH(10),
              marginHorizontal: -RfH(5),
              backgroundColor: isDarkMode ? Colors.white : "#1D1237",
            }}
            inactiveDotStyle={{
              width: RfH(15),
              height: RfH(15),
              borderRadius: RfH(10),
              marginHorizontal: -RfH(5),
              backgroundColor: isDarkMode ? Colors.white : "#000",
            }}
          />
        </View>
      </CustomModal>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: "80%", // Adjust button container width as needed
  // },
  button: {
    backgroundColor: "#804cc9", // Blue background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10, // Space between buttons
  },
  buttonText: {
    color: "#FFFFFF", // White text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Quotes;
