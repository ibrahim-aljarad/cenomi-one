import { createRoutine } from 'redux-saga-routines';

import {
  DO_LOGIN,
  DO_LOGOUT,
  GET_MY_PROFILE,
  SET_IS_AUTO_LOGIN,
  RESET_LOGIN_DATA,
  SET_IS_LOGIN_IN,
  SET_IS_BIOMETRIC_OPEN,
  GOOGLE_LOGIN_IN,
  REGISTER_DEVICE,
  CHECK_USER,
  REFRESH_TOKEN,
  ORGANIZATION_INFO,
  DO_LOGOUT_ALL
} from './constants';

export const doLogin = createRoutine(DO_LOGIN);
export const doLogout = createRoutine(DO_LOGOUT);
export const doLogoutAll = createRoutine(DO_LOGOUT_ALL);
export const getMyProfile = createRoutine(GET_MY_PROFILE);
export const setIsAutoLogin = createRoutine(SET_IS_AUTO_LOGIN);
export const setIsLoggedIn = createRoutine(SET_IS_LOGIN_IN);
export const setIsBiometricOpen = createRoutine(SET_IS_BIOMETRIC_OPEN);
export const resetLoginData = createRoutine(RESET_LOGIN_DATA);
export const doGoogleLogin = createRoutine(GOOGLE_LOGIN_IN);
export const registerDevice = createRoutine(REGISTER_DEVICE);
export const checkUser = createRoutine(CHECK_USER);
export const refreshToken = createRoutine(REFRESH_TOKEN);
export const getOrganizationInfo = createRoutine(ORGANIZATION_INFO);
