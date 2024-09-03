import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CustomImage, CustomText } from "../../../components";
import AppPrimaryButton from "../../../components/AppPrimaryButton";
import CustomModal from "../../../components/CustomModal";
import { Colors, CommonStyles, Images } from "../../../theme";
import { RfH, RfW, getColorWithOpacity } from "../../../utils/helper";
import { deviceWidth } from "../../../utils/helpers";
import { getMyProfileDetailsSelector } from "../../LoginHome/redux/selectors";
import { useNavigation } from "@react-navigation/core";
import NavigationRouteNames from "../../../routes/ScreenNames";
import { localize } from "../../../locale/utils";

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
});

const PendingDocumentModal = (props: any) => {
  const { isVisible, list = [], onRequestClose, isDarkMode } = props || {};
  const [activeSlide, setActiveSlide] = useState(0);

  const navigation = useNavigation();

  const { myProfileDetails } = useSelector(stateSelector);

  const renderItemData = ({ item }) => {
    return (
      <View
        style={{
          height: RfH(250),
          marginTop: RfH(20),
        }}
      >
        <CustomImage
          image={Images.documentAcknowledge}
          imageHeight={RfH(180)}
          imageWidth={RfW(184)}
          imageResizeMode={"contain"}
          styling={{ alignSelf: "center" }}
        />
        <CustomText
          allowFontScaling={false}
          fontSize={14}
          color={Colors.white}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(24),
            textAlign: "center",
            paddingTop: RfH(30),
            paddingHorizontal: RfW(30),
          }}
        >{`${localize("documents.clickHereToViewAndAck")} ${
          item?.name
        } ${localize("documents.documentation")}.`}</CustomText>

        <View style={{ paddingHorizontal: RfW(32), paddingTop: RfH(30) }}>
          <AppPrimaryButton
            buttonText={localize("documents.viewAndAcknowledge")}
            allowFontScaling={false}
            onPress={() => {
              onRequestClose();
              navigation.navigate(NavigationRouteNames.DOCUMENT_VIEW as never, {
                id: item?.id,
              });
            }}
          />
        </View>
      </View>
    );
  };

  if (isVisible) {
    return (
      <CustomModal
        modalVisible={isVisible}
        onRequestClose={onRequestClose}
        modalStyle={{
          width: deviceWidth() - RfW(20),
          backgroundColor: isDarkMode
            ? Colors.darkModeShadow
            : Colors.transparent,
          paddingBottom: 0,
        }}
      >
        <View
          style={{
            maxHeight: RfH(450),
            backgroundColor: isDarkMode
              ? Colors.darkModeShadow
              : Colors.modalForegroundColor,
            paddingHorizontal: RfW(10),
            borderRadius: RfW(10),
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
                fontSize={20}
                styling={{ ...CommonStyles.regularFont500Style }}
              >
                {``}
              </CustomText>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onRequestClose}
              style={{ paddingTop: RfH(20) }}
            >
              <CustomText
                allowFontScaling={false}
                color={Colors.white}
                fontSize={14}
                styling={{ ...CommonStyles.regularFont500Style }}
              >
                {localize("common.skip")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <Carousel
            data={list || []}
            renderItem={renderItemData}
            sliderWidth={deviceWidth() - RfW(40)}
            itemWidth={deviceWidth() - RfW(40)}
            onSnapToItem={(index) => {
              setActiveSlide(index);
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
              backgroundColor: isDarkMode ? Colors.white : Colors.white,
            }}
            inactiveDotStyle={{
              width: RfH(15),
              height: RfH(15),
              borderRadius: RfH(10),
              marginHorizontal: -RfH(5),
              backgroundColor: isDarkMode
                ? Colors.white
                : getColorWithOpacity(Colors.white, 0.75),
            }}
          />
        </View>
      </CustomModal>
    );
  }

  return null;
};

export default PendingDocumentModal;
