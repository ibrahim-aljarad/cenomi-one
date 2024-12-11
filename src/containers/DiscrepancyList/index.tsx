import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import { CustomText, HeaderSVG } from "../../components";
import { localize } from "../../locale/utils";
import { Colors, Images } from "../../theme";
import { createStructuredSelector } from "reselect";
import { isDarkModeSelector } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getSaveData, isDisplayWithNotch } from "../../utils/helpers";
import { RfH, RfW } from "../../utils/helper";
import { BorderRadius } from "../../theme/sizes";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { getDiscrepancyList } from "../Home/redux/actions";
import { getServiceRequestListSelector } from "../Home/redux/selectors";
import { BenefitListSkeleton } from "../../components/SkeletonLoader";
import EmptyListComponent from "../../components/EmptyListComponent";
import ListItem from "./ListItem";
import { EVENT_NAME, trackEvent } from "../../utils/analytics";
import NavigationRouteNames from "../../routes/ScreenNames";
import { LOCAL_STORAGE_DATA_KEY } from "../../utils/constants";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import WrapperContainer from "../../components/WrapperContainer";
import { getApiErrorSelector } from "../DiscrepancyDetails/redux/selectors";
import { ThemeProvider } from "../../theme/context";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  serviceRequestList: getServiceRequestListSelector,
  apiError: getApiErrorSelector,
});

const DiscrepancyList = () => {
  const { isDarkMode, serviceRequestList, myProfileDetails, apiError } =
    useSelector(stateSelector);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [discrepancyItems, setDiscrepancyItems] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [readItems, setReadItems] = useState([]);

  useEffect(() => {
    fetchDiscrepancyList(1);
  }, []);

  useEffect(() => {
    if (serviceRequestList?.list) {
      if (page === 1) {
        setDiscrepancyItems(serviceRequestList.list);
      } else {
        setDiscrepancyItems([...discrepancyItems, ...serviceRequestList.list]);
      }
      setIsLoading(false);
    }
  }, [serviceRequestList]);

  useEffect(() => {
    if (isFocused) {
      getSaveData(LOCAL_STORAGE_DATA_KEY.CORP_COMMU_READED_DATA).then(
        (data) => {
          if (data) {
            let ids = JSON.parse(data)?.[myProfileDetails?.username];
            setReadItems(ids);
          }
        }
      );
    }
  }, [isFocused]);

  const fetchDiscrepancyList = (pageNumber) => {
    setIsLoading(true);
    dispatch(
      getDiscrepancyList.trigger({
        page: pageNumber,
        limit: ITEMS_PER_PAGE,
      })
    );
  };

  const handleLoadMore = () => {
    if (
      !isLoading &&
      serviceRequestList?.total_count > discrepancyItems.length
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchDiscrepancyList(nextPage);
    }
  };

  const renderEndMessage = () => {
    if (
      discrepancyItems.length >= serviceRequestList?.total_count &&
      page > 1
    ) {
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

  const handleOnClickItem = (item) => {
    trackEvent(EVENT_NAME.PRESSED_CORPORATE_COMMUNICATION);
    navigation.navigate(NavigationRouteNames.DISCREPANCY_DETAILS as never, {
      id: item?.service_request_id,
      property: { ...item?.payload },
      srId: item?.service_request_id,
      operations: item?.operations,
    });
  };

  const listSection = () => {
    if (!apiError && serviceRequestList === undefined) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} height={RfH(125)} />;
    } else if (discrepancyItems?.length > 0) {
      return (
        <View style={styles.listView}>
          <FlatList
            data={discrepancyItems}
            contentContainerStyle={{
              paddingHorizontal: RfW(16),
              paddingTop: RfH(8),
            }}
            renderItem={({ item, index }) => (
              <ListItem
                index={index}
                isDarkMode={isDarkMode}
                readItems={readItems}
                item={item}
                onPressItem={handleOnClickItem}
              />
            )}
            keyExtractor={(item, index) =>
              index.toString() + item?.service_request_id
            }
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={null}
            onEndReached={handleLoadMore}
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
    } else if (discrepancyItems?.length === 0 && !isLoading) {
      return (
        <EmptyListComponent
          errorText={localize("common.noDataFound")}
          icon={Images.benefitEmptyIcon}
        />
      );
    } else if (apiError && apiError?.title) {
      return (
        <EmptyListComponent
          errorText={apiError?.title}
          icon={Images.benefitEmptyIcon}
        />
      );
    }
  };

  return (
    <WrapperContainer showOverlay>
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
            titleText={localize("home.discrepancy")}
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
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
  },
  item_con: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: RfW(24),
    paddingVertical: RfH(20),
  },
  notification_Settings_con: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: RfW(24),
    paddingVertical: RfH(20),
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder,
  },
  mainView: {
    flex: 1,
  },
  categoryView: {
    height: RfH(31),
    borderRadius: RfH(15),
    marginHorizontal: RfW(5),
    paddingHorizontal: RfW(15),
    alignItems: "center",
    justifyContent: "center",
  },

  detailsCategoryView: {
    flexDirection: "row",
    backgroundColor: Colors.voiletLight,

    marginTop: RfH(28),
    height: RfH(23),
    borderRadius: BorderRadius.BR0,
    paddingHorizontal: RfW(15),
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
  listView: {
    flex: 1,
  },
  endMessageContainer: {
    paddingTop: RfH(15),
    alignItems: "center",
    marginBottom: RfH(10),
  },
});

export default DiscrepancyList;
