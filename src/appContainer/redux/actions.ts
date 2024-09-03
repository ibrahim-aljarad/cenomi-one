import { createRoutine } from 'redux-saga-routines';

import {
  SPLASH_SCREEN,
  SET_GLOBAL_ERRORS,
  SET_NETWORK_STATE,
  SET_APP_UNDER_MAINTENANCE,
  SET_APP_FORCE_UPDATE
} from './constants';

export const setSplashScreen = createRoutine(SPLASH_SCREEN);
export const setGlobalError = createRoutine(SET_GLOBAL_ERRORS);
export const setCurrentNetworkState = createRoutine(SET_NETWORK_STATE);
export const setAppUnderMaintenance = createRoutine(SET_APP_UNDER_MAINTENANCE);
export const setAppForceUpdate = createRoutine(SET_APP_FORCE_UPDATE);
