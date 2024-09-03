import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  CustomImage,
  CustomText,
  CustomWishesModal,
  HeaderSVG,
} from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
import {
  RfH,
  RfW,
  getColorWithOpacity,
  getWorkHomeMobilePhoneNumber,
} from "../../utils/helper";
import { getWishesListSelector, isDarkModeSelector } from "../redux/selectors";
// import styles from './styles';
import HorizontalTabItems from "../../components/HorizontalTabItems";
import { localize } from "../../locale/utils";
import { BorderRadius } from "../../theme/sizes";
import {
  wishesCategoryList,
  wisheshCatEnum,
  wisheshForEnum,
} from "../../utils/constants";
import NextThirtyDaysItemComponent from "./components/NextThirtyDaysItemComponent";
import WishListItemComponent from "./components/WishListItemComponent";
import { getSendWishesInfo } from "../redux/actions";
import { getIsMatchedCurrentDate } from "../../utils/helpers";
import moment from "moment";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constant";
import { isEmpty } from "lodash";
import {
  getIsApiExecutingSelector,
  isLoadingSelector,
} from "../../appContainer/redux/selectors";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { SendWishesSkeleton } from "../../components/SkeletonLoader";
import Greetings from "./Greetings";
import WrapperContainer from "../../components/WrapperContainer";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  isAPIExecuting: getIsApiExecutingSelector,
  wishesDataList: getWishesListSelector,
  myProfileDetails: getMyProfileDetailsSelector,
});
const SendWishes = (props: any) => {
  const { isDarkMode, wishesDataList, isAPIExecuting, myProfileDetails } =
    useSelector(stateSelector);
  const { type: paramsType, username: paramsUsername } =
    props?.route?.params || {};

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const categoryRef = useRef<FlatList>(null);

  const [selectedCategory, setSelectedCategory] = useState(
    paramsType
      ? paramsType
      : wishesCategoryList?.length > 0
      ? wishesCategoryList[0]?.key
      : ""
  );
  const [modifiedWishCategotyList, setModifiedWishCategotyList] = useState([]);
  const [todayWishesList, setTodayWishesList] = useState([]);
  const [restWishesList, setRestWishesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wishesModalInfo, setWishesModalInfo] = useState({
    isVisible: false,
    usedFor: "",
  });
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const userName = myProfileDetails?.username || "";

  useEffect(() => {
    setSelectedCategory(
      paramsType
        ? paramsType
        : wishesCategoryList?.length > 0
        ? wishesCategoryList[0]?.key
        : ""
    );
    setType(paramsType);
    setUsername(paramsUsername);
  }, [paramsType, paramsUsername]);

  // Notification handler
  const handleNotification = () => {
    if (type && username) {
      setType("");
      setUsername("");

      if (type === wisheshCatEnum?.BIRTHDAY) {
        const findedData =
          wishesDataList?.dob?.length > 0 &&
          wishesDataList?.dob?.find((item) => item?.username === username);
        !isEmpty(findedData) && handleOnPressWish(findedData);
      } else if (type === wisheshCatEnum?.WORKANNIVERSARIES) {
        const findedData =
          wishesDataList?.workAnniversaryQuery?.length > 0 &&
          wishesDataList?.workAnniversaryQuery?.find(
            (item) => item?.username === username
          );
        !isEmpty(findedData) && handleOnPressWish(findedData);
      }
      if (type === wisheshCatEnum?.NEWJOINERS) {
        const findedData =
          wishesDataList?.joiningDate?.length > 0 &&
          wishesDataList?.joiningDate?.find(
            (item) => item?.username === username
          );
        !isEmpty(findedData) && handleOnPressWish(findedData);
      }
    }
  };

  useEffect(() => {
    if (isAPIExecuting) {
      setIsLoading(isAPIExecuting);
    } else {
      setTimeout(() => {
        setIsLoading(isAPIExecuting);
      }, 300);
    }
  }, [isAPIExecuting]);

  useEffect(() => {
    dispatch(getSendWishesInfo.trigger());
  }, []);

  useEffect(() => {
    if (wishesDataList) {
      setIsLoading(true);
      setTimeout(() => {
        !isEmpty(wishesDataList) && handleNotification();
        if (selectedCategory === wisheshCatEnum?.BIRTHDAY) {
          const todaysData = [];
          const restThisMonthData = [];
          wishesDataList?.dob?.length > 0 &&
            wishesDataList?.dob
              ?.filter((filterItem) => filterItem?.username != userName)
              ?.map((item) => {
                const dob = moment(item?.date_of_birth)?.format("YYYY-MM-DD");
                if (getIsMatchedCurrentDate(dob)) {
                  todaysData?.push(item);
                } else {
                  restThisMonthData?.push(item);
                }
              });

          setTodayWishesList(todaysData || []);
          setRestWishesList(restThisMonthData || []);

          setIsLoading(false);
        }

        if (selectedCategory === wisheshCatEnum?.WORKANNIVERSARIES) {
          const todaysData = [];
          const restThisMonthData = [];
          wishesDataList?.workAnniversaryQuery?.length > 0 &&
            wishesDataList?.workAnniversaryQuery
              ?.filter(
                (filterItem) =>
                  filterItem?.username !== userName &&
                  moment(filterItem?.joining_date)?.format("YYYY") !==
                    moment().format("YYYY")
              )
              ?.map((item) => {
                const joiningDate = moment(item?.joining_date)?.format(
                  "YYYY-MM-DD"
                );
                if (getIsMatchedCurrentDate(joiningDate)) {
                  todaysData?.push(item);
                } else {
                  restThisMonthData?.push(item);
                }
              });

          setTodayWishesList(todaysData || []);
          setRestWishesList(restThisMonthData || []);

          setIsLoading(false);
        }

        if (selectedCategory === wisheshCatEnum?.NEWJOINERS) {
          // need to fiter today data
          const todaysData = [];
          const restThisMonthData = [];
          wishesDataList?.joiningDate?.length > 0 &&
            wishesDataList?.joiningDate
              ?.filter((filterItem) => filterItem?.username !== userName)
              ?.map((item) => {
                console.log({ d: moment(item?.joining_date) });

                if (moment(item?.joining_date).isSame(moment(), "day")) {
                  todaysData?.push(item);
                } else {
                  restThisMonthData?.push(item);
                }
              });

          setTodayWishesList(todaysData || []);
          setRestWishesList(restThisMonthData || []);

          setIsLoading(false);
        }
        if (selectedCategory === wisheshCatEnum?.PROMOTIONS) {
          setIsLoading(false);
        }
      }, 300);
    }
    if (selectedCategory === wisheshCatEnum?.GREETINGS) {
      setIsLoading(false);
    }
  }, [isFocused, selectedCategory, wishesDataList, type, username]);

  useEffect(() => {
    if (wishesCategoryList?.length > 0) {
      const temp = wishesCategoryList?.map((item) => {
        if (item?.key === selectedCategory) {
          return { ...item, isSelect: true };
        }

        return { ...item, isSelect: false };
      });

      setModifiedWishCategotyList([...temp]);
    }
  }, [selectedCategory]);

  const handleOnPressWish = (item) => {
    const { display_name, phones, emails, work_relationships } = item || {};
    let tempPhone = getWorkHomeMobilePhoneNumber(phones);
    tempPhone = tempPhone !== "-" ? tempPhone : "";

    // let tempEmail = getEmailBytype(EMAIL_W1, emails);
    let tempEmail = item?.username;
    tempEmail = tempEmail !== "-" ? tempEmail : "";

    if (selectedCategory === wisheshCatEnum.WORKANNIVERSARIES) {
      const joiningDate =
        work_relationships?.length > 0
          ? moment(work_relationships[0]?.startDate, "YYYY-MM-DD")
          : moment();
      const currentDate = moment(moment(), "YYYY-MM-DD");
      const diffDate = currentDate.diff(joiningDate, "years");

      setWishesModalInfo({
        isVisible: true,
        usedFor: wisheshForEnum.OTHERSANNIVERSARY,
        data: [
          {
            name: display_name,
            workPeriod: diffDate,
            phone: tempPhone,
            email: tempEmail,
          },
        ],
      });
    }
    if (selectedCategory === wisheshCatEnum.BIRTHDAY) {
      setWishesModalInfo({
        isVisible: true,
        usedFor: wisheshForEnum.OTHERSBIRTHDAY,
        data: [
          {
            name: display_name,
            phone: tempPhone,
            email: tempEmail,
          },
        ],
      });
    }
    if (selectedCategory === wisheshCatEnum.NEWJOINERS) {
      setWishesModalInfo({
        isVisible: true,
        usedFor: wisheshForEnum.NEWJOINER,
        data: [
          {
            name: display_name,
            phone: tempPhone,
            email: tempEmail,
          },
        ],
      });
    }
  };

  const getNoDataFoundMessage = () => {
    if (selectedCategory === wisheshCatEnum?.BIRTHDAY) {
      return localize("wish.noDataFoundForBirthdayMsg");
    }
    if (selectedCategory === wisheshCatEnum?.WORKANNIVERSARIES) {
      return localize("wish.noDataFoundForAnniversaryMsg");
    }
    if (selectedCategory === wisheshCatEnum?.NEWJOINERS) {
      return localize("wish.noDataFoundForNewJoinerMsg");
    }
  };

  const getNoDataFoundImage = () => {
    if (selectedCategory === wisheshCatEnum?.BIRTHDAY) {
      // return Images.birthdayWish;
      return Images.emptyBirthdayIcon;
    }
    if (selectedCategory === wisheshCatEnum?.WORKANNIVERSARIES) {
      // return Images.workAnniversaries;
      return Images.emptyAnniversaryIcon;
    }
    if (selectedCategory === wisheshCatEnum?.NEWJOINERS) {
      // return Images.welcome;
      return Images.emptyNewJoineeIcon;
    }
  };

  const renderEmptyComponent = () => {
    if (isEmpty(todayWishesList)) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: RfH(30),
            paddingBottom: RfH(10),
          }}
        >
          <CustomImage
            image={getNoDataFoundImage()}
            imageHeight={80}
            imageWidth={80}
          />
          <CustomText
            fontSize={18}
            color={getColorWithOpacity(Colors.white, 0.8)}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(21.6),
              textAlign: "center",
              paddingTop: RfH(25),
            }}
          >
            {getNoDataFoundMessage()}
          </CustomText>
        </View>
      );
    }

    return null;
  };

  const renderFooterListComponent = () => {
    if (restWishesList && restWishesList?.length > 0) {
      return (
        <View style={{ paddingTop: RfH(20), alignItems: "flex-start" }}>
          <CustomText
            fontSize={16}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(19.2),
              paddingBottom: RfH(30),
              marginLeft: RfW(24),
            }}
          >
            {localize("wish.thisMonth")}
          </CustomText>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            overScrollMode={"never"}
            data={restWishesList || []}
            renderItem={({ item }) => (
              <NextThirtyDaysItemComponent item={item} />
            )}
            contentContainerStyle={{ paddingLeft: RfW(24) }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }

    return null;
  };

  const mainSection = () => {
    if (
      wishesDataList !== undefined &&
      isEmpty(todayWishesList) &&
      isEmpty(restWishesList) &&
      !isLoading
    ) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: SCREEN_HEIGHT - RfH(170),
          }}
        >
          <CustomImage
            image={getNoDataFoundImage()}
            imageHeight={80}
            imageWidth={80}
          />
          <CustomText
            fontSize={18}
            color={getColorWithOpacity(Colors.white, 0.75)}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(21.6),
              textAlign: "center",
              paddingTop: RfH(25),
            }}
          >
            {getNoDataFoundMessage()}
          </CustomText>
        </View>
      );
    } else if (
      wishesDataList !== undefined &&
      (!isEmpty(todayWishesList) || !isEmpty(restWishesList)) &&
      !isLoading
    ) {
      return (
        <FlatList
          data={todayWishesList || []}
          overScrollMode={"never"}
          contentContainerStyle={{
            // backgroundColor: isDarkMode ? Colors.darkModeBackground : null,
            paddingBottom: RfH(200),
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <WishListItemComponent
              item={item}
              selectedCategory={selectedCategory}
              onPressWish={handleOnPressWish}
            />
          )}
          ListHeaderComponent={renderEmptyComponent}
          ListFooterComponent={renderFooterListComponent}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return <SendWishesSkeleton isDarkMode={isDarkMode} />;
  };

  // console.log('selectedCategory=====>', selectedCategory);

  const _renderCategoryItem = ({ item, index }) => (
    <HorizontalTabItems
      isDarkMode={isDarkMode}
      item={item}
      onPress={(item) => {
        if (item?.key !== selectedCategory) {
          if (!isLoading) {
            setSelectedCategory(item?.key);

            setTimeout(() => {
              categoryRef?.current?.scrollToIndex({ animated: true, index });
            }, 200);
          }
        }
      }}
      containerStyle={{ marginLeft: RfW(index === 0 ? 24 : 0) }}
    />
  );

  const greetingsSection = () => {
    return <Greetings />;
  };

  return (
    <WrapperContainer>
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
        <HeaderSVG
          isBackButtonVisible={true}
          titleText={localize("home.sendWishes")}
          titleFont={20}
          isBorderRadius={false}
        />

        <View
          style={[
            styles.categoryContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.darkModeBackground
                : Colors.headerBgColor,
              borderBottomLeftRadius: RfW(15),
              borderBottomRightRadius: RfW(15),
              alignItems: "flex-start",
            },
          ]}
        >
          <FlatList
            ref={categoryRef}
            data={modifiedWishCategotyList || []}
            horizontal={true}
            overScrollMode={"never"}
            contentContainerStyle={{
              paddingRight: RfW(24),
              height: RfH(50),
              backgroundColor: isDarkMode ? Colors.darkModeBackground : null,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={_renderCategoryItem}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{ backgroundColor: Colors.transparent, flex: 1 }}>
          {selectedCategory === wisheshCatEnum?.GREETINGS
            ? greetingsSection()
            : mainSection()}
        </View>

        {wishesModalInfo?.isVisible ? (
          <CustomWishesModal
            modalInfo={wishesModalInfo}
            onRequestClose={() => {
              setWishesModalInfo({ isVisible: false, usedFor: "" });
            }}
          />
        ) : null}
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  rowContainer: {
    backgroundColor: Colors.white,
    height: RfH(64),
    flexDirection: "row",
    // flex: 1,
    borderRadius: BorderRadius.BR0,
    marginVertical: RfH(6),
    marginHorizontal: RfH(2),
    alignItems: "center",
    justifyContent: "center",
    paddingRight: RfW(16),
    paddingLeft: RfW(8),
  },
  iconbg: {
    backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: "row",
    borderRadius: BorderRadius.BR0,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryContainer: {
    backgroundColor: Colors.white,
  },
});

export default SendWishes;
