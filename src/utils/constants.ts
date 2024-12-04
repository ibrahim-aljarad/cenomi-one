import * as DeviceInfo from "react-native-device-info";
import { getTimeZone } from "react-native-localize";

import { Platform } from "react-native";

export const LOCAL_STORAGE_DATA_KEY = {
  TUTORIAL_SHOWN: "tutorial_shown",
  USER_TOKEN: "userToken",
  USER_INFO: "userInfo",
  REFRESH_TOKEN: "refreshToken",
  UN_AUTORISED_ACCESS: "unauth_access",
  IS_BIOMETRIC_ENABLE: "is_biometric_enabled",
  APP_LANGUAGE: "app_language",
  IS_REMEMBER_ME: "is_remember_me",
  IS_NOTIFICATION_ENABLE: "is_notification_allow",
  CORP_COMMU_READED_DATA: "corp_commu_readed_data",
  LOCAL_THEME_SETTINGS: "local_theme_settings",
  IS_SHOW_BIRTHDAY_WISHES_MODAL: "is_show_birthday_wishes_modal",
  IS_SHOW_WORKANNIVERSARY_WISHES_MODAL: "is_show_workanniversary_wishes_modal",
  IN_APP_REVIEW: "in_app_review",
  QUOTES_READED_DATA: "QUOTES_READED_DATA",
  TENANT_TOKEN: "tenant_token",
};

export const LOTTIE_JSON_FILES = {
  loaderJson: require("../jsonFiles/loader.json"),
  loaderDarkModeJson: require("../jsonFiles/whiteLoader.json"),
  faceId: require("../jsonFiles/faceId.json"),
  touchId: require("../jsonFiles/touchId.json"),
  lock: require("../jsonFiles/lock.json"),
  birthdayJson: require("../jsonFiles/Wishes/birthday.json"),
  newJonieeJson: require("../jsonFiles/Wishes/newJoniee.json"),
  workAnniversaryJson: require("../jsonFiles/Wishes/workAnniversary.json"),
};

export const IMAGE_BASE_URL = "https:";
export const isAndroid = Platform.OS === "android" ? true : false;

export const SERVICEREQUEST_APPROVALS = "approvals_";
export const SERVICEREQUEST_HR = "service_request_hr";

export const PHONE_HM = "HM";
export const PHONE_WM = "WM";
export const PHONE_W1 = "W1";
export const EMAIL_H1 = "H1";
export const EMAIL_W1 = "W1";
export const LINE_MANAGER = "LINE_MANAGER";
export const CATEGORYTYPEALL = "all";

export const CC_TEMPLATE_TEXT = "Text";
export const CC_TEMPLATE_HTML = "HTML";
export const CC_TEMPLATE_IMAGE = "Image";

export const DOCUMENTS_IMAGE = "Image";
export const DOCUMENTS_JPG = "jpg";
export const DOCUMENTS_JPEG = "jpeg";
export const DOCUMENTS_PNG = "png";
export const DOCUMENTS_VIDEO = "Video";
export const DOCUMENTS_TEXT = "Text";
export const DOCUMENTS_CSV = "CSV";
export const DOCUMENTS_PDF = "PDF";
export const DOCUMENTS_MS_EXCEL = "MS Excel";
export const DOCUMENTS_MS_WORD = "MS Word";
export const DOCUMENTS_ZIP = "ZIP";
export const DOCUMENTS_OTHERS = "Others";
export const DOCUMENTS_DOC = "doc";
export const DOCUMENTS_DOCX = "docx";
export const DOCUMENTS_XLS = "xls";
export const DOCUMENTS_XLSX = "xlsx";
export const DOCUMENTS_MSG = "msg";

export const inputs = {};

export const APP_VERSION = DeviceInfo.getVersion();
export const BUILD_NUMBER = DeviceInfo.getBuildNumber();
export const DEVICE_TIMEZONE = getTimeZone();

export const APPLICATION_ID = 2;

export let IP_ADDRESS = "";

DeviceInfo.getIpAddress().then((val) => {
  IP_ADDRESS = val;
});

export const LANGUAGE_KEY = "ar";

export const STANDARD_SCREEN_SIZE = 812;
export const STANDARD_SCREEN_DIMENSIONS = { height: 812, width: 375 };

export const CLIENT_INFO = {
  CLIENT_NAME: "Cenomi",
  CLIENT_APP_NAME: "Cenomi Central",
};

export const LEAVE_STATUS = {
  AWAITING: "AWAITING",
  CANCELED: "CANCELED",
  ORA_WDRWL_PEND: "ORA_WDRWL_PEND",
  DENIED: "DENIED",
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  INPROGRESS: "INPROGRESS",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  AVAILED: "AVAILED",
  REJECTED: "REJECTED",
};

export const APPROVAL_STATUS = {
  INFO_REQUESTED: "INFO_REQUESTED",
};

export const LEAVE_STATUS_LABEL = {
  ORA_WDRWL_PEND: "WITHDRAWAL PENDING",
};

export const APPROVAL_STATUS_LABEL = {
  INFO_REQUESTED: "INFO REQUESTED",
};

export const authType = {
  GOOGLE: "google",
  MICROSOFT: "azure_ad",
  EMAIL: "email",
};

export const externalUserType = {
  AZURE_AD: "azure_ad",
  GSUITE: "gsuite",
};

export const IntegrationTypeEnum = {
  OCA_CONNECT: "oca_connect",

  GSUITE: "gsuite",
  AZURE_AD: "azure_ad",

  ORACLE_FUSION: "oracle_fusion",
  YARDI: "yardi",

  CONTENTFUL: "contentful",
  WPENGINE: "wpengine",

  FIREBASE: "firebase",
  GOOGLE_ANALYTICS: "google_analytics",

  POWERBI: "powerbi",

  CHAT_GPT: "chat_gpt",
};

export const rewardsBottomTabsName = {
  MALLS: "malls",
  BRANDS: "brands",
  REWARDS: "rewards",
  PROFILE: "profile",
};

export const wisheshCatEnum = {
  GREETINGS: "greetings",
  BIRTHDAY: "birthday",
  WORKANNIVERSARIES: "workAnniversaries",
  NEWJOINERS: "newJoiners",
  PROMOTIONS: "promotions",
};

export const wishesCategoryList = [
  {
    key: wisheshCatEnum?.GREETINGS,
    name: "wish.greetings",
    isSelect: false,
  },
  {
    key: wisheshCatEnum?.BIRTHDAY,
    name: "wish.birthday",
    isSelect: false,
  },
  {
    key: wisheshCatEnum?.WORKANNIVERSARIES,
    name: "wish.workAnniversary",
    isSelect: false,
  },
  {
    key: wisheshCatEnum?.NEWJOINERS,
    name: "wish.newJoiners",
    isSelect: false,
  },
  {
    key: wisheshCatEnum?.PROMOTIONS,
    name: "wish.promotions",
    isSelect: false,
  },
];

export const wisheshForEnum = {
  SELFBIRTHDAY: "selfbirthday",
  OTHERSBIRTHDAY: "othersbirthday",
  SELFANNIVERSARY: "selfanniversary",
  OTHERSANNIVERSARY: "othersanniversary",
  NEWJOINER: "newjoiner",
};

export const BIRTHDAY_WISH_MSG =
  "Wishing you a very special birthday and a wonderful year ahead!";
export const ANNYVERSARY_WISH_MSG =
  "Wishing you a very special Anniversary and a wonderful year ahead!";
export const NEWJOINER_WISH_MSG =
  "Wishing you a warm welcome to the office and a wonderful year ahead!";

export const monthNameList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const botPressonfig = {
  composerPlaceholder: "Let's chat!",
  botConversationDescription: "Cenomi Employee productivity queries",
  botId: "1c468ac6-16c3-42ed-b505-052580b965a9",
  hostUrl: "https://cdn.botpress.cloud/webchat/v1",
  messagingUrl: "https://messaging.botpress.cloud",
  clientId: "1c468ac6-16c3-42ed-b505-052580b965a9",
  webhookId: "3f8c5f36-9210-48d9-bf09-d5da7171108b",
  lazySocket: true,
  themeName: "prism",
  botName: "Cenomi Employee GPT",
  avatarUrl: "https://i.postimg.cc/m2b92TbX/fawaz-al-hokair-group-logo.png",
  phoneNumber: "+966000000",
  emailAddress: "groupIT@cenomi.com",
  website: "Cenomi Employee GPT",
  stylesheet:
    "https://webchat-styler-css.botpress.app/prod/d514571e-cdff-46ac-a85e-78c93f397967/v24396/style.css",
  frontendVersion: "v1",
  useSessionStorage: true,
  enableConversationDeletion: true,
  theme: "prism",
  themeColor: "#2563eb",
  hideWidget: false,
  showCloseButton: false,
};

export const CONFIG_CONSTANT = {
  ANALYTICS: "analytics",
  APPROVALS_HR: "approvals_hr",
  APPROVALS_PROCUREMENT: "approvals_procurement",
  APPROVALS_YARDI: "approvals_yardi",
  APPROVALS_IT: "approvals_it",
  APPROVALS_WORKFLOW: "approvals_it",

  CALENDAR: "calendar",
  CHAT_GPT: "chat_gpt",
  CORPORATE_COMMUNICATION: "corporate_communication",
  // FAQ: 'faq',
  KNOWLEDGE_HUB: "knowledge_hub",
  KUDOS: "kudos",
  NEWS: "news",
  OFFERS: "offers",
  QUOTES: "quotes",
  SEND_WISHES: "send_wishes",
  SERVICE_REQUEST_HR: "service_request_hr",
  SERVICE_REQUEST_IT: "service_request_it",

  USEFUL_APPS: "useful_apps",
  EVENTS: "events",
  SURVEYS: "surveys",
  DOCUMENTS: "documents",
};

export const CalendarTypes = {
  ATTENDANCE_CALENDAR: "AttendanceCalendar",
  REPORTEES_CALENDAR: "ReporteesCalendar",
  EVENT_CALENDAR: "EventCalendar",
};
