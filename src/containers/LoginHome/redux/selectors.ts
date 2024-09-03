import { createSelector } from "reselect";
import { initialState } from "./reducer";
import REDUCER_KEY from "../../../store/reducerKeys";

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.LOGIN_REDUCER] || initialState;

const isLoginSuccessSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.isLoginDone;
  }
);

const getMyProfileDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.myProfileDetails;
  }
);

const isAutoLoginSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isAutoLogin
);

const isLoggedInSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isLoggedIn
);

const isBiometricOpenSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isBiometricOpen
);

const isLoggedOutDoneSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isLoggedOutDone
);

const checkUserDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.checkUserData
);

const getIsRefreshTokenSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isRefreshToken
);

const getUserTypeSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.userType
);

const getNationalitySelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.nationality
);

const getOrganizationDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.organizationDetails
);

export {
  isLoginSuccessSelector,
  getMyProfileDetailsSelector,
  isAutoLoginSelector,
  isLoggedInSelector,
  isLoggedOutDoneSelector,
  checkUserDataSelector,
  getIsRefreshTokenSelector,
  getUserTypeSelector,
  getNationalitySelector,
  isBiometricOpenSelector,
  getOrganizationDetailsSelector,
};
