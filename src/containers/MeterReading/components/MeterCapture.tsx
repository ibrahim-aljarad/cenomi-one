import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import Toast from "react-native-simple-toast";

import WrapperContainer from "../../../components/WrapperContainer";
import { Colors } from "../../../theme";
import {
  CustomButton,
  CustomText,
  CustomTextInput,
  HeaderSVG,
  Loader,
} from "../../../components";
import { ThemeProvider } from "../../../theme/context";
import UploadDocument, {
  DocumentType,
} from "../../../components/UploadDocument";

import { RfH, RfW } from "../../../utils/helper";
import { localize } from "../../../locale/utils";
import { alertBox } from "../../../utils/helpers";
import {
  detectMeterReading,
  sanitizeNumericInput,
  validateMeterForm,
} from "../../MeterReadingsDetail/util";

import {
  getTenantFileUploadedDataSelector,
  getTenantFileUploadErrorSelector,
  isDarkModeSelector,
} from "../../redux/selectors";
import { clearTenantFileUpload } from "../../redux/actions";
import {
  clearError,
  clearMeterReading,
  getSrMeters,
  updateMeterReading,
} from ".././redux/actions";
import { isEmpty } from "lodash";
import styles from "../style";
import {
  getErrorSelector,
  getLoadingSelector,
  getUpdatedReadingSelector,
} from "../redux/selectors";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  tenantfileUploadedData: getTenantFileUploadedDataSelector,
  imageUploadError: getTenantFileUploadErrorSelector,
  updatedReading: getUpdatedReadingSelector,
  error: getErrorSelector,
  loading: getLoadingSelector,
});

const initialMeterData = {
  meterNumber: "",
  meterReading: "",
};

const initialImageState = {
  localUri: null,
  serverUri: null,
  documentId: null,
  aspectRatio: 1,
};

const initialErrors = {
  meterNumber: "",
  meterReading: "",
};

export default function MeterCapture({ route }) {
  const { srId, metersList } = route.params;
  const {
    isDarkMode,
    tenantfileUploadedData,
    imageUploadError,
    updatedReading,
    error,
    loading,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [imageState, setImageState] = useState(initialImageState);
  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] =
    useState(true);
  const [fileUploadStarted, setFileUploadStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [meterData, setMeterData] = useState(initialMeterData);
  const [errors, setErrors] = useState(initialErrors);
  const [isEditing, setIsEditing] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 32;
  const imageWidth = screenWidth - containerPadding;
  const imageHeight = imageWidth / imageState?.aspectRatio;

  const capturedImage = useMemo(
    () => imageState.serverUri || imageState.localUri,
    [imageState.serverUri, imageState.localUri]
  );

  const resetState = () => {
    setImageState(initialImageState);
    setMeterData(initialMeterData);
    setErrors(initialErrors);
    setIsEditing(false);
  };

  useEffect(() => {
    if (fileUploadStarted && tenantfileUploadedData?.document_id) {
      setImageState((prev) => ({
        ...prev,
        serverUri: tenantfileUploadedData.signed_url,
        documentId: tenantfileUploadedData.document_id,
      }));
      handleMeterDetection(tenantfileUploadedData.signed_url);
    }
  }, [tenantfileUploadedData, fileUploadStarted]);

  useEffect(() => {
    if (!isEmpty(imageUploadError)) {
      alertBox(
        localize("meterReadings.imageUploadFailed"),
        localize("meterReadings.imageUploadFailedDesc"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
          onPositiveClick: handleBack,
        }
      );
    }
  }, [imageUploadError]);

  useEffect(() => {
    if (updatedReading === "success") {
      dispatch(clearMeterReading.trigger());
      dispatch(getSrMeters.trigger(srId));
      Toast.show(localize("meterReadings.submitSuccess"), Toast.SHORT);
      handleBack();
    }
  }, [updatedReading]);

  useEffect(() => {
    if (error.updateReading) {
      alertBox(localize("common.error"), error.updateReading, {
        positiveText: localize("common.ok"),
        cancelable: true,
        onPositiveClick: () => {
          dispatch(clearError.trigger());
          handleBack();
        },
      });
    }
  }, [error.updateReading, dispatch]);

  useEffect(() => {
    return () => {
      if (!fileUploadStarted) {
        dispatch(clearTenantFileUpload.trigger());
      }
    };
  }, [dispatch, fileUploadStarted]);

  const handleMeterDetection = async (signedUrl) => {
    setIsLoading(true);
    try {
      const detectedData = await detectMeterReading(signedUrl);
      setMeterData(detectedData);
      setIsEditing(true);
    } catch (error) {
      alertBox(
        localize("common.error"),
        localize("meterReadings.detectionError"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
          onPositiveClick: handleBack,
        }
      );
      console.error("Error detecting meter reading:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = useCallback(() => {
    resetState();
    dispatch(clearError.trigger());
    dispatch(clearTenantFileUpload.trigger());
    navigation.goBack();
  }, [dispatch, navigation, resetState]);

  const handleRetake = useCallback(() => {
    resetState();
    setIsShowDocumentPickerModal(true);
    setFileUploadStarted(true);
  }, [resetState]);

  const handleModalClose = useCallback(() => {
    if (fileUploadStarted || isShowDocumentPickerModal) {
      console.log("Preventing modal close", {
        fileUploadStarted,
        isShowDocumentPickerModal,
      });
      return;
    }

    handleBack();
  }, [fileUploadStarted, isShowDocumentPickerModal, handleBack]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isShowDocumentPickerModal) {
          return true;
        }
        return false;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isShowDocumentPickerModal])
  );

  const handleDocumentUpload = async (imageData) => {
    setIsShowDocumentPickerModal(true);
    setFileUploadStarted(true);
    console.log("handleDocumentUpload func", imageData);
    setIsLoading(true);
    try {
      setImageState((prev) => ({
        ...prev,
        localUri: imageData.path,
      }));

      await new Promise((resolve, reject) => {
        Image.getSize(
          imageData.path,
          (width, height) => {
            setImageState((prev) => ({
              ...prev,
              localUri: imageData.path,
              aspectRatio: width / height,
            }));
            resolve(null);
          },
          reject
        );
      });
      setIsShowDocumentPickerModal(false);
    } catch (error) {
      console.log("error", error);
      setFileUploadStarted(false);
      alertBox(
        localize("common.error"),
        localize("meterReadings.failedToProcessImage"),
        {
          positiveText: localize("common.ok"),
          onPositiveClick: handleBack,
          cancelable: true,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const { isValid, errors: validationErrors } = validateMeterForm(
      meterData.meterNumber,
      meterData.meterReading
    );

    if (isValid) {
      const selectedMeter = metersList?.find(
        (meter) => meter["meter-no"] === meterData.meterNumber
      );

      if (!selectedMeter) {
        alertBox(
          localize("common.error"),
          localize("meterReadings.noMatchingMeter"),
          {
            positiveText: localize("common.ok"),
            cancelable: true,
          }
        );
        return;
      }

      setIsLoading(true);
      try {
        const payload = {
          "service-request-id": parseInt(selectedMeter["service-request-id"]),
          "meter-reading-id": parseInt(selectedMeter["meter-reading-id"]),
          "present-reading": meterData.meterReading,
          "document-ids": imageState.documentId ? [imageState.documentId] : [],
          status: "DRAFT",
        };
        console.log("payload", payload);
        dispatch(updateMeterReading.trigger(payload));
      } catch (error) {
        alertBox(
          localize("common.error"),
          localize("common.someThingWentWrong"),
          {
            positiveText: localize("common.ok"),
            cancelable: true,
          }
        );
      } finally {
        setIsLoading(false);
      }
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
    <WrapperContainer showOverlay>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
        }}
      >
        <Loader isLoading={isLoading || loading.updateReading} />
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={`${localize("common.serviceRequest")}: ${srId}`}
            titleFont={20}
            onBackPressHandler={handleBack}
          />
        </ThemeProvider>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: RfW(16) }}
          showsVerticalScrollIndicator={false}
        >
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
                  buttonText={localize("common.save")}
                  btnContainerStyle={styles.submitButtonStyle}
                  handleOnSubmit={handleSave}
                />
              )}
            </View>
          )}
        </ScrollView>

        <UploadDocument
          title={localize("components.uploadPhoto")}
          isVisible={isShowDocumentPickerModal}
          handleClose={handleModalClose}
          handleUpload={handleDocumentUpload}
          isUploadFileOnServer={false}
          cropping
          isTenantServerUpload={true}
          documentTypeId={DocumentType.DISCREPANCY}
          isFilePickerVisible={true}
          imageCompressionQuality={1}
        />
      </SafeAreaView>
    </WrapperContainer>
  );
}
