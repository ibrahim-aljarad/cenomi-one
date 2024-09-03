import produce from 'immer';

import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import { storeData } from '../../../utils/helpers';
import {
  checkUser,
  doGoogleLogin,
  doLogin,
  doLogout,
  doLogoutAll,
  getMyProfile,
  getOrganizationInfo,
  refreshToken,
  resetLoginData,
  setIsAutoLogin,
  setIsBiometricOpen,
  setIsLoggedIn
} from './actions';

export const initialState = {
  isLoginDone: false,
  userInfo: {},
  myProfileDetails: {},
  isAutoLogin: false,
  isLoggedIn: false,
  isBiometricOpen: false,
  isLoggedOutDone: false,
  checkUserData: {},
  isRefreshToken: false,
  userType: '',
  nationality: '',
  organizationDetails: {}
};

export default (state = initialState, action: { type: any; payload: { type: any } }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case resetLoginData.TRIGGER: {
        draft.isLoginDone = false;
        draft.userInfo = {};
        draft.isAutoLogin = false;
        draft.myProfileDetails = {};
        break;
      }

      case refreshToken.TRIGGER:
        draft.isRefreshToken = false;
        break;
      case doLogin.TRIGGER: {
        draft.isLoginDone = false;
        draft.userInfo = {};
        draft.isAutoLogin = false;
        break;
      }

      case refreshToken.SUCCESS:
        const { userInfo }: any = action.payload;
        draft.isRefreshToken = true;
        draft.userInfo = userInfo ?? {};
        storeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN, userInfo.accessToken);
        storeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN, userInfo.refreshToken);
        break;
      case doLogin.SUCCESS: {
        const { userInfo }: any = action.payload;
        draft.isLoginDone = true;
        draft.userInfo = userInfo ?? {};
        storeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN, userInfo.accessToken);
        storeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN, userInfo.refreshToken);
        break;
      }

      case setIsLoggedIn.TRIGGER: {
        draft.isLoggedOutDone = false;
        draft.isLoggedIn = true;
        break;
      }

      case setIsBiometricOpen.TRIGGER: {
        draft.isBiometricOpen = true;
        break;
      }

      case setIsAutoLogin.TRIGGER: {
        draft.isAutoLogin = true;
        break;
      }

      case getMyProfile.TRIGGER: {
        draft.myProfileDetails = {};
        break;
      }

      case getMyProfile.SUCCESS: {
        const { myData }: any = action.payload;
        draft.myProfileDetails = myData;
        draft.userType = myData?.organization?.name;
        draft.nationality = myData?.profile?.citizenships || 'SA';
        break;
      }

      case doLogoutAll.TRIGGER:
      case doLogout.TRIGGER: {
        // storeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN, '');
        // draft.isLoggedOutDone = true;
        // draft.isLoggedIn = false;
        // draft.isAutoLogin = false;
        // draft.isLoginDone = false;
        // draft.userInfo = {};
        // draft.myProfileDetails = {};
        break;
      }
      case doLogoutAll.SUCCESS:
      case doLogout.SUCCESS: {
        // removeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE);
        // storeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN, '');
        // storeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN, '');
        // storeData(LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME, false);
        draft.isLoggedOutDone = true;
        draft.isLoggedIn = false;
        draft.isAutoLogin = false;
        draft.isLoginDone = false;
        draft.userInfo = {};
        draft.myProfileDetails = {};
        draft.organizationDetails = {};
        break;
      }

      case doGoogleLogin.TRIGGER: {
        draft.userInfo = {};
        break;
      }

      case doGoogleLogin.SUCCESS: {
        const { data }: any = action.payload;
        draft.isLoginDone = true;
        draft.userInfo = data ?? {};
        storeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN, data.accessToken);
        storeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN, data.refreshToken);
        break;
      }

      case checkUser.TRIGGER: {
        draft.checkUserData = {};
        break;
      }
      case checkUser.SUCCESS: {
        const { data } = action?.payload || {};
        draft.checkUserData = data || {};
        break;
      }

      case getOrganizationInfo.TRIGGER: {
        draft.organizationDetails = {};
        break;
      }
      case getOrganizationInfo.SUCCESS: {
        const { data } = action?.payload || {};
        draft.organizationDetails = data || {};
        break;
      }

      default: {
        break;
      }
    }
  });
