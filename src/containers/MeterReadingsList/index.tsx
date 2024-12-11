import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import WrapperContainer from "../../components/WrapperContainer";
import { CustomText, HeaderSVG } from "../../components";
import { isDarkModeSelector } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
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
import {
  getMeterReadingListErrorSelector,
  getMeterReadingListSelector,
} from "../Home/redux/selectors";
import { isEmpty } from "lodash";
import { getMeterReadingList } from "../Home/redux/actions";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  meterReadingList: getMeterReadingListSelector,
  error: getMeterReadingListErrorSelector,
});

export default function MeterReadings() {
  const { isDarkMode, meterReadingList, error } = useSelector(stateSelector);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [meterReadingItems, setMeterReadingItems] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const dispatch = useDispatch();

  const handleOnClickItem = (item: MeterReadingItemsType) => {
    trackEvent(EVENT_NAME.PRESSED_METER_READINGS);
    navigation.navigate(NavigationRouteNames.METER_READING as never, {
      srId: item?.service_request_id,
    });
  };

  useEffect(() => {
    fetchMeterReadingList(1);
  }, []);

  useEffect(() => {
    if (meterReadingList?.list) {
      setMeterReadingItems(prevItems =>
        page === 1
          ? [...meterReadingList.list]
          : [...prevItems, ...meterReadingList.list]
      );
      setIsLoading(false);
    }

    if (error) {
        setIsLoading(false);
    }
  }, [meterReadingList, error]);

  const fetchMeterReadingList = (pageNumber: number) => {
    setIsLoading(true);
    dispatch(
      getMeterReadingList.trigger({
        page: pageNumber,
        limit: ITEMS_PER_PAGE,
      })
    );
  };

  const handleLoadMore = () => {
    if (
      !isLoading &&
      meterReadingList?.total_count > meterReadingItems.length
    ) {
      setPage(prev => prev + 1);
      fetchMeterReadingList(page + 1);
    }
  };

  const renderEndMessage = () => {
    if (meterReadingItems.length >= (meterReadingList?.total_count || 0) && page > 1) {
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

const renderContent = () => {
    if (isLoading && page === 1 && !error) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} height={RfH(125)} />;
    }

    if (!isEmpty(error)) {
      return (
        <EmptyListComponent
          errorText={error?.title || localize("common.someThingWentWrong")}
          icon={Images.benefitEmptyIcon}
        />
      );
    }

    if (isEmpty(meterReadingItems)) {
      return (
        <EmptyListComponent
          errorText={localize("common.noDataFound")}
          icon={Images.benefitEmptyIcon}
        />
      );
    }

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
          keyExtractor={(item, index) =>
            `${index}-${item?.service_request_id}`
          }
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            <>
              {isLoading && page > 1 && (
                <BenefitListSkeleton isDarkMode={isDarkMode} height={RfH(125)} />
              )}
              {renderEndMessage()}
              <View style={{ height: RfH(10) }} />
            </>
          }
        />
      </View>
    );
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
          {renderContent()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
}
