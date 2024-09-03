import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../store/reducerKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.APP_REDUCER] || initialState;

const isSplashScreenVisibleSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isSplashScreenVisible;
});

const isLoadingSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isLoading
);

const selectGlobalError = createSelector(selectGlobalSubStore, (globalState) => globalState.error);
const selectIsGlobalError = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isError
);

const getNetworkStateSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.networkConnected;
});

const getIsForceUpdateSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isAppForceUpdate
);
const getIsUnderMaintenanceSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isAppUnderMaintenance
);

const getIsApiExecutingSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isAPIExecuting
);

export {
  isSplashScreenVisibleSelector,
  isLoadingSelector,
  selectGlobalError,
  selectIsGlobalError,
  getNetworkStateSelector,
  getIsForceUpdateSelector,
  getIsUnderMaintenanceSelector,
  getIsApiExecutingSelector
};
