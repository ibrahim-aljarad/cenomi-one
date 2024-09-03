import produce from 'immer';
import {
  setNotificationPayload,
  setIsNotificationCopy,
  getNotification,
  markallReadNotification,
  markReadNotification,
  resetMarkReadNotificationFlag
} from './actions';

export const initialState = {
  notifications: [],
  readNotification: [],
  totalNotification: 0,
  isNotificationHome: false,
  fetchLoaded: false,
  notificationPayload: {},
  isNotification: false,
  isNotificationCopy: false,
  unreadCount: 0,
  isAllReadNotification: false,
  isReadNotification: false,
  registerStayCaeInterestData: {}
};

export default (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case setIsNotificationCopy.TRIGGER: {
        draft.isNotificationCopy = action.payload;
        break;
      }

      case setNotificationPayload.TRIGGER: {
        draft.isNotification = false;
        draft.isNotificationCopy = false;
        draft.isNotificationHome = false;
        draft.notificationPayload = {};
        break;
      }
      case setNotificationPayload.SUCCESS: {
        draft.isNotification = true;
        draft.isNotificationHome = true;
        draft.notificationPayload = action.payload;
        break;
      }

      case getNotification.TRIGGER: {
        draft.notifications = [];
        break;
      }
      case getNotification.SUCCESS: {
        const { data } = action?.payload || {};
        draft.notifications = data;
      }

      case markallReadNotification.TRIGGER: {
        draft.isAllReadNotification = false;
        break;
      }
      case markallReadNotification.SUCCESS: {
        draft.isAllReadNotification = true;
        break;
      }

      case markReadNotification.TRIGGER: {
        draft.isReadNotification = false;
        break;
      }
      case markReadNotification.SUCCESS: {
        draft.isReadNotification = true;
        break;
      }

      case resetMarkReadNotificationFlag.TRIGGER: {
        draft.isReadNotification = false;
        draft.isAllReadNotification = false;
        break;
      }

      default: {
        break;
      }
    }
  });
