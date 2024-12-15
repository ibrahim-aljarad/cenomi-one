import {
  BackHandler,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  HeaderSVG,
  Loader,
} from "../../components";
import { ThemeProvider } from "../../theme/context";
import { BenefitListSkeleton } from "../../components/SkeletonLoader";
import EmptyListComponent from "../../components/EmptyListComponent";

import { RfH, RfW } from "../../utils/helper";
import { isRTL, localize } from "../../locale/utils";
import { alertBox, deviceHeight } from "../../utils/helpers";
import styles from "./style";
import NavigationRouteNames from "../../routes/ScreenNames";
import {
  getErrorSelector,
  getLoadingSelector,
  getMetersListSelector,
  getUpdatedReadingSelector,
} from "./redux/selectors";
import {
  clearError,
  clearMeterReading,
  getSrMeters,
  updateMeterReading,
} from "./redux/actions";
import {
  formatMeterStatus,
  getMeterStatusStyle,
  METER_STATUS_COLORS,
} from "./util";
import { isDarkModeSelector } from "../redux/selectors";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  metersList: getMetersListSelector,
  updatedReading: getUpdatedReadingSelector,
  loading: getLoadingSelector,
  error: getErrorSelector,
});

const METER_TABS = [
  { id: "ALL", label: localize("meterReadings.tabs.all") },
  { id: "PENDING", label: localize("meterReadings.tabs.pending") },
  { id: "DRAFT", label: localize("meterReadings.tabs.draft") },
  { id: "SUBMITTED", label: localize("meterReadings.tabs.submitted") },
] as const;

type TabType = (typeof METER_TABS)[number]["id"];

export default function CombinedMeterReading({ route }) {
  const { srId, operations } = route.params;
  const { isDarkMode, metersList, updatedReading, loading, error } =
    useSelector(stateSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const isSubmitting = useRef(false);

  useEffect(() => {
    dispatch(getSrMeters.trigger(srId));
  }, [srId, dispatch]);

  const filteredMeters = useMemo(() => {
    if (!metersList) return [];

    if (activeTab === "ALL") return metersList;

    return metersList.filter((meter) => meter.status === activeTab);
  }, [metersList, activeTab]);

  const hasMeters = useMemo(() => (metersList?.length || 0) > 0, [metersList]);

  const totalMeters = useMemo(() => metersList?.length || 0, [metersList]);
  const remainingMeters = useMemo(
    () =>
      metersList?.filter((meter) => meter.status === "PENDING")?.length || 0,
    [metersList]
  );

  const backHandler = (): boolean => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    if (updatedReading === "success" && isSubmitting.current) {
      isSubmitting.current = false;
      dispatch(clearMeterReading.trigger());
      dispatch(clearError.trigger());
      Toast.show(localize("meterReadings.submitSuccess"), Toast.SHORT);
      navigation.navigate(NavigationRouteNames.METER_READINGS as never);
    }
  }, [updatedReading]);

  useEffect(() => {
    if (error.updateReading && isSubmitting.current) {
      isSubmitting.current = false;
      alertBox(localize("common.error"), error.updateReading, {
        positiveText: localize("common.ok"),
        cancelable: true,
        onPositiveClick: () => {
          dispatch(clearError.trigger());
        },
      });
    }
  }, [error.updateReading]);

  useFocusEffect(
    React.useCallback(() => {
      if (isFocused) {
        BackHandler.addEventListener("hardwareBackPress", backHandler);
      }
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backHandler);
      };
    }, [isFocused])
  );

  const onPressUploadAttachment = () => {
    navigation.navigate(NavigationRouteNames.METER_CAPTURE as never, {
      srId,
      metersList,
    });
  };

  const handleMeterSubmission = () => {
    if (!operations) {
      alertBox(
        localize("common.error"),
        localize("discrepancy.invalidRequest")
      );
      return;
    }
    const levelOneOperations = operations.filter(
      (op) => op.workflow_level === 1
    );
    const allLevelOneInProgress = levelOneOperations.every(
      (op) => op.status === "IN_PROGRESS"
    );
    if (!allLevelOneInProgress) {
      alertBox(
        localize("common.error"),
        localize("discrepancy.level1ApproverNotInProgress"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
        }
      );
      return;
    }
    try {
      isSubmitting.current = true;
      dispatch(
        updateMeterReading.trigger({
          "service-request-id": parseInt(srId),
          status: "SUBMITTED",
        })
      );
    } catch (error) {
      isSubmitting.current = false;
      console.error("Submit all failed:", error);
      Toast.show(localize("common.someThingWentWrong"), Toast.SHORT);
    }
  };

  const renderMeterItem = ({ item }) => {
    const isNavigatable =
      item?.status === "SUBMITTED" || item?.status === "DRAFT";

    const itemContent = (
      <View
        style={[
          styles.item_con,
          {
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
            opacity: isNavigatable ? 1 : 0.8,
          },
        ]}
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
            {localize("meterReadings.meterNumber")}: {item["meter-no"]}
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
            {localize("meterReadings.previousReading")} :{" "}
            {item["previous-reading"] || localize("common.notAvailable")}
          </CustomText>

          {item["present-reading"] && (
            <CustomText
              fontSize={14}
              numberOfLines={2}
              color={Colors.black}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(21),
              }}
            >
              {localize("meterReadings.presentReading")} :{" "}
              {item["present-reading"] || localize("common.notAvailable")}
            </CustomText>
          )}

          <View
            style={[
              styles.statusPill,
              getMeterStatusStyle(item?.status),
              { marginTop: RfH(4) },
            ]}
          >
            <CustomText
              fontSize={12}
              color={METER_STATUS_COLORS[item?.status]?.border}
              styling={CommonStyles.regularFont500Style}
            >
              {formatMeterStatus(item?.status)}
            </CustomText>
          </View>
        </View>

        {isNavigatable && (
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

    if (!isNavigatable) {
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
              meterDetails: item,
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
          {localize("meterReadings.meters")}
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabScrollContainer}
    >
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
              {tab.id === "ALL" && (
                <CustomText
                  fontSize={12}
                  color={activeTab === tab.id ? Colors.white : Colors.gray}
                  styling={CommonStyles.regularFont400Style}
                >
                  {` (${totalMeters})`}
                </CustomText>
              )}
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
    </ScrollView>
  );

  const renderListSection = () => {
    if (loading.metersList) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} height={100} />;
    }

    if (error.metersList) {
      return (
        <EmptyListComponent
          errorText={localize("common.someThingWentWrong")}
          icon={Images.benefitEmptyIcon}
        />
      );
    }

    const meters = metersList || [];
    if (meters.length === 0) {
      return (
        <EmptyListComponent
          errorText={localize("common.noDataFound")}
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
              {localize("meterReadings.noMeters")}
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
        <Loader isLoading={loading.metersList || loading.updateReading} />
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={`${localize("common.serviceRequest")}: ${srId}`}
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
            {renderListSection()}
          </ScrollView>

          {hasMeters && !loading.metersList && (
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
                buttonText={localize("discrepancy.submitAll")}
                showSeperator={false}
                btnContainerStyle={styles.submitAllButtonStyle}
                handleOnSubmit={() => {
                  if (remainingMeters > 0) {
                    if (!operations) {
                      alertBox(
                        localize("common.error"),
                        localize("discrepancy.invalidRequest")
                      );
                      return;
                    }

                    const levelOneOperations = operations.filter(
                      (op) => op.workflow_level === 1
                    );

                    const allLevelOneInProgress = levelOneOperations.every(
                      (op) => op.status === "IN_PROGRESS"
                    );

                    if (!allLevelOneInProgress) {
                      alertBox(
                        localize("common.error"),
                        localize("discrepancy.level1ApproverNotInProgress"),
                        {
                          positiveText: localize("common.ok"),
                          cancelable: true,
                        }
                      );
                      return;
                    }
                    alertBox(
                      localize("meterReadings.confirmation"),
                      localize("meterReadings.remainingMetersConfirmation", {
                        count: remainingMeters,
                        total: totalMeters,
                      }),
                      {
                        positiveText: localize("common.yes"),
                        negativeText: localize("common.no"),
                        onPositiveClick: () => {
                          handleMeterSubmission();
                        },
                        onNegativeClick: () => {
                          console.log("Submission canceled.");
                        },
                      }
                    );
                  } else {
                    handleMeterSubmission();
                  }
                }}
              />
            </SafeAreaView>
          )}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
}
