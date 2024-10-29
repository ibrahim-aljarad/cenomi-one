import {
  Alert,
  AlertButton,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { Colors, Images } from "../theme";
import {
  LOCAL_STORAGE_DATA_KEY,
  STANDARD_SCREEN_DIMENSIONS,
} from "./constants";
import { isEmpty, isNumber } from "lodash";

import CookieManager from '@react-native-cookies/cookies';

import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import { capatalizeText } from "./helper";
import { localize } from "../locale/utils";
import moment from "moment";

export const storeData = async (key, value) => {
  try {
    let v = value;
    if (typeof value !== "string") {
      v = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, v);
  } catch (e) {
    throw e;
  }
};

export const getSaveData = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // clear error
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export const alertBox = (
  alertTitle = "",
  alertMsg = "",
  config = {
    positiveText: localize("common.ok"),
    cancelable: true,

    middleText: "",
    onMiddleClick: () => {},

    negativeText: "",
    onPositiveClick: () => {},
    onNegativeClick: () => {},
  }
) => {
  let configuration: AlertButton[] = [];
  if (!isEmpty(config.positiveText)) {
    configuration = [
      {
        text: config.positiveText, // Key to show string like "Ok" etc. i.e. positive response text
        onPress: config.onPositiveClick, // Key that contains function that executes on click of above text button
        isPreferred: true,
      },
    ];
  }
  if (!isEmpty(config.middleText)) {
    configuration = [
      ...configuration,
      {
        text: config.middleText, // Key to show string like "Cancel" etc. i.e. negative response text
        onPress: config.onMiddleClick, // Key that contains function that executes on click of above text button
      },
    ];
  }
  if (!isEmpty(config.negativeText)) {
    configuration = [
      ...configuration,
      {
        text: config.negativeText, // Key to show string like "Cancel" etc. i.e. negative response text
        onPress: config.onNegativeClick, // Key that contains function that executes on click of above text button
        style: "destructive",
      },
    ];
  }
  Alert.alert(alertTitle, alertMsg, configuration, {
    cancelable: config.cancelable,
  });
};

export const comingSoonAlert = () => alertBox("Coming Soon");

export const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

export const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};

export const deviceWidth = () => {
  const dim = Dimensions.get("window");
  return dim.width;
};

export const deviceHeight = () => {
  const dim = Dimensions.get("window");
  return dim.height;
};
export const deviceHeightScreen = () => {
  const dim = Dimensions.get("screen");
  return dim.height;
};

export const RfW = (value) => {
  const dim = Dimensions.get("window");
  return dim.width * (value / STANDARD_SCREEN_DIMENSIONS.width);
};

export const RfH = (value) => {
  const dim = Dimensions.get("window");
  return dim.height * (value / STANDARD_SCREEN_DIMENSIONS.height);
};

export const isIntegerString = (str) => /^\+?([0-9]\d*)$/.test(str);

export const isValidEmail = (str) =>
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);

export const isValidUserName = (str) => {
  if (isEmpty(str)) {
    return false;
  } else if (isIntegerString(str.trim())) {
    return true;
  } else {
    return isValidEmail(str.trim());
  }
};

export const getImageSource = (imagePath) =>
  isNumber(imagePath) ? imagePath : { uri: imagePath };

export const isDisplayWithNotch = () => {
  return DeviceInfo.hasNotch();
};

export const getFirstName = (name) => {
  return name ? name.split(" ")[0] : "";
};

export const getLastName = (name) => {
  return name
    ? name.split(" ").length > 1
      ? name.replace(getFirstName(name), "").trim()
      : ""
    : "";
};

export const getBgColor = (status) => {
  const actualStatus = status ? status.toLowerCase() : "";
  switch (actualStatus) {
    case "pending":
      return Colors.amber;
    case "approved":
      return Colors.green;
    case "rejected":
      return Colors.redOne;
    default:
      return Colors.grayOne;
  }
};

export const getGreeting = () => {
  let greeting = "";
  if (new Date().getHours() < 12) {
    greeting = "Good Morning, ";
  } else if (new Date().getHours() < 17) {
    greeting = "Good Afternoon, ";
  } else {
    greeting = "Good Evening, ";
  }
  return greeting;
};

export const getBulletNumbers = (index) => {
  switch (index) {
    case 1:
      return [0, 0, 1, 2, 3];
    case 2:
      return [0, 1, 2, 3, 0];
    default:
      return [1, 2, 3, 0, 0];
  }
};

export const isValidUrl = (str, isReturnValid) => {
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return isReturnValid ? `https:${str}` : regex.test(str);
};

export const uriEncode = (url) => {
  try {
    if (url) {
      return encodeURI(url.trim());
    }
    return url;
  } catch (error) {
    // handleError(error);
    return url;
  }
};

export const convertToBulletsData = (data) => {
  if (!isEmpty(data) && data !== "NULL") {
    try {
      return data.split("\n").filter((item) => item.trim() !== "");
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};

export const getFilterByFeature = (data) => {
  if (!isEmpty(data) && data !== "NULL") {
    try {
      return data.filter((item) => item.featuretrim() == type);
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};

export const getDayName = (day) => {
  switch (parseInt(day, 10)) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
};

export const getNumberWithOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export const splitApprovalsName = (name) => {
  try {
    return name.replace(" ", "\n");
  } catch (error) {
    return name;
  }
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const urlSlugify = (input, length = -1) => {
  let text = input;
  if (text && text.length > 0) {
    text = text.replace(/'/g, "");
    text = text.replace(/[`~!@#$%^&*()_\-+=\[\]{};:‘’।'"\\|\/,.<>?\s]/g, " ");
    text = text.replace(/^\s+|\s+$/gm, "");

    text = text
      .trim()
      .split(" ")
      .splice(0, length > 0 ? length : 100)
      .map((item) => {
        return item.trim();
      })
      .filter((item) => item.length > 0)
      .join("-");
    text = text.trim().toLowerCase();
  }

  return text;
};

export const getPublicContactDetails = (listData, type) => {
  const filteredData = listData?.find((item) => item?.type === type);

  return filteredData || {};
};

export const getProfilePicInfo = (profileData: any) => {
  const userName = profileData?.firstName || "";
  const lastName = profileData?.lastName || "";
  let profileText = "";

  if (lastName !== "") {
    profileText =
      "" + capatalizeText(userName.substring(0, 1) + lastName.substring(0, 1));
  } else {
    profileText = "" + capatalizeText(userName.substring(0, 2));
  }

  return { profileText, userName };
};

export const getFirstTwoLetterOfName = (name) => {
  const splitedData = name?.split(" ");
  let profileText = "";

  if (splitedData?.length > 1) {
    profileText =
      "" +
      capatalizeText(
        splitedData[0].substring(0, 1) + splitedData[1].substring(0, 1)
      );
  } else {
    profileText = "" + capatalizeText(splitedData[0].substring(0, 2));
  }

  return profileText || "";
};

export const getIsMatchedCurrentDate = (givenDate) => {
  const check = moment(givenDate, "YYYY/MM/DD");
  const givenMonth = check.format("M");
  const givenDay = check.format("D");

  const currCheck = moment(moment(), "YYYY/MM/DD");
  const currMonth = currCheck.format("M");
  const currDay = currCheck.format("D");

  return givenDay === currDay && givenMonth === currMonth;
};

export const mailTo = (email, subject = "", body = "") => {
  if (isValidEmail(email)) {
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  }
};

export const callTo = (phone) => {
  Linking.openURL(`tel:${phone}`);
};

export const whatsappTo = (phone, text) => {
  Linking.openURL(
    `whatsapp://send?text=${text}&phone=${
      Platform.OS == "android" ? phone : phone.replace(/ /g, "")
    }`
  );
};

export const openExternalUrl = (url) => {
  Linking.openURL(url);
};

export const checkRateReviewStorage = async () => {
  try {
    const date = await getSaveData(LOCAL_STORAGE_DATA_KEY.IN_APP_REVIEW);
    const storeDate = date ? date : "";
    if (storeDate && !isEmpty(storeDate)) {
      const diff = moment().diff(JSON.parse(storeDate || ""), "days");
      if (diff <= 30 * 6) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const isValidYouTubeUrl = (urlToParse) => {
  if (urlToParse) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (urlToParse.match(regExp)) {
      return true;
    }
  }
  return false;
};

export const getFeatueModuleDataInfo = (list, feature) => {
  if (!isEmpty(list) && list?.length > 0) {
    const filteredData = list?.find(
      (item) => item?.feature?.toLowerCase() === feature?.toLowerCase()
    );

    return {
      isActive: filteredData?.isActive || false,
      isLive: filteredData?.isLive || false,
      iconUrl: filteredData?.iconUrl || "",
    };
  }

  return { isActive: false, isLive: false, iconUrl: "" };
};

export const getUserConfigData = (data, feature, featureModuleData) => {
  if (!isEmpty(data)) {
    const temp = data[feature?.toLowerCase()];
    const featureStatus = getFeatueModuleDataInfo(
      featureModuleData,
      feature
    )?.isActive;

    return (temp && featureStatus) || false;
  } else {
    return false;
  }
};

export const isEmailIncluded = ({ myProfileData, targetedEmails }) => {
  if (targetedEmails) {
    //getting email id from profile data
    const userEmail = myProfileData.profile.emails.map(
      (item: { emailType: string; emailAddress: string }) => item.emailAddress
    )[0];
    console.log("first user email", myProfileData.profile);
    console.log("isEmailIncluded", { userEmail, targetedEmails });
    //getting targetedEmail Ids from cms as an array. orginal value is string
    let emailArray = targetedEmails
      ?.split(",")
      .map((email: string) => email.trim());
    console.log("isEmailIncludeds", emailArray.includes(userEmail));

    //retuning true if loggedin Id is in the array
    return emailArray.includes(userEmail);
  }
  return true;
};

export const getDatesInRange = (startDate, endDate, isDarkMode = false) => {
  const date = new Date(startDate);

  let modifiedData = {};
  while (new Date(date) <= new Date(endDate)) {
    const formatedDate = moment(new Date(date)).format("YYYY-MM-DD");

    if (formatedDate === moment().format("YYYY-MM-DD")) {
      modifiedData = {
        ...modifiedData,
        [formatedDate]: {
          marked: true,
          dots: [
            {
              key: "customDot",
              color: Colors.primary,
            },
          ],
        },
      };
    } else {
      modifiedData = {
        ...modifiedData,
        [formatedDate]: {
          marked: true,
          dots: [
            {
              key: "customDot",
              color: Colors.primary,
            },
          ],
        },
      };
    }

    // dates.push(moment(new Date(date)).format('YYYY-MM-DD'));
    date.setDate(date.getDate() + 1);
  }

  // return dates;
  return modifiedData;
};

export const isValidHtml = (str) =>
  /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(str);

export const trimedSentence = (
  str: string,
  maxLength: number = 100,
  ending: string = "..."
) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - ending.length) + ending;
  } else {
    return str;
  }
};

export const getQuaterStartAndEndDate = () => {
  // Get the current date
  const date = new Date();

  // Get the month of the year as a number (0-11)
  const month = date.getMonth();

  // Calculate the quarter of the year
  // const quarter = Math.floor((month + 3) / 3);
  const quarter = 1;
  const previousQuarter = quarter - 1;

  console.log(`Quarter: ${quarter}`);

  const currentQuarterStart = moment(
    new Date(date.getFullYear(), (quarter - 1) * 3, 1)
  ).format("YYYY-MM-DD");
  const currentQuarterEnd = moment(
    new Date(date.getFullYear(), quarter * 3, 0)
  ).format("YYYY-MM-DD");

  const previousQuarterStart = moment(
    new Date(date.getFullYear(), (previousQuarter - 1) * 3, 1)
  ).format("YYYY-MM-DD");
  const previousQuarterEnd = moment(
    new Date(date.getFullYear(), previousQuarter * 3, 0)
  ).format("YYYY-MM-DD");

  const currentQuarterYear = moment(currentQuarterStart).format("YYYY");
  const previousQuarterYear = moment(previousQuarterStart).format("YYYY");

  return {
    currentQuarterStart,
    currentQuarterEnd,
    currentQuarter: quarter,
    currentQuarterYear,

    previousQuarterStart,
    previousQuarterEnd,
    previousQuarter: previousQuarter === 0 ? 4 : previousQuarter,
    previousQuarterYear,
  };
};

export const isNullOrUndefinedOrEmpty = (value) => {
  return value === undefined || value === null || value === "";
};

export const setCookie = async (domain: string, name: string, value: string) => {
  await CookieManager.set(domain, {
    name,
    value,
  });
};

export const getCookie = async (domain: string) => {
  const cookies = await CookieManager.get(domain);
  return cookies;
};