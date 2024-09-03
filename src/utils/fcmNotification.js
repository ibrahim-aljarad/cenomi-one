import messaging from "@react-native-firebase/messaging";
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import { storeData } from "./helpers";
import { LOCAL_STORAGE_DATA_KEY } from "./constants";
import { PermissionsAndroid, Platform } from "react-native";

const registerForInAppMessages = async () => {
  await inAppMessaging().setMessagesDisplaySuppressed(true);
};

const registerAppWithFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
};

const onMessage = () => {
  messaging().onMessage(async (remoteMessage) => {
    console.log("ON MESSAGE TRIGGERRED", remoteMessage);
  });
};

const requestUserPermission = async () => {
  let enabled;
  if (Platform.OS === "ios") {
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else {
    enabled = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  if (enabled) {
    await messaging().registerDeviceForRemoteMessages();
    console.log("Notification permission allowed....");
    storeData(LOCAL_STORAGE_DATA_KEY.IS_NOTIFICATION_ENABLE, true);
  } else {
    console.log("User declined messaging permissions :(");
    storeData(LOCAL_STORAGE_DATA_KEY.IS_NOTIFICATION_ENABLE, false);
  }
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken ? fcmToken : null;
};

const initializeNotification = () => {
  // registerAppWithFCM();
};

const deleteNotificationToken = async () => {
  const temp = await messaging().deleteToken();
};

export {
  initializeNotification,
  requestUserPermission,
  getFcmToken,
  registerAppWithFCM,
  deleteNotificationToken,
};
