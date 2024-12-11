import { createRoutine } from 'redux-saga-routines';

import {
  FILE_UPLOAD,
  FILE_PREVIEW,
  SYNC_PROFILE,
  MARK_ONBOARDED,
  UPDATE_SYNC_PROFILE_FLAG,
  UPDATE_MARK_ONBOARDED_FLAG,
  GET_STATIC_DATA,
  GET_PUBLIC_STATIC_DATA,
  SET_COLOR_THEME,
  SEND_WISHES_INFO,
  SET_IS_CHAT_WINDOW_VISIBLE,
  ORGANIZATION_CONFIG,
  NEWS_LIST,
  GREETINGS_DATA,
  TENANT_FILE_UPLOAD,
  CLEAR_TENANT_FILE_UPLOAD
} from './constants';

export const fileUpload = createRoutine(FILE_UPLOAD);
export const filePreview = createRoutine(FILE_PREVIEW);
export const syncProfile = createRoutine(SYNC_PROFILE);
export const updateSyncProfileFlag = createRoutine(UPDATE_SYNC_PROFILE_FLAG);
export const markOnboarded = createRoutine(MARK_ONBOARDED);
export const updateMarkOnboardedFlag = createRoutine(UPDATE_MARK_ONBOARDED_FLAG);
export const getStaticData = createRoutine(GET_STATIC_DATA);
export const getPublicStaticData = createRoutine(GET_PUBLIC_STATIC_DATA);

export const setColorTheme = createRoutine(SET_COLOR_THEME);
export const getSendWishesInfo = createRoutine(SEND_WISHES_INFO);
export const getGreetingsData = createRoutine(GREETINGS_DATA);

export const setIsChatWindowVisible = createRoutine(SET_IS_CHAT_WINDOW_VISIBLE);
export const getOrganizationConfig = createRoutine(ORGANIZATION_CONFIG);
export const getNewsList = createRoutine(NEWS_LIST);

export const tenantFileUpload = createRoutine(TENANT_FILE_UPLOAD);
export const clearTenantFileUpload = createRoutine(CLEAR_TENANT_FILE_UPLOAD);
