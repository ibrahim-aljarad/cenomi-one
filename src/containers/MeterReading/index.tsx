import {
  BackHandler,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import WrapperContainer from "../../components/WrapperContainer";
import { isDarkModeSelector } from "../redux/selectors";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Colors, CommonStyles, Images } from "../../theme";
import { CustomText, HeaderSVG } from "../../components";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import { ThemeProvider } from "../../theme/context";
import styles from "./style";
import { MeterReadingDetailsProps } from "../MeterReadingsDetail/type";
import {
  getErrorSelector,
  getLoadingSelector,
  getMetersListSelector,
  getServiceRequestDetailsSelector,
} from "./redux/selectors";
import { getSrDetails, getSrMeters } from "./redux/actions";
import { BenefitListSkeleton } from "../../components/SkeletonLoader";
import EmptyListComponent from "../../components/EmptyListComponent";
import { MeterDetail, ServiceRequestDetails } from "./type";
import NavigationRouteNames from "../../routes/ScreenNames";
import { RfH, RfW } from "../../utils/helper";
import {
  formatStatus,
  getStatusStyle,
  STATUS_COLORS,
} from "../DiscrepancyList/util";
import { formatMeterStatus, getMeterStatusStyle, MeterReadingStatus, METER_STATUS_COLORS } from "./util";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  serviceRequestDetails: getServiceRequestDetailsSelector,
  metersList: getMetersListSelector,
  loading: getLoadingSelector,
  error: getErrorSelector,
});

export default function MeterReading({ route }: MeterReadingDetailsProps) {
  const { srId } = route.params;
  const { isDarkMode, serviceRequestDetails, metersList, loading, error } =
    useSelector(stateSelector);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSrDetails.trigger(srId));
    dispatch(getSrMeters.trigger(srId));
  }, [srId, dispatch]);

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

  const renderMeterItem = ({ item }: { item: MeterDetail }) => (
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

        <View style={[styles.statusPill, getMeterStatusStyle(item?.status as MeterReadingStatus)]}>
          <CustomText
            fontSize={12}
            color={METER_STATUS_COLORS[item?.status]?.border}
            styling={CommonStyles.regularFont500Style}
          >
            {formatMeterStatus(item?.status as MeterReadingStatus)}
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

  const listSection = () => {
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
        data={meters}
        renderItem={renderMeterItem}
        keyExtractor={(item) => item.meter_id.toString()}
        ListHeaderComponent={renderServiceRequestDetails}
        contentContainerStyle={styles.flatListContainer}
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
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={`Service Request: ${srId}`}
            titleFont={20}
          />
        </ThemeProvider>

        {listSection()}
      </SafeAreaView>
    </WrapperContainer>
  );
}
