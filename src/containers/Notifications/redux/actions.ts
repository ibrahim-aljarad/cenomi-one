import { createRoutine } from 'redux-saga-routines';
import {
  SET_NOTIFICATION_PAYLOAD,
  SET_NOTIFICATION_PAYLOAD_COPY,
  GET_NOTIFICATION,
  MARKALL_READ_NOTIFICATION,
  MARK_READ_NOTIFICATION,
  RESET_MARK_READ_NOTIFICATION_FLAG
} from './constants';

export const setNotificationPayload = createRoutine(SET_NOTIFICATION_PAYLOAD);
export const setIsNotificationCopy = createRoutine(SET_NOTIFICATION_PAYLOAD_COPY);
export const getNotification = createRoutine(GET_NOTIFICATION);
export const markallReadNotification = createRoutine(MARKALL_READ_NOTIFICATION);
export const markReadNotification = createRoutine(MARK_READ_NOTIFICATION);
export const resetMarkReadNotificationFlag = createRoutine(RESET_MARK_READ_NOTIFICATION_FLAG);
