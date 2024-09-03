import React, { memo } from "react";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import moment from "moment";
import { Colors, FontSize, Fonts, HEIGHT, Images, WIDTH } from "../../theme";
import { RfH } from "../../utils/helper";
import { BorderRadius } from "../../theme/sizes";
import CustomImage from "../CustomImage";
import { isRTL } from "../../locale/utils";
import { CalendarProps, DateProps } from "../../containers/Calendar/types";

function CustomCalendar(props: CalendarProps) {
  const {
    maximumDate,
    minimumDate,
    hideDayNames,
    monthFormat,
    firstDay,
    onPressDate,
    eventDateList,
    onMonthChange,
    isDarkMode,
  } = props;

  const isRtl = isRTL();

  const onDayPress = (date: DateProps) => {
    onPressDate && onPressDate(date);
  };

  return (
    <Calendar
      // Initially visible month. Default = now
      // current={currentDate}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={minimumDate}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={maximumDate}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={monthFormat}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        onMonthChange(month);
      }}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={firstDay}
      // Hide day names. Default = false
      hideDayNames={hideDayNames}
      disableAllTouchEventsForDisabledDays={true}
      onDayPress={(date) => onDayPress(date)}
      onDayLongPress={(date) => onDayPress(date)}
      style={styles.calendarContainer}
      markingType={"multi-dot"}
      markedDates={{
        [moment().format("YYYY-MM-DD")]: {},
        ...eventDateList,
      }}
      theme={{
        calendarBackground: Colors.transparent,
        selectedDayBackgroundColor: Colors.primary,
        textDayHeaderFontFamily: Fonts.regularFont,
        textDayHeaderFontSize: FontSize[13],
        textMonthFontFamily: Fonts.regularFont,
        textMonthFontSize: FontSize[18],
        monthTextColor: isDarkMode ? Colors.white : Colors.white,

        textDayFontFamily: Fonts.regularFont,
        textDayFontSize: FontSize[13],

        dayTextColor: isDarkMode ? Colors.silverGray : Colors.white,

        dotColor: Colors.primary,

        dotStyle: {
          width: HEIGHT.H8,
          height: HEIGHT.H8,
          borderRadius: HEIGHT.H5,
        },
        "stylesheet.calendar.header": {
          header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: BorderRadius.BR0,
            borderTopRightRadius: BorderRadius.BR0,
          },
          dayHeader: {
            color: isDarkMode ? Colors.white : Colors.white,
            fontFamily: Fonts.regularFont,
            fontSize: HEIGHT.H12,
            fontWeight: "500",
            width: WIDTH.W30,
            height: WIDTH.W30,
            textAlign: "center",
            justifyContent: "center",
          },
          dayTextAtIndex5: {
            color: Colors.red,
          },
          dayTextAtIndex6: {
            color: Colors.red,
          },
        },

        "stylesheet.day.basic": {
          base: {
            width: WIDTH.W42,
            height: WIDTH.W42,
            alignItems: "center",
            justifyContent: "center",
            textColor: Colors.white,
            paddingBottom: 2,
          },
          text: {
            marginTop: 0,
            color: isDarkMode ? Colors.white : Colors.white,
          },
        },
      }}
      renderArrow={(direction) => {
        return (
          <CustomImage
            image={
              direction === "right"
                ? isRtl
                  ? Images.chevronLeft
                  : Images.chevronRight
                : isRtl
                ? Images.chevronRight
                : Images.chevronLeft
            }
            imageWidth={WIDTH.W30}
            imageHeight={WIDTH.W30}
            styling={{ justifyContent: "center", paddingVertical: HEIGHT.H16 }}
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
        );
      }}
    />
  );
}

export default memo(CustomCalendar);
