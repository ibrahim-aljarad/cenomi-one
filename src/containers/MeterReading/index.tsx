import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import Toast from "react-native-simple-toast";

import WrapperContainer from "../../components/WrapperContainer";
import { Colors, CommonStyles, Images } from "../../theme";
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomTextInput,
  HeaderSVG,
  Loader,
} from "../../components";
import { ThemeProvider } from "../../theme/context";
import UploadDocument from "../../components/UploadDocument";
import { BenefitListSkeleton } from "../../components/SkeletonLoader";
import EmptyListComponent from "../../components/EmptyListComponent";

import { RfH, RfW } from "../../utils/helper";
import { isRTL, localize } from "../../locale/utils";
import { alertBox } from "../../utils/helpers";
import {
  detectMeterReading,
  sanitizeNumericInput,
  validateMeterForm,
} from "../MeterReadingsDetail/util";
import styles from "./style";
import NavigationRouteNames from "../../routes/ScreenNames";
import {
  getErrorSelector,
  getLoadingSelector,
  getMetersListSelector,
  getServiceRequestDetailsSelector,
} from "./redux/selectors";
import { getSrDetails, getSrMeters, updateMeterReading } from "./redux/actions";
import { ServiceRequestDetails } from "./type";
import {
  formatMeterStatus,
  getMeterStatusStyle,
  METER_STATUS_COLORS,
} from "./util";
import { isDarkModeSelector } from "../redux/selectors";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  serviceRequestDetails: getServiceRequestDetailsSelector,
  metersList: getMetersListSelector,
  loading: getLoadingSelector,
  error: getErrorSelector,
});

const initialMeterData = {
  meterNumber: "",
  meterReading: "",
};

const initialErrors = {
  meterNumber: "",
  meterReading: "",
};

const METER_TABS = [
  { id: "ALL", label: "All" },
  { id: "PENDING", label: "Pending" },
  { id: "COMPLETED", label: "Completed" },
] as const;

type TabType = (typeof METER_TABS)[number]["id"];

export default function CombinedMeterReading({ route }) {
  const { srId } = route.params;
  const { isDarkMode, serviceRequestDetails, metersList, loading, error } =
    useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] =
    useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meterData, setMeterData] = useState(initialMeterData);
  const [errors, setErrors] = useState(initialErrors);
  const [isEditing, setIsEditing] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [showMeterList, setShowMeterList] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("ALL");

  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 32;
  const imageWidth = screenWidth - containerPadding;
  const imageHeight = imageWidth / imageAspectRatio;

  useEffect(() => {
    if (showMeterList) {
      dispatch(getSrDetails.trigger(srId));
      dispatch(getSrMeters.trigger(srId));
    }
  }, [srId, dispatch, showMeterList]);

  const filteredMeters = useMemo(() => {
    if (!metersList) return [];

    if (activeTab === "ALL") return metersList;

    return metersList.filter((meter) => meter.status === activeTab);
  }, [metersList, activeTab]);

  const hasMeters = useMemo(() => (metersList?.length || 0) > 0, [metersList]);

  const resetForm = () => {
    setCapturedImage(null);
    setMeterData(initialMeterData);
    setErrors(initialErrors);
    setIsEditing(false);
    setImageAspectRatio(1);
    setShowMeterList(true);
  };

  const backHandler = (): boolean => {
    if (!showMeterList) {
      resetForm();
      return true;
    }
    navigation.goBack();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isFocused) {
        BackHandler.addEventListener("hardwareBackPress", backHandler);
      }
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backHandler);
      };
    }, [isFocused, showMeterList])
  );

  // Camera handlers
  const handleRetake = () => {
    resetForm();
    setIsShowDocumentPickerModal(true);
  };

  const onPressUploadAttachment = () => {
    setShowMeterList(false);
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

  // Save handler
  const handleSave = async () => {
    const { isValid, errors: validationErrors } = validateMeterForm(
      meterData.meterNumber,
      meterData.meterReading
    );

    if (isValid) {
      setIsLoading(true);
      try {
        dispatch(
          updateMeterReading.trigger({
            srId,
            meterId: meterData.meterNumber,
            reading: meterData.meterReading,
            image: capturedImage,
          })
        );

        // Refresh the list data
        await Promise.all([
          dispatch(getSrDetails.trigger(srId)),
          dispatch(getSrMeters.trigger(srId)),
        ]);

        Toast.show(localize("meterReadings.submitSuccess"), Toast.SHORT);
        resetForm();
      } catch (error) {
        alertBox(
          localize("common.error"),
          localize("meterReadings.savingError"),
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

  // List rendering
  const renderMeterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item_con,
        {
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
        },
      ]}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(
          NavigationRouteNames.METER_READING_DETAILS as never,
          {
            meterId: item.meter_id,
            srId,
          }
        )
      }
    >
      <View style={{ flex: 1 }}>
        <CustomText
          fontSize={14}
          numberOfLines={2}
          color={Colors.black}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(21),
          }}
        >
          Meter ID: {item?.meter_id}
        </CustomText>
        <CustomText
          fontSize={14}
          numberOfLines={2}
          color={Colors.black}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(21),
          }}
        >
          Property Name: {item?.property_group_name}
        </CustomText>

        <View style={[styles.statusPill, getMeterStatusStyle(item?.status)]}>
          <CustomText
            fontSize={12}
            color={METER_STATUS_COLORS[item?.status]?.border}
            styling={CommonStyles.regularFont500Style}
          >
            {formatMeterStatus(item?.status)}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderServiceRequestDetails = () => {
    const details =
      (serviceRequestDetails as ServiceRequestDetails) ||
      ({} as ServiceRequestDetails);
    return (
      <View style={styles.meterCountContainer}>
        <CustomText
          fontSize={16}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont500Style }}
        >
          Meters
        </CustomText>
        <CustomText
          fontSize={16}
          color={Colors.voiletTwo}
          styling={{ ...CommonStyles.regularFont500Style }}
        >
          {details.remaining_meter_no || 0} / {details.total_meter_no || 0}
        </CustomText>
      </View>
    );
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {METER_TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
            {
              backgroundColor: isDarkMode
                ? activeTab === tab.id
                  ? Colors.primary
                  : Colors.darkModeButton
                : activeTab === tab.id
                ? Colors.primary
                : Colors.white,
            },
          ]}
          onPress={() => setActiveTab(tab.id)}
        >
          <CustomText
            fontSize={14}
            color={activeTab === tab.id ? Colors.white : Colors.gray}
            styling={CommonStyles.regularFont500Style}
          >
            {tab.label}
            {tab.id !== "ALL" && (
              <CustomText
                fontSize={12}
                color={activeTab === tab.id ? Colors.white : Colors.gray}
                styling={CommonStyles.regularFont400Style}
              >
                {` (${
                  metersList?.filter((meter) => meter.status === tab.id)
                    .length || 0
                })`}
              </CustomText>
            )}
          </CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderListSection = () => {
    if (loading.srDetails || loading.metersList) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} height={100} />;
    }

    if (error.srDetails || error.metersList) {
      return (
        <EmptyListComponent
          errorText={error.srDetails || error.metersList || "An error occurred"}
          icon={Images.benefitEmptyIcon}
        />
      );
    }

    const meters = metersList || [];
    if (meters.length === 0) {
      return (
        <EmptyListComponent
          errorText="No meters found"
          icon={Images.benefitEmptyIcon}
        />
      );
    }
    return (
      <FlatList
        data={filteredMeters}
        renderItem={renderMeterItem}
        keyExtractor={(item) => item.meter_id.toString()}
        ListHeaderComponent={
          <>
            {renderServiceRequestDetails()}
            {renderTabs()}
          </>
        }
        contentContainerStyle={styles.contentContainer}
      />
    );
  };

  return (
    <WrapperContainer showOverlay>
      <SafeAreaView
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          },
        ]}
      >
        <Loader isLoading={isLoading} />
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={`Service Request: ${srId}`}
            titleFont={20}
            onBackPressHandler={backHandler}
          />
        </ThemeProvider>

        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
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

            {showMeterList && !capturedImage && renderListSection()}
          </ScrollView>

          {showMeterList &&
            !capturedImage &&
            hasMeters &&
            !loading.metersList && (
              <SafeAreaView
                style={[
                  styles.bottomButtonContainer,
                  {
                    backgroundColor: isDarkMode? Colors.darkModeBackground : "#1E2340"
                  }
                ]}
              >
                <CustomButton
                  buttonText="Submit All"
                  showSeperator={false}
                  btnContainerStyle={styles.submitAllButtonStyle}
                  handleOnSubmit={() => {
                    const details = serviceRequestDetails as ServiceRequestDetails;
                    const remainingMeters = details.remaining_meter_no || 0;
                    const totalMeters = details.total_meter_no || 0;
                    if (remainingMeters > 0) {
                      alertBox(
                        localize("meterReadings.confirmation"),
                        `${remainingMeters} meters are remaining out of ${totalMeters}. Do you want to submit?`,
                        {
                          positiveText: localize("common.yes"),
                          negativeText: localize("common.no"),
                          onPositiveClick: () => {
                            console.log("Submitting all meters...");
                          },
                          onNegativeClick: () => {
                            console.log("Submission canceled.");
                          },
                        }
                      );
                    } else {
                      console.log("Submitting all meters...");
                    }
                  }}
                />
              </SafeAreaView>
            )}
        </View>

        <UploadDocument
          title={localize("components.uploadPhoto")}
          isVisible={isShowDocumentPickerModal}
          handleClose={() => {
            setIsShowDocumentPickerModal(false);
            if (!capturedImage) {
              setShowMeterList(true);
            }
          }}
          handleUpload={handleDocumentUpload}
          isUploadFileOnServer={false}
          cropping
          isTenantServerUpload={false}
          isFilePickerVisible={true}
          imageCompressionQuality={1}
        />
      </SafeAreaView>
    </WrapperContainer>
  );
}
