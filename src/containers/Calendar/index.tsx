import React, { useEffect, useState } from "react";
import CustomCalendar from "../../components/CustomCalendar";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { CustomImage, CustomText, HeaderSVG } from "../../components";
import { localize } from "../../locale/utils";
import { Colors, CommonStyles, Images } from "../../theme";
import { RfH, RfW, getColorWithOpacity, getFirstDay } from "../../utils/helper";
import { BorderRadius, HEIGHT } from "../../theme/sizes";
import { createStructuredSelector } from "reselect";
import {
  getOrganizationConfigSelector,
  isDarkModeSelector,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import HorizontalTabItems from "../../components/HorizontalTabItems";
import {
  CalendarTypes,
  LEAVE_STATUS,
  monthNameList,
} from "../../utils/constants";
import { getAttendances } from "../HrRequest/redux/actions";
import { getAbsenseData } from "../HrRequest/redux/actions";
import {
  getAbsenseDataSelector,
  getAttendanceSelector,
} from "../HrRequest/redux/selectors";
import moment from "moment";
import { isArray, isEmpty } from "lodash";
import { isLoadingSelector } from "../../appContainer/redux/selectors";
import CustomPopupModal from "../../components/CustomPopupModal";
import { getDatesInRange } from "../../utils/helpers";
import { TouchableOpacity } from "react-native-gesture-handler";
import WrapperContainer from "../../components/WrapperContainer";
import { DateProps } from "./types";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { useIsFocused } from "@react-navigation/core";
import { getOrganizationStructureDataSelector } from "../Home/redux/selectors";
import { organizationStructure } from "../Home/redux/actions";
import {
  calculateTimestampDifferences,
  changeCalendarTypeStatus,
  changeSelectedStatus,
  convertHoursToHoursAndMinutes,
  formatTime,
  getStatusColors,
  getStatusTitle,
  mergeData,
  sortArrayByDate,
} from "./helper";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  absenseData: getAbsenseDataSelector,
  isLoading: isLoadingSelector,
  attendanceData: getAttendanceSelector,
  organizationConfig: getOrganizationConfigSelector,
  organizationStructureData: getOrganizationStructureDataSelector,
  myProfileData: getMyProfileDetailsSelector,
});

const Calendar = () => {
  const {
    isDarkMode,
    absenseData,
    isLoading,
    attendanceData,
    myProfileData,
    organizationStructureData,
    organizationConfig,
  } = useSelector(stateSelector);

  const weekend = organizationConfig?.configuration?.weekend;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15,
  };

  const [absenseList, setAbsenseList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CalendarTypes.ATTENDANCE_CALENDAR
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState({
    monthText: monthNameList[new Date()?.getMonth()],
    monthNumber: new Date()?.getMonth() + 1,
    year: new Date()?.getFullYear(),
  });

  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);
  const [reportees, setReportees] = useState<
    { displayName: string; employeeId: number; isSelected: boolean }[]
  >([]);
  const [calendarTypeList, setCalendarTypeList] = useState([
    {
      name: "My Attendance",
      value: CalendarTypes.ATTENDANCE_CALENDAR,
      isSelect: true,
      isVisible: true,
    },
    {
      name: "Team Attendance",
      value: CalendarTypes.REPORTEES_CALENDAR,
      isSelect: true,
      isVisible: false,
    },
  ]);

  const [eventDateList, setEventDateList] = useState({});
  const [showReportees, setShowReportees] = useState(false);
  const [isClearFilter, setIsClearFilter] = useState(false);
  const [selectedDateEventList, setSelectedDateEventList] = useState<
    { timestampDifferences: number; absenceType: string }[] | undefined
  >([]);
  const [formattedAttendance, setAttendanceData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      const id = myProfileData?.id;
      dispatch(organizationStructure.trigger({ id }));
    }
  }, [isFocused]);

  useEffect(() => {
    const reportiesTemp = organizationStructureData?.reportees?.map((item) => {
      return {
        ...item,
        isSelected: false,
      };
    });

    setReportees(reportiesTemp);
    const temp = calendarTypeList?.map((item) => {
      if (item.value === CalendarTypes.REPORTEES_CALENDAR) {
        return {
          ...item,
          isVisible: organizationStructureData?.reportees.length > 0,
        };
      }
      return item;
    });

    setCalendarTypeList(temp);
  }, [organizationStructureData, selectedCategory]);

  useEffect(() => {
    if (isFocused && selectedCategory !== CalendarTypes.REPORTEES_CALENDAR) {
      dispatch(
        getAttendances.trigger({
          id: myProfileData?.profile?.employeeId,
        })
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setCalendarTypeList(
        changeCalendarTypeStatus({ selectedCategory, calendarTypeList })
      );
    }

    if (
      selectedCategory === CalendarTypes.ATTENDANCE_CALENDAR &&
      absenseList.length === 0
    ) {
      dispatch(getAbsenseData.trigger({ isSilentCall: false }));
    } else if (reportees?.some((t) => t.isSelected)) {
      setAbsenseList([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!isEmpty(absenseData) && reportees?.some((t) => !t.isSelected)) {
      const filterData = absenseData
        ?.slice()
        ?.sort(
          (a: { startDate: string }, b: { startDate: string }) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        ?.filter(
          (flt) =>
            flt?.absenceDispStatus !== LEAVE_STATUS.ORA_WDRWL_PEND &&
            flt?.absenceDispStatus !== LEAVE_STATUS.CANCELED &&
            flt?.absenceDispStatus !== LEAVE_STATUS.DENIED
        )
        ?.filter((item) => {
          const startDateMonth = new Date(item?.startDate).getMonth() + 1;
          const startDateYear = new Date(item?.startDate).getFullYear();

          if (
            startDateMonth === selectedMonth?.monthNumber &&
            startDateYear === selectedMonth?.year
          ) {
            return item;
          }

          return;
        });

      setAbsenseList(filterData);
    } else {
      setAbsenseList([]);
    }
  }, [absenseData, selectedMonth, reportees]);

  useEffect(() => {
    const temp = getEventList();
    setEventDateList({ ...temp });
  }, [absenseList, attendanceData]);

  const getEventList = () => {
    let tempList = {};
    let formattedData = [];
    if (absenseList?.length > 0) {
      absenseList?.map((item: { startDate: string; endDate: string }) => {
        tempList = {
          ...tempList,
          ...getDatesInRange(item?.startDate, item?.endDate, isDarkMode),
        };
      });
    }

    if (attendanceData?.length > 0) {
        const uniqueEntries = new Map();

        attendanceData.forEach(item => {
          const date = item.DateTime.split("T")[0];
          const time = formatTime(item.DateTime);
          const key = `${date}-${time}`; // Creates a unique key for each date-time combination
          if (!uniqueEntries.has(key)) {
            uniqueEntries.set(key, {
              date,
              time,
              EMPLOYEEID: item.EMPLOYEEID,
              MATCHINGSCORE: item.MATCHINGSCORE
            });
          }
        });

        formattedData = Array.from(uniqueEntries.values()).reduce((acc, item) => {
          if (!acc[item.date]) {
            acc[item.date] = {
              marked: true,
              dots: [
                {
                  key: "customDot",
                  color: Colors.green,
                },
              ],
              timestamps: [],
            };
          }

          acc[item.date].timestamps.push(item.time);
          return acc;
        }, {});
      }

    const updatedData = calculateTimestampDifferences(
      formattedData,
      selectedMonth
    );

    setAttendanceData(
      Object.keys(updatedData)
        .map((key) => {
          updatedData[key].date = key;
          return updatedData[key];
        })
        .filter((item) => item.timestamps.length > 0)
    );
    return mergeData(updatedData, tempList);
  };

  const handleOnPressDate = (date: { dateString: string }) => {
    const temp = moment(date?.dateString).format("YYYY-MM-DD");

    const filteredData = absenseList?.filter(
      (info: { startDate: string; endDate: string }) =>
        moment(date?.dateString).format("YYYY-MM-DD") >= info?.startDate &&
        moment(date?.dateString).format("YYYY-MM-DD") <= info?.endDate
    );

    const attendenceDatas = eventDateList[temp];

    let selectedDateEvents = [];
    if (filteredData.length > 0 && attendenceDatas?.dots?.length > 0) {
      selectedDateEvents = [...filteredData, attendenceDatas];
    } else if (filteredData.length > 0) {
      selectedDateEvents = filteredData;
    } else if (attendenceDatas) {
      selectedDateEvents = [attendenceDatas];
    }

    setSelectedDateEventList(selectedDateEvents);

    const modifiedEventList = {
      ...getEventList(),
      [temp]: {
        ...eventDateList[temp],
        selected: true,
      },
    };

    setEventDateList(modifiedEventList);
    setIsClearFilter(true);
    setSelectedDate(date?.dateString);
  };

  const onClickClearFilter = () => {
    setEventDateList(getEventList());
    setSelectedDate("");
    setIsClearFilter(false);
  };

  const handleOnMonthChange = ({ month, year }: DateProps) => {
    onClickClearFilter();
    const monthName = monthNameList[month - 1];
    setSelectedMonth({
      monthText: monthName,
      monthNumber: month,
      year: year,
    });
  };

  const renderCalendarItem = ({ item }) => {
    // const activeMode = index % 2 === 0;
    const activeMode =
      new Date(selectedDate) >= new Date(item?.startDate) &&
      new Date(selectedDate) <= new Date(item?.endDate);

    let duration =
      item?.absenceDispStatus !== LEAVE_STATUS.ORA_WDRWL_PEND
        ? item?.formattedDuration
        : "";

    return (
      <View style={[styles.listContainer, darkCard]}>
        <View style={styles.statusRow}>
          <CustomText
            fontSize={16}
            color={activeMode ? Colors.white : Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(19.2),
            }}
          >
            {item?.absenceType || ""}
          </CustomText>
          <View
            style={[{ backgroundColor: Colors.primary }, styles.statusColor]}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: RfH(10),
          }}
        >
          <CustomText
            fontSize={14}
            color={
              activeMode
                ? Colors.white
                : getColorWithOpacity(Colors.white, 0.75)
            }
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(16.8),
            }}
          >
            {`${
              item.startDate ? moment(item.startDate).format("DD-MMM-YYYY") : ""
            } to ${
              item.startDate ? moment(item.endDate).format("DD-MMM-YYYY") : ""
            }`}
          </CustomText>
          <CustomText
            fontSize={14}
            color={
              activeMode
                ? Colors.white
                : getColorWithOpacity(Colors.white, 0.75)
            }
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(16.8),
              textAlign: "right",
            }}
          >
            {duration || ""}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderAttendance = ({ item }) => {
    if (!item) {
      return null;
    }

    const title = getStatusTitle({
      timestampDifferences: Math.abs(item.timestampDifferences?.[0] ?? 0),
      timestamps: item.timestamps,
    });

    const startTime = item.timestamps?.[0];
    const endTime = item.timestamps?.[1] ?? "";
    let duration = item.timestampDifferences?.[0];

    return (
      <View style={[styles.listContainer, darkCard]}>
        <View style={styles.statusRow}>
          <CustomText
            fontSize={16}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(19.2),
            }}
          >
            {`${title}  ${item.date || ""}`}
          </CustomText>
          <View
            style={[
              {
                backgroundColor: getStatusColors({
                  startTime,
                  duration,
                  timestamps: item.timestamps,
                }),
              },
              styles.statusColor,
            ]}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: RfH(10),
          }}
        >
          <CustomText
            fontSize={14}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(16.8),
            }}
          >
            {startTime === undefined
              ? ""
              : `${startTime}${endTime ? " to " + endTime : ""}`}
          </CustomText>
          {duration !== undefined && !isNaN(duration) ? (
            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(16.8),
                textAlign: "right",
              }}
            >
              {`${convertHoursToHoursAndMinutes(duration.toFixed(2))} hours`}
            </CustomText>
          ) : null}
        </View>
      </View>
    );
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
          titleText={"Calendar"}
          titleFont={20}
          isBorderRadius={false}
        />

        <View
          style={{
            marginBottom: RfH(5),
            paddingBottom: RfH(20),
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.headerBgColor,
            borderBottomLeftRadius: RfW(15),
            borderBottomRightRadius: RfW(15),
            paddingHorizontal: RfW(15),
            alignItems: "flex-start",
          }}
        >
          <FlatList
            data={calendarTypeList}
            horizontal={true}
            overScrollMode={"never"}
            contentContainerStyle={{
              alignItems: "flex-start",
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <HorizontalTabItems
                isDarkMode={isDarkMode}
                item={item}
                onPress={(item) => {
                  if (item?.value === CalendarTypes.EVENT_CALENDAR) {
                    setisShowComingSoonModal(true);
                    return;
                  }
                  setSelectedCategory(item?.value);
                  if (item.value === CalendarTypes.REPORTEES_CALENDAR) {
                    setShowReportees(true);
                  } else {
                    setShowReportees(false);
                  }
                  if (item?.value !== selectedCategory) {
                    setSelectedCategory(item?.value);
                  }
                }}
              />
            )}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
          />
          {showReportees ? (
            <FlatList
              data={reportees}
              horizontal={true}
              overScrollMode={"never"}
              style={{ marginTop: 10, marginStart: 10 }}
              contentContainerStyle={{
                alignItems: "flex-start",
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setReportees(
                        changeSelectedStatus({
                          reportees,
                          employeeId: item.employeeId,
                        })
                      );
                      !item.isSelected &&
                        dispatch(
                          getAttendances.trigger({
                            id: item.employeeId,
                          })
                        );
                    }}
                    style={[
                      styles.rowStyle,
                      item.isSelected && {
                        backgroundColor: Colors.darkPurple,
                        borderWidth: 0,
                      },
                    ]}
                  >
                    <CustomText
                      fontSize={14}
                      color={Colors.white}
                      styling={{
                        lineHeight: RfH(21.6),
                      }}
                    >
                      {item.displayName}
                    </CustomText>
                  </TouchableOpacity>
                );
              }}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
        </View>

        <FlatList
          data={
            isClearFilter
              ? isArray(selectedDateEventList)
                ? selectedDateEventList
                : [selectedDateEventList]
              : sortArrayByDate([...absenseList, ...formattedAttendance])
          }
          keyExtractor={(_, index) => index?.toString()}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: RfH(3) }}>
              <View style={[darkCard, { margin: RfH(20) }]}>
                <CustomCalendar
                  isDarkMode={isDarkMode}
                  onPressDate={handleOnPressDate}
                  firstDay={getFirstDay({ weekend })}
                  onMonthChange={handleOnMonthChange}
                  eventDateList={eventDateList}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={18}
                  color={Colors.white}
                  styling={{
                    ...CommonStyles.regularFont500Style,
                    lineHeight: RfH(21.6),
                    marginBottom: RfH(20),
                    marginHorizontal: RfW(24),
                  }}
                >
                  {`${selectedMonth?.monthText} Month`}
                </CustomText>
                {isClearFilter && (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{ marginRight: RfW(24) }}
                    onPress={onClickClearFilter}
                  >
                    <CustomText
                      fontSize={14}
                      color={Colors.white}
                      styling={CommonStyles.regularFont400Style}
                    >
                      {"Clear filter"}
                    </CustomText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
          renderItem={({ item }) =>
            item
              ? item.absenceType
                ? renderCalendarItem({ item })
                : renderAttendance({ item })
              : null
          }
          ListFooterComponent={
            isEmpty(
              isClearFilter
                ? selectedDateEventList
                : [...absenseList, ...formattedAttendance]
            ) && !isLoading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  paddingTop: RfH(30),
                }}
              >
                <CustomImage
                  image={Images.calendarNoFound}
                  imageHeight={HEIGHT.H100}
                  imageWidth={HEIGHT.H100}
                  imageResizeMode={"contain"}
                />

                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    ...CommonStyles.regularFont400Style,
                    lineHeight: RfH(16.8),
                    paddingTop: RfH(19),
                  }}
                >
                  {"No Events Arranged yet"}
                </CustomText>
              </View>
            ) : (
              <></>
            )
          }
          showsVerticalScrollIndicator={false}
        />

        {isShowComingSoonModal && (
          <CustomPopupModal
            isVisible={isShowComingSoonModal}
            messageInfo={{
              title: localize("common.ComingSoon"),
              description: "",
            }}
            pressedPopupButton={() => setisShowComingSoonModal(false)}
            buttonText={localize("common.okay")}
          />
        )}
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
  listContainer: {
    paddingHorizontal: RfW(16),
    paddingVertical: RfH(16),
    backgroundColor: Colors.primary,
    // borderWidth: RfH(1),
    marginBottom: RfH(15),
    marginHorizontal: RfW(24),
  },
  rowStyle: {
    borderColor: "white",
    borderWidth: 1,
    padding: RfW(5),
    borderRadius: 5,
    justifyContent: "center",
  },
  statusRow: { flexDirection: "row", alignItems: "center" },
  statusColor: {
    height: 10,
    width: 10,
    marginStart: 10,
    borderRadius: 10,
  },
});

export default Calendar;
