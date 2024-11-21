import { isNumber } from "lodash";
import moment from "moment";
import { Linking, PermissionsAndroid, Platform } from "react-native";
import {
  default as RNFetchBlob,
  default as ReactNativeBlobUtil,
} from "react-native-blob-util";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { openSettings } from "react-native-permissions";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_SCREEN_DIMENSIONS,
} from "../constant";
import { getLanguage, localize } from "../locale/utils";
import {
  IMAGE_BASE_URL,
  LOCAL_STORAGE_DATA_KEY,
  PHONE_HM,
  PHONE_WM,
} from "./constants";
import { alertBox, clearAll, getSaveData, storeData } from "./helpers";
import Color from "color";
import { initializeSslPinning } from "react-native-ssl-public-key-pinning";
import JailMonkey from "jail-monkey";
import crashlytics from '@react-native-firebase/crashlytics';

export function openLinkInBrowser(url: string) {
    Linking.canOpenURL(url)
      .then((canOpen) => {
        if (canOpen) {
          return Linking.openURL(url).catch((error) => {
            crashlytics().recordError(new Error(`Failed to open URL: ${url}. Error: ${error.message}`));
            crashlytics().log(`Attempted to open URL: ${url}`);
            console.error('Error opening URL:', error);
          });
        } else {
          crashlytics().log(`URL not supported: ${url}`);
          console.warn(`Cannot open URL: ${url}`);
        }
      })
      .catch((error) => {
        crashlytics().recordError(new Error(`URL check failed: ${url}. Error: ${error.message}`));
        console.error('Error checking URL:', error);
      });
  }

export const RfW = (value: number) =>
  SCREEN_WIDTH * (value / STANDARD_SCREEN_DIMENSIONS.width);

export const capatalizeText = (str: string) => str?.toUpperCase();

export const RfH = (value: number) =>
  SCREEN_HEIGHT * (value / STANDARD_SCREEN_DIMENSIONS.height);

export const isBase64Data = (data) => {
  const base64Regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64Regex.test(data);
};

export const getImageSource = (imagePath: number | string) => {
  if (isBase64Data(imagePath)) {
    return { uri: `data:image/png;base64,${imagePath}` };
  } else {
    return isNumber(imagePath) ? imagePath : { uri: imagePath };
  }
};

export const getDayDateFormat = (myDate: string) =>
  myDate ? moment(myDate).format("ddd, DD-MMM-YYYY") : "";
export const getDateFormat = (myDate: string, format: string = "DD-MMM-YYYY") =>
  myDate ? moment(myDate).format(format) : "";

export const getTimeFormat = (myDate: string, format: string = "h:mm A") =>
  myDate ? moment(myDate).format(format) : "";

export const getDateFormat2 = (myDate: string) =>
  myDate
    ? moment(myDate.split(" ")[0], "M/D/YYYY", true).format("DD-MMM-YYYY")
    : "";

export const getImageUrl = (url: string) => {
  if (url) {
    return url?.includes(IMAGE_BASE_URL) ? url : `${IMAGE_BASE_URL}${url}`;
  }
  return undefined;
};

export const getPhoneNumBytype = (type, list) => {
  const phoneObj = list?.find((item) => item.phoneType === type);
  return phoneObj
    ? "+" +
        (phoneObj.countryCodeNumber ? phoneObj.countryCodeNumber : "966") +
        " " +
        phoneObj.phoneNumber
    : "-";
};

export const getWorkHomeMobilePhoneNumber = (phones) => {
  const wm = getPhoneNumBytype(PHONE_WM, phones);
  const hm = getPhoneNumBytype(PHONE_HM, phones);

  return wm !== "-" ? wm : hm;
};

export const getEmailBytype = (type, list) => {
  const emailObj = list?.find((item) => item.emailType === type);
  return emailObj ? emailObj.emailAddress : "-";
};

export const dateFormatFromNow = (date) => {
  const date1 = moment(date);
  const date2 = moment();
  const diff = date2.diff(date1, "day");
  let formatedDate = "";
  if (diff > 2) {
    formatedDate = moment(date).format("DD-MMM-YYYY | h:mm a");
  } else {
    formatedDate = moment(date).fromNow();
  }

  return formatedDate;
};

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
}

export const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const fileViewer = (url) => {
  FileViewer.open(url)
    .then(() => {
      // success
      console.log("File opened...");
    })
    .catch((error) => {
      // error
      console.log("error========>", error);
    });
};

export const downloadFile = async (url, name, isOpenExistFile = false) => {
  if (!validURL(url)) {
    alertBox("", "Incorrect url");
    return;
  }
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    alertBox(
      "",
      "Please allow file read and write permissions to preview this document.",
      {
        positiveText: `Settings`,
        cancelable: true,
        negativeText: `Cancel`,
        onPositiveClick: () => openSettings(),
        onNegativeClick: () => {
          setIsEnabled(false);
          goBack();
        },
      }
    );
    return;
  }
  const fileType = url.split(".").pop();
  let filePath = RNFS.DocumentDirectoryPath;
  if (Platform.OS === "ios") {
    filePath = RNFS.DocumentDirectoryPath;
  } else {
    const dirs = RNFetchBlob.fs.dirs;
    filePath = dirs.DownloadDir;
  }

  const toFile = `${filePath}/${name}.${fileType}`;
  if (isOpenExistFile && (await RNFS.exists(toFile))) {
    console.log("file already exist...");
    FileViewer.open(toFile)
      .then(() => {
        // success
        console.log("File opened...");
      })
      .catch((error) => {
        // error
        console.log("error========>", error);
      });
  } else {
    RNFS.downloadFile({
      fromUrl: url,
      toFile: toFile,
    })
      .promise.then((r) => {
        console.log("result============>", r);
        FileViewer.open(toFile)
          .then(() => {
            // success
            console.log("File opened...");
          })
          .catch((error) => {
            // error
            console.log("error========>", error);
          });
      })
      .catch((e) => {
        console.log("error========>", e);
      });
  }
};

export const currencyFormat = (amount) => {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const clearAllExceptTutorialShowAppLanguage = async (logoutCall) => {
  const corporateCommunication = JSON.parse(
    (await getSaveData(LOCAL_STORAGE_DATA_KEY.CORP_COMMU_READED_DATA)) || "{}"
  );
  const tempLocalTheme = JSON.parse(
    (await getSaveData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS)) || "false"
  );
  const tempIsShownQoutes = await getSaveData(
    LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA
  );
  const tempBirthdayWishesFlag = await getSaveData(
    LOCAL_STORAGE_DATA_KEY.IS_SHOW_BIRTHDAY_WISHES_MODAL
  );
  const tempAnniversaryWishesFlag = await getSaveData(
    LOCAL_STORAGE_DATA_KEY.IS_SHOW_WORKANNIVERSARY_WISHES_MODAL
  );

  clearAll().then(() => {
    storeData(LOCAL_STORAGE_DATA_KEY.TUTORIAL_SHOWN, JSON.stringify(true)).then(
      () => {
        const selectedLanguage = getLanguage();
        storeData(
          LOCAL_STORAGE_DATA_KEY.APP_LANGUAGE,
          JSON.stringify(selectedLanguage)
        );

        if (logoutCall) {
          storeData(
            LOCAL_STORAGE_DATA_KEY.CORP_COMMU_READED_DATA,
            JSON.stringify(corporateCommunication)
          );
        }

        storeData(
          LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS,
          JSON.stringify(tempLocalTheme)
        );
        storeData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA, tempIsShownQoutes);
        storeData(
          LOCAL_STORAGE_DATA_KEY.IS_SHOW_BIRTHDAY_WISHES_MODAL,
          tempBirthdayWishesFlag
        );
        storeData(
          LOCAL_STORAGE_DATA_KEY.IS_SHOW_WORKANNIVERSARY_WISHES_MODAL,
          tempAnniversaryWishesFlag
        );
      }
    );
  });
};

export const downloadDoc = async (
  url: any,
  fileName: any,
  fileType: any,
  handleDocDownloaded: any,
  handleDownloadedError: any
) => {
  let dirs = ReactNativeBlobUtil.fs.dirs;
  ReactNativeBlobUtil.config({
    // response data will be saved to this path if it has access right.
    path: dirs.DocumentDir + `/${fileName}.${fileType}`,
  })
    .fetch("GET", url, {
      //some headers ..
    })
    .then((res) => {
      // the path should be dirs.DocumentDir + 'path-to-file.anything'
      handleDocDownloaded(res.path());
      console.log("The file saved to ", res.path());
    })
    .catch((error) => {
      handleDownloadedError();
      console.log("Error downloading:", error);
    });
};

export const precisionRound = (number, precision) => {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const diffenceBetweenDays = (startDate, endDate) => {
  let diffDays = 0;
  if (startDate && endDate) {
    const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  return diffDays;
};

export const checkFeatureModuleVisibility = (
  featureModuleData,
  user,
  module_name
) => {
  return (
    user?.config?.config[module_name] &&
    featureModuleData?.[module_name]?.isLive
  );
};

export const getColorWithOpacity = (color: string, opacity: number = 1) => {
  // Convert color to Color object
  const colorObject = Color(color);

  // Ensure the color is in RGBA format
  const rgbaColor = colorObject.rgb().alpha(opacity).toString();

  return rgbaColor;
};

export const jailBreak = () => {
  //  if (JailMonkey.isJailBroken()) {
  // // Alternative behaviour for jail-broken/rooted devices.
  // }

  return JailMonkey.isJailBroken();
};

export const getFirstDay = ({ weekend }) => {
  const defaultWeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (weekend?.length) {
    const findIndex = defaultWeekDays?.findIndex(
      (item) => item === weekend[weekend?.length - 1]
    );

    return findIndex === 6 ? 0 : findIndex + 1;
  }

  return 0;
};
