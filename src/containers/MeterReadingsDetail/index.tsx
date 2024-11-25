import {
  Alert,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  MeterData,
  MeterReadingDetailsProps,
  MeterValidationErrors,
} from "./type";
import WrapperContainer from "../../components/WrapperContainer";
import styles from "./style";
import { isDarkModeSelector } from "../redux/selectors";
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";
import { Colors, CommonStyles, Images } from "../../theme";
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomTextInput,
  HeaderSVG,
  Loader,
} from "../../components";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import { RfH, RfW } from "../../utils/helper";
import { isRTL, localize } from "../../locale/utils";
import UploadDocument from "../../components/UploadDocument";
import {
  METER_NUMBER_LENGTH,
  METER_READING_LENGTH,
  mockDetectMeterReading,
  sanitizeNumericInput,
  validateMeterForm,
} from "./util";
import { alertBox } from "../../utils/helpers";
import CustomModal from "../../components/CustomModal";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});

export default function Index({ route }: MeterReadingDetailsProps) {
  const { id, property, srId } = route.params;
  const { isDarkMode } = useSelector(stateSelector);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [meterData, setMeterData] = useState<MeterData>({
    meterNumber: "",
    meterReading: "",
  });
  const [errors, setErrors] = useState<MeterValidationErrors>({
    meterNumber: "",
    meterReading: "",
  });
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onPressUploadAttachment = () => {
    setIsShowDocumentPickerModal(true);
  };

  const handleDocumentUpload = async () => {
    setIsLoading(true);
    try {
      const detectedData = await mockDetectMeterReading();
      setMeterData(detectedData);
      setIsEditing(true);
    } catch (error) {
      console.error("Error detecting meter reading:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const backHandler = (): boolean => {
    navigation.goBack();
    return true;
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

  const handleSave = () => {
    const { isValid, errors: validationErrors } = validateMeterForm(
      meterData.meterNumber,
      meterData.meterReading
    );

    if (isValid) {
      console.log("Saving meter data:", meterData);
      setIsEditing(false);
      setIsSuccessModal(true);
    } else {
      setErrors(validationErrors);
      alertBox(
        localize("meterReadings.validationError"),
        localize("meterReadings.pleaseCorrectErrors"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
        }
      );
    }
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
        }}
      >
        <HeaderSVG
          isRightButtonVisible={true}
          isBackButtonVisible={true}
          titleText={`Service Request: ${srId}`}
          titleFont={20}
          onRightButtonClickHandler={() => {}}
          onBackPressHandler={() => backHandler()}
          isRight2BtnVisible={true}
          onRight2BtnClick={() => {}}
          containerStyle={{ zIndex: 99999 }}
        />
        <View style={styles.scrollContainer}>
          <TouchableOpacity
            style={[
              styles.uploadItemContainer,
              { borderColor: isDarkMode ? Colors.white : Colors.black },
            ]}
            onPress={onPressUploadAttachment}
          >
            <View style={styles.directionRowCenter}>
              <CustomImage
                image={Images.uploadVoilet}
                imageWidth={22}
                imageHeight={24}
                imageResizeMode={"contain"}
                displayLoader={false}
                containerStyling={{}}
                tintColor={isDarkMode ? Colors.white : Colors.black}
              />
              <CustomText
                fontSize={14}
                color={Colors.black}
                styling={{
                  ...CommonStyles.regularFont500Style,
                  lineHeight: RfH(17),
                  marginLeft: RfW(12),
                  marginTop: RfH(2),
                }}
              >
                {localize("common.takeAPhoto")}
              </CustomText>
            </View>

            <CustomImage
              image={isRTL() ? Images.arrowLeft : Images.arrowRight}
              imageWidth={15}
              imageHeight={15}
              imageResizeMode={"contain"}
              displayLoader={false}
              containerStyling={{}}
              tintColor={isDarkMode ? Colors.white : Colors.black}
            />
          </TouchableOpacity>

          {meterData.meterNumber && (
            <View>
              <View style={{ marginBottom: RfH(16) }}>
                <CustomTextInput
                  label={localize("meterReadings.meterNumber")}
                  isMandatory={false}
                  noOfLines={1}
                  multiline={false}
                  showClearButton={false}
                  value={meterData.meterNumber}
                  onChangeHandler={(text) => {
                    const sanitizedText = sanitizeNumericInput(text);
                    setMeterData((prev) => ({
                      ...prev,
                      meterNumber: sanitizedText,
                    }));
                    if (errors.meterNumber) {
                      setErrors((prev) => ({ ...prev, meterNumber: "" }));
                    }
                  }}
                  inputwrapperStyle={{
                    borderWidth: 1,
                    borderColor: errors.meterNumber ? Colors.red : Colors.white,
                    paddingHorizontal: 5,
                  }}
                  editable={isEditing}
                  maxLength={METER_NUMBER_LENGTH}
                  keyboardType="numeric"
                  error={errors.meterNumber}
                />
              </View>

              <View style={{ marginBottom: RfH(32) }}>
                <CustomTextInput
                  label={localize("meterReadings.meterReading")}
                  isMandatory={false}
                  noOfLines={1}
                  multiline={false}
                  showClearButton={false}
                  value={meterData.meterReading}
                  onChangeHandler={(text) => {
                    const sanitizedText = sanitizeNumericInput(text);
                    setMeterData((prev) => ({
                      ...prev,
                      meterReading: sanitizedText,
                    }));
                    if (errors.meterReading) {
                      setErrors((prev) => ({ ...prev, meterReading: "" }));
                    }
                  }}
                  keyboardType="numeric"
                  inputwrapperStyle={{
                    borderWidth: 1,
                    borderColor: errors.meterReading
                      ? Colors.red
                      : Colors.white,
                    paddingHorizontal: 5,
                  }}
                  editable={isEditing}
                  maxLength={METER_READING_LENGTH}
                  error={errors.meterReading}
                />
              </View>

              {isEditing && (
                <CustomButton
                  buttonText={localize("common.submit")}
                  btnContainerStyle={styles.submitButtonStyle}
                  handleOnSubmit={handleSave}
                />
              )}
            </View>
          )}

          <Loader isLoading={isLoading} />

          <UploadDocument
            title={localize("components.uploadPhoto")}
            isVisible={isShowDocumentPickerModal}
            handleClose={() => setIsShowDocumentPickerModal(false)}
            handleUpload={handleDocumentUpload}
            isUploadFileOnServer={false}
            cropping
            isTenantServerUpload={false}
            isFilePickerVisible={false}
            openCameraDefault
            imageCompressionQuality={0.6}
          />

          {isSuccessModal && (
            <CustomModal
              title={localize("meterReadings.submitSuccess")}
              modalVisible={isSuccessModal}
              onRequestClose={() => setIsSuccessModal(false)}
              onRequestActionButton={() => navigation.goBack()}
            />
          )}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
}
