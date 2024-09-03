import { createRoutine } from 'redux-saga-routines';

import { PROFILE_IMAGE_UPDATE, USER_CONFIG_UPDATE, PROFILE_IMAGE_UPDATE_FLAG } from './constants';

export const profileImageUpdate = createRoutine(PROFILE_IMAGE_UPDATE);
export const userConfigUpdate = createRoutine(USER_CONFIG_UPDATE);
export const profileImageUpdateFlag = createRoutine(PROFILE_IMAGE_UPDATE_FLAG);
