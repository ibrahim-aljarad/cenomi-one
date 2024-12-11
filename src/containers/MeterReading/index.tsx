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
import { alertBox, deviceHeight } from "../../utils/helpers";
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
} from "./redux/selectors";
import { getSrMeters, updateMeterReading } from "./redux/actions";
import {
  formatMeterStatus,
  getMeterStatusStyle,
  METER_STATUS_COLORS,
} from "./util";
import {
  getTenantFileUploadedDataSelector,
  getTenantFileUploadErrorSelector,
  isDarkModeSelector,
} from "../redux/selectors";
import metersList from "./mocks/meterList.json";
import { isEmpty } from "lodash";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  metersList: getMetersListSelector,
  tenantfileUploadedData: getTenantFileUploadedDataSelector,
  imageUploadError: getTenantFileUploadErrorSelector,
  loading: getLoadingSelector,
  error: getErrorSelector,
});

const initialMeterData = {
  meterNumber: "",
  meterReading: "",
};

interface ImageState {
  localUri: string | null;
  serverUri: string | null;
  documentId: string | null;
  aspectRatio: number;
}

const initialImageState: ImageState = {
  localUri: null,
  serverUri: null,
  documentId: null,
  aspectRatio: 1,
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
  const {
    isDarkMode,
    // metersList,
    loading,
    tenantfileUploadedData,
    imageUploadError,
    error,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [imageState, setImageState] = useState<ImageState>(initialImageState);
  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] =
    useState(false);
  const [fileUploadStarted, setFileUploadStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [meterData, setMeterData] = useState(initialMeterData);
  const [errors, setErrors] = useState(initialErrors);
  const [isEditing, setIsEditing] = useState(false);
  const [showMeterList, setShowMeterList] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("ALL");

  const capturedImage = useMemo(
    () => imageState.serverUri || imageState.localUri,
    [imageState.serverUri, imageState.localUri]
  );

  console.log(metersList);

  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 32;
  const imageWidth = screenWidth - containerPadding;
  const imageHeight = imageWidth / imageState?.aspectRatio;

  useEffect(() => {
    if (showMeterList) {
      dispatch(getSrMeters.trigger(srId));
    }
  }, [srId, dispatch, showMeterList]);

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
        "Image Upload Failed",
        "Something went wrong while uploading the image. Please try again.",
        {
          positiveText: "Ok",
          cancelable: true,
          onPositiveClick: () => {
            resetForm();
          },
        }
      );
    }
  }, [imageUploadError]);

  const handleMeterDetection = async (signedUrl: string) => {
    setIsLoading(true);
    try {
      const detectedData = await detectMeterReading(signedUrl);
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

  const filteredMeters = useMemo(() => {
    if (!metersList) return [];

    if (activeTab === "ALL") return metersList;

    return metersList.filter((meter) => meter.status === activeTab);
  }, [metersList, activeTab]);

  const hasMeters = useMemo(() => (metersList?.length || 0) > 0, [metersList]);

  const totalMeters = useMemo(() => metersList?.length || 0, [metersList]);
  const remainingMeters = useMemo(
  () => metersList?.filter(meter => meter.status === "PENDING")?.length || 0,
  [metersList]
);

  const resetForm = () => {
    setImageState(initialImageState);
    setMeterData(initialMeterData);
    setErrors(initialErrors);
    setIsEditing(false);
    setShowMeterList(true);
    setFileUploadStarted(false);
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
    setFileUploadStarted(true);
  };

  const onPressUploadAttachment = () => {
    setShowMeterList(false);
    setIsShowDocumentPickerModal(true);
    setFileUploadStarted(true);
  };

  const handleDocumentUpload = async (imageData) => {
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
              aspectRatio: width / height,
            }));
            resolve(null);
          },
          reject
        );
      });
    } catch (error) {
      resetForm();
      alertBox(localize("common.error"), "Failed to process image", {
        positiveText: localize("common.ok"),
        cancelable: true,
      });
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
        // dispatch(
        //   updateMeterReading.trigger({
        //     srId,
        //     meterId: meterData.meterNumber,
        //     reading: meterData.meterReading,
        //     image: capturedImage,
        //   })
        // );

        // // Refresh the list data
        // await Promise.all([
        //   dispatch(getSrDetails.trigger(srId)),
        //   dispatch(getSrMeters.trigger(srId)),
        // ]);
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
//   const renderMeterItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.item_con,
//         {
//           backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
//         },
//       ]}
//       activeOpacity={0.8}
//       onPress={() =>
//         navigation.navigate(
//           NavigationRouteNames.METER_READING_DETAILS as never,
//           {
//             meterId: item.meter_id,
//             srId,
//           }
//         )
//       }
//     >
//       <View style={{ flex: 1 }}>
//         <CustomText
//           fontSize={14}
//           numberOfLines={2}
//           color={Colors.black}
//           styling={{
//             ...CommonStyles.regularFont500Style,
//             lineHeight: RfH(21),
//           }}
//         >
//           Meter ID: {item["meter-reading-id"]}
//         </CustomText>
//         <CustomText
//           fontSize={14}
//           numberOfLines={2}
//           color={Colors.black}
//           styling={{
//             ...CommonStyles.regularFont500Style,
//             lineHeight: RfH(21),
//           }}
//         >
//           Property Name: {item["property-group-name"] || "N/A"}
//         </CustomText>

//         <View style={[styles.statusPill, getMeterStatusStyle(item?.status)]}>
//           <CustomText
//             fontSize={12}
//             color={METER_STATUS_COLORS[item?.status]?.border}
//             styling={CommonStyles.regularFont500Style}
//           >
//             {formatMeterStatus(item?.status)}
//           </CustomText>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );


const renderMeterItem = ({ item }) => {
    const isCompleted = item?.status === "COMPLETED";

    const itemContent = (
      <View style={[
        styles.item_con,
        {
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          opacity: isCompleted ? 1 : 0.7
        },
      ]}>
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
            Meter ID: {item["meter-reading-id"]}
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
            Property Name: {item["property-group-name"] || "N/A"}
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

        {isCompleted && (
          <View style={styles.arrowContainer}>
            <CustomImage
              image={isRTL() ? Images.arrowLeft : Images.arrowRight}
              imageWidth={15}
              imageHeight={15}
              imageResizeMode={"contain"}
              displayLoader={false}
              containerStyling={{}}
              tintColor={isDarkMode ? Colors.white : Colors.black}
            />
          </View>
        )}
      </View>
    );

    if (!isCompleted) {
      return itemContent;
    }

    return (
      <TouchableOpacity
        style={{ opacity: 1 }}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            NavigationRouteNames.METER_READING_DETAILS as never,
            {
              meterId: item["meter-reading-id"],
              srId,
              meterDetails: item
            }
          )
        }
      >
        {itemContent}
      </TouchableOpacity>
    );
  };

  const renderServiceRequestDetails = () => {
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
         {remainingMeters} / {totalMeters}
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
    if (loading.metersList) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} height={100} />;
    }

    if (error.metersList) {
      return (
        <EmptyListComponent
          errorText={error.metersList || "An error occurred"}
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
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              paddingHorizontal: RfW(72),
              height: deviceHeight() - RfH(150),
            }}
          >
            <CustomText
              fontSize={20}
              color={Colors.white}
              styling={{
                lineHeight: RfH(22),
                paddingTop: RfH(30),
                ...CommonStyles.regularFont500Style,
              }}
            >
              No meters found
            </CustomText>
          </View>
        }
        keyExtractor={(item) => item["meter-reading-id"].toString()}
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
                    backgroundColor: isDarkMode
                      ? Colors.darkModeBackground
                      : "#1E2340",
                  },
                ]}
              >
                <CustomButton
                  buttonText="Submit All"
                  showSeperator={false}
                  btnContainerStyle={styles.submitAllButtonStyle}
                  handleOnSubmit={() => {
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
          isTenantServerUpload={true}
          isFilePickerVisible={true}
          imageCompressionQuality={1}
        />
      </SafeAreaView>
    </WrapperContainer>
  );
}
