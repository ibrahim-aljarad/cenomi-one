import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../../store/reducerKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.NOTIFICATION_REDUCER] || initialState;

const getNotificationSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.notifications;
});

const isNotificationAvailableSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isNotification;
});

const isNotificationAvailableCopySelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isNotificationCopy;
});

const notificationPayloadSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.notificationPayload;
});

const isMoreLoadedSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.fetchLoaded;
});

const isAllReadNotificationSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isAllReadNotification;
});

const isReadNotificationSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isReadNotification;
});

export {
  getNotificationSelector,
  isNotificationAvailableSelector,
  notificationPayloadSelector,
  isNotificationAvailableCopySelector,
  isMoreLoadedSelector,
  isAllReadNotificationSelector,
  isReadNotificationSelector
};
