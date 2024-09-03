import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomImage, CustomText } from "../../../components";
import AppPrimaryButton from "../../../components/AppPrimaryButton";
import CustomModal from "../../../components/CustomModal";
import { Colors, CommonStyles, Images } from "../../../theme";
import { RfH, RfW } from "../../../utils/helper";
import { localize } from "../../../locale/utils";

const PendingSurveyModal = (props: any) => {
  const { isVisible, item = {}, onRequestClose, onPressItem } = props || {};

  if (isVisible) {
    return (
      <CustomModal modalVisible={isVisible} onRequestClose={onRequestClose}>
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onRequestClose}
            style={{
              paddingTop: RfH(20),
              paddingRight: RfW(10),
              alignSelf: "flex-end",
            }}
          >
            <CustomText
              color={Colors.white}
              fontSize={14}
              styling={{ ...CommonStyles.regularFont500Style }}
            >
              {localize("common.skip")}
            </CustomText>
          </TouchableOpacity>
          <CustomImage
            image={Images.surveyAcknowledge}
            imageHeight={RfH(180)}
            imageWidth={RfW(184)}
            imageResizeMode={"contain"}
            styling={{ alignSelf: "center" }}
          />
          <CustomText
            fontSize={14}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              paddingHorizontal: RfW(30),
              paddingTop: RfH(15),
              textAlign: "center",
            }}
          >
            {`${item?.name || ""}`}
          </CustomText>

          <View style={{ marginTop: RfH(15), width: "100%" }}>
            <AppPrimaryButton
              buttonText={localize("event.startSurvey")}
              onPress={() => {
                onPressItem(item);
              }}
            />
          </View>
        </>
      </CustomModal>
    );
  }

  return null;
};

export default PendingSurveyModal;
