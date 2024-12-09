import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React from "react";
import WrapperContainer from "../../components/WrapperContainer";
import { CustomText, HeaderSVG } from "../../components";
import { isDarkModeSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Colors, Images } from "../../theme";
import { localize } from "../../locale/utils";
import styles from "./style";
import { BenefitListSkeleton } from "../../components/SkeletonLoader";
import { RfW } from "../../utils/helpers";
import { RfH } from "../../utils/helper";
import ListItem from "./ListItem";
import EmptyListComponent from "../../components/EmptyListComponent";
import { EVENT_NAME, trackEvent } from "../../utils/analytics";
import { useNavigation } from "@react-navigation/core";
import NavigationRouteNames from "../../routes/ScreenNames";
import { MeterReadingItemsType } from "./type";
import { ThemeProvider } from "../../theme/context";

const meterReadingItems = [
  {
    srNumber: 55,
    title: "Meter readings for Month November - 2024",
    mall: "Marina Mall",
    status: "IN_PROGRESS",
    date: "2024-11-07",
  },
];

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});

export default function MeterReadings() {
  const { isDarkMode } = useSelector(stateSelector);
  const navigation = useNavigation();
  const handleOnClickItem = (item: MeterReadingItemsType) => {
    trackEvent(EVENT_NAME.PRESSED_METER_READINGS);
    navigation.navigate(NavigationRouteNames.METER_READING as never, {
      srId: item?.srNumber,
    });
  };

  const renderEndMessage = () => {
    if (meterReadingItems.length === 0) {
      return (
        <View style={styles.endMessageContainer}>
          <CustomText color={Colors.grayTwo}>
            {localize("discrepancy.noMoreDiscrepancy")}
          </CustomText>
        </View>
      );
    }
    return null;
  };

  const listSection = () => {
    if (meterReadingItems === undefined) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} height={RfH(125)} />;
    } else if (meterReadingItems?.length > 0) {
      return (
        <View style={styles.listView}>
          <FlatList
            data={meterReadingItems}
            contentContainerStyle={{
              paddingHorizontal: RfW(16),
              paddingTop: RfH(8),
            }}
            renderItem={({ item }) => (
              <ListItem
                isDarkMode={isDarkMode}
                item={item}
                onPressItem={handleOnClickItem}
              />
            )}
            keyExtractor={(item, index) => index.toString() + item?.srNumber}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={null}
            onEndReached={() => {}}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              <>
                {renderEndMessage()}
                <View style={{ height: RfH(10) }} />
              </>
            }
          />
        </View>
      );
    } else if (meterReadingItems?.length === 0) {
      return (
        <EmptyListComponent
          errorText={localize("common.noDataFound")}
          icon={Images.benefitEmptyIcon}
        />
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
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isBackButtonVisible={true}
            isRightButtonVisible={true}
            titleText={localize("home.meterReadings")}
            titleFont={20}
          />
        </ThemeProvider>

        <View
          style={[
            styles.mainView,
            {
              backgroundColor: isDarkMode
                ? Colors.darkModeBackground
                : Colors.transparent,
            },
          ]}
        >
          {listSection()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
}
