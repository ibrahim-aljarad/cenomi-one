import moment from "moment";
import { Colors } from "../../theme";
import { MonthTypes } from "./types";

export const changeSelectedStatus = ({ reportees, employeeId }) =>
  reportees?.map((item: { employeeId: number; isSelected: boolean }) => {
    if (item?.employeeId === employeeId) {
      return { ...item, isSelected: true };
    } else {
      return { ...item, isSelected: false };
    }
  });

export const changeCalendarTypeStatus = ({
  selectedCategory,
  calendarTypeList,
}) =>
  calendarTypeList?.map((item: { value: number; isSelect: boolean }) => {
    if (item?.value === selectedCategory) {
      return { ...item, isSelect: true };
    } else {
      return { ...item, isSelect: false };
    }
  });
function parseTime(time: string, date: string) {
  const [hours, minutes, seconds] = time.split(/[: ]/);
  const period = time.split(" ")[1];
  let hours24 = parseInt(hours, 10);
  if (period === "PM" && hours24 < 12) hours24 += 12;
  if (period === "AM" && hours24 === 12) hours24 = 0;
  return new Date(
    `${date}T${hours24.toString().padStart(2, "0")}:${minutes}:${seconds}`
  ).getTime();
}

function getAllDatesInMonth(year: number, month: number, weekend: string[]) {
  const date = new Date(year, month, 1);
  const dates: Date[] = [];

  while (date.getMonth() === month) {
    const dayName = moment(date).format('dddd');
    if (!weekend.includes(dayName)) {
      dates.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return dates;
}
function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export const calculateTimestampDifferences = (
  data,
  selectedMonth: MonthTypes,
  weekend: string[]
) => {
  const dates = getAllDatesInMonth(
    selectedMonth.year,
    selectedMonth.monthNumber - 1,
    weekend
  );
  const result = {};
  const today = moment().startOf('day');
  dates.forEach((dateObj) => {
    const date = formatDateToYYYYMMDD(dateObj);
    const momentDate = moment(date);
    if (momentDate.isAfter(today) || isWeekend(weekend, date)) {
        return;
      }
    if (data[date]) {
      const timestamps = data[date].timestamps;
      const differences: number[] = [];
      if (timestamps.length === 1) {
        data[date].dots[0].color = !hasTimePassed10AM(timestamps[0])
          ? Colors.green
          : Colors.orange;
      } else {
        for (let i = 1; i < timestamps.length; i++) {
          const previousTime = parseTime(timestamps[i - 1], date);
          const currentTime = parseTime(timestamps[i], date);
          const differenceInHours = Math.abs(
            (currentTime - previousTime) / 1000 / 60 / 60
          );

          data[date].dots[0].color =
            !hasTimePassed10AM(timestamps[0]) && differenceInHours > 8
              ? Colors.green
              : Colors.orange;

          differences.push(differenceInHours); // Difference in minutes
        }
      }
      result[date] = {
        ...data[date],
        timestampDifferences: differences,
      };
    } else {
      // Set default data for dates that don't have data
      result[date] = {
        marked: true,
        dots: [
          {
            key: "customDot",
            color: Colors.red,
          },
        ],
        timestamps: [],
        timestampDifferences: [],
      };
    }
  });

  return result;
};

export const getStatusTitle = ({ timestampDifferences, timestamps }) => {
  if (hasTimePassed10AM(timestamps[0])) {
    return "Late In";
  } else if (!timestamps[1] && isTimePast8PM()) {
    return "Status Missing";
  } else if (!hasTimePassed10AM(timestamps[0]) && !timestamps[1]) {
    return "On Time";
  } else if (timestampDifferences >= 8) {
    return "On Time";
  } else if (timestampDifferences < 8) {
    return "Leave Early";
  } else {
    console.log("we are here");
    return "Absent";
  }
};

export const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

export const convertHoursToHoursAndMinutes = (hours: number) => {
  const wholeHours = Math.floor(hours); // Get the whole number part (hours)
  const decimalPart = hours - wholeHours; // Get the decimal part
  const minutes = Math.round(decimalPart * 60); // Convert the decimal part to minutes

  return `${padNumber(wholeHours)}:${padNumber(minutes)}`;
};
function padNumber(num: number): string {
  return num.toString().padStart(2, "0");
}
function hasTimePassed10AM(timeString: string): boolean {
  if (timeString) {
    // Split the time string into hours, minutes, and seconds
    let [hours, minutes] = timeString.split(":").map(Number);
    if (timeString.includes("PM") && hours !== 12) {
      hours += 12;
    }
    // Create a Date object for the given time
    const time = new Date();
    time.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

    // Create a Date object for 10:00:00 AM
    const tenAM = new Date();
    tenAM.setHours(12, 30, 0, 0); // Set to 10:00:00 AM

    // Compare the two Date objects
    return time > tenAM;
  }
  return true;
}

const isTimePast8PM = () => {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 20;
};

export const getStatusColors = ({ startTime, duration, timestamps }) => {
  if (timestamps?.length === 1) {
    return !hasTimePassed10AM(startTime) ? Colors.green : Colors.orange;
  } else if (duration) {
    return !hasTimePassed10AM(startTime) && duration > 8
      ? Colors.green
      : Colors.orange;
  }

  return Colors.red;
};

export function mergeData(updatedData, tempList) {
  const mergedData = { ...updatedData };

  for (const key in tempList) {
    if (tempList.hasOwnProperty(key)) {
      if (mergedData.hasOwnProperty(key)) {
        // Merge arrays and other data structures
        mergedData[key] = {
          ...mergedData[key],
          ...tempList[key],
          timestamps: Array.from(
            new Set([
              ...(mergedData[key].timestamps || []),
              ...(tempList[key].timestamps || []),
            ])
          ),
          timestampDifferences: Array.from(
            new Set([
              ...(mergedData[key].timestampDifferences || []),
              ...(tempList[key].timestampDifferences || []),
            ])
          ),
        };
      } else {
        mergedData[key] = tempList[key];
      }
    }
  }
  return mergedData;
}
export const sortArrayByDate = (array) => {
  return array.sort((a, b) => {
    const dateA = a.startDateTime
      ? new Date(a.startDateTime)
      : new Date(a.date);
    const dateB = b.startDateTime
      ? new Date(b.startDateTime)
      : new Date(b.date);
    return dateA - dateB;
  });
};


export const isWeekend = (weekend:string[] , date: string) => {
    const dayOfWeek = moment(date).format('dddd');
    return weekend?.includes(dayOfWeek);
}
