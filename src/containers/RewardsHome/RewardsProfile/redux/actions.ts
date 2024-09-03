import { createRoutine } from 'redux-saga-routines';

import {
  REWARDS_PROFILE_IMAGE_UPDATE,
  REWARDS_PROFILE_IMAGE_UPDATE_FLAG,
  USER_CONFIG_UPDATE,
  DELETE_REWARDS_ACCOUNT
} from './constants';

export const rewardsProfileImageUpdate = createRoutine(REWARDS_PROFILE_IMAGE_UPDATE);
export const rewardsProfileImageUpdateFlag = createRoutine(REWARDS_PROFILE_IMAGE_UPDATE_FLAG);
export const userConfigUpdate = createRoutine(USER_CONFIG_UPDATE);
export const deleteRewardsAccount = createRoutine(DELETE_REWARDS_ACCOUNT);
