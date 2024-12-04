import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
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
  detectMeterReading,
  sanitizeNumericInput,
  validateMeterForm,
} from "./util";
import { alertBox } from "../../utils/helpers";
import { ThemeProvider } from "../../theme/context";
import Toast from 'react-native-simple-toast';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});

const initialMeterData: MeterData = {
  meterNumber: "",
  meterReading: "",
};

const initialErrors: MeterValidationErrors = {
  meterNumber: "",
  meterReading: "",
};

export default function Index({ route }: MeterReadingDetailsProps) {
  const { id, property, srId } = route.params;
  const { isDarkMode } = useSelector(stateSelector);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] =
    useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meterData, setMeterData] = useState<MeterData>(initialMeterData);
  const [errors, setErrors] = useState<MeterValidationErrors>(initialErrors);
  const [isEditing, setIsEditing] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  const resetForm = () => {
    setCapturedImage(null);
    setMeterData(initialMeterData);
    setErrors(initialErrors);
    setIsEditing(false);
    setImageAspectRatio(1);
  };

  const handleRetake = () => {
    resetForm();
    setIsShowDocumentPickerModal(true);
  };

  const onPressUploadAttachment = () => {
    setIsShowDocumentPickerModal(true);
  };

  const handleDocumentUpload = async (imageData) => {
    setIsLoading(true);
    try {
      setCapturedImage(imageData.path);
      Image.getSize(
        imageData.path,
        (width, height) => {
          setImageAspectRatio(width / height);
        },
        (error) => {
          console.error("Error getting image size:", error);
        }
      );
      const detectedData = await detectMeterReading(imageData.path);
      setMeterData(detectedData);
      setIsEditing(true);
    } catch (error) {
      resetForm();
      alertBox(
        localize("common.error"),
        localize("meterReadings.detectionError"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
        }
      );
      console.error("Error detecting meter reading:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 32;
  const imageWidth = screenWidth - containerPadding;
  const imageHeight = imageWidth / imageAspectRatio;

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
      Toast.show(localize("meterReadings.submitSuccess"), Toast.SHORT);
      resetForm();
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
    <WrapperContainer showOverlay={true}>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
        }}
      >
        <Loader isLoading={isLoading} />
        <ThemeProvider useNewStyles={true}>
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
        </ThemeProvider>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[
              styles.uploadItemContainer,
              { borderColor: isDarkMode ? Colors.white : Colors.black },
            ]}
            onPress={onPressUploadAttachment}
          >
            <View style={styles.directionRowCenter}>
              <CustomImage
                image={Images.camera1}
                imageWidth={24}
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

          {capturedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: capturedImage }}
                style={[
                  styles.previewImage,
                  {
                    width: imageWidth,
                    height: imageHeight,
                  },
                ]}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={handleRetake}
              >
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={styles.retakeButtonText}
                >
                  {localize("meterReadings.retakeImage")}
                </CustomText>
              </TouchableOpacity>
            </View>
          )}

          {meterData.meterNumber && (
            <View>
              <View>
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
                  error={errors.meterReading}
                />
              </View>

              {isEditing && (
                <CustomButton
                  buttonText={"Save"}
                  btnContainerStyle={styles.submitButtonStyle}
                  handleOnSubmit={handleSave}
                />
              )}
            </View>
          )}
          <UploadDocument
            title={localize("components.uploadPhoto")}
            isVisible={isShowDocumentPickerModal}
            handleClose={() => setIsShowDocumentPickerModal(false)}
            handleUpload={handleDocumentUpload}
            isUploadFileOnServer={false}
            cropping
            isTenantServerUpload={false}
            isFilePickerVisible={true}
            imageCompressionQuality={1}
          />
        </ScrollView>
      </SafeAreaView>
    </WrapperContainer>
  );
}
