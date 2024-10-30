import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CustomText, IconButtonWrapper } from "../../components";
import CustomModal from "../../components/CustomModal";
import { Colors, CommonStyles, Images } from "../../theme";
import { RfH, RfW } from "../../utils/helper";
import { deviceWidth, storeData } from "../../utils/helpers";
import { CONFIG_CONSTANT, LOCAL_STORAGE_DATA_KEY } from "../../utils/constants";
import { createStructuredSelector } from "reselect";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  invokeSurveySparrow,
  onSurveyResponseListener,
} from "surveysparrow-react-native-sdk";
import { submitAcknowledge } from "../Home/redux/actions";

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
});

const Quotes = (props: any) => {
  const { isVisible, item = {}, onRequestClose, isDarkMode } = props || {};
  const { myProfileDetails } = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    storeData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA, {
      [myProfileDetails?.username]: item?.createdAt,
    });
  }, []);

  useEffect(() => {
    const sub = onSurveyResponseListener.addListener("onSurveyResponse", () => {
      const info = {
        featureId: item?.id,
        featureModule: CONFIG_CONSTANT?.SURVEYS,
        metadata: {
          userName: myProfileDetails?.username,
          submittedOn: new Date().getTime(),
        },
      };
      onRequestClose();
      dispatch(submitAcknowledge.trigger({ data: info }));
    });
    return () => sub.remove();
  }, [item]);

  const handlePressItem = () => {
    invokeSurveySparrow({
      domain: "feedback.cenomirewards.com",
      token: item?.qouteToken,
      surveyType: "classic",
    });
  };

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
            width: "100%",
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
                {item?.internalName}
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

          <View
            style={{
              height: RfH(270),
              marginTop: RfH(15),
            }}
          >
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
                {`${item?.quote}`}
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

              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handlePressItem();
                  }}
                >
                  <Text style={styles.buttonText}>
                    {item?.quote?.content?.[1]?.content?.[1]?.content?.[0]
                      ?.value || "Take a quiz"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  button: {
    backgroundColor: "#804cc9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Quotes;
