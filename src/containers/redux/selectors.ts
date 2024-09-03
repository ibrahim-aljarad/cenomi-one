import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../store/reducerKeys';

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.COMMON_REDUCER] || initialState;

const getFileUploadedDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.fileUploadedData;
});

const getFilePreviewedDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.filePreviewedData;
});

const getSyncProfileCompletedSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.syncProfileCompleted;
});

const getIsMarkOnboardedSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isMarkOnboarded;
});

const getStaticDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.staticData;
});

const getPublicStaticDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.publicStaticData;
});

const isDarkModeSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isDarkMode;
});

const isChatWindowVisibleSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isChatWindowVisible;
});

const getWishesListSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.wisheshList;
});

const getOrganizationConfigSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.organizationConfigData;
});

const getNewsListSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.newsList;
});

const getGreetingsDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.greetingsListData;
});

export {
  getFileUploadedDataSelector,
  getFilePreviewedDataSelector,
  getSyncProfileCompletedSelector,
  getIsMarkOnboardedSelector,
  getStaticDataSelector,
  getPublicStaticDataSelector,
  isDarkModeSelector,
  getWishesListSelector,
  isChatWindowVisibleSelector,
  getOrganizationConfigSelector,
  getNewsListSelector,
  getGreetingsDataSelector
};
