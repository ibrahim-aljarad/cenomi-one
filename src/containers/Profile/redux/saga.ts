import { call, put, takeLatest } from 'redux-saga/effects';
import { setGlobalError } from '../../../appContainer/redux/actions';
import { api } from '../../../utils/axios';
import { alertBox } from '../../../utils/helpers';

import { localize } from '../../../locale/utils';
import { profileImageUpdate, userConfigUpdate } from './actions';

const USER_PROFILE_IMAGE_URL = 'user/profile-image';
const USER_CONFIG_UPDATE = 'user/config';

const profileImageUpdateApiCall = (data: object) =>
  api({
    method: 'PUT',
    url: `${USER_PROFILE_IMAGE_URL}`,
    data
  });

const userConfigUpdateApiCall = (data: object) =>
  api({
    method: 'PUT',
    url: `${USER_CONFIG_UPDATE}`,
    data
  });

function* profileImageUpdateRequest(action: any) {
  try {
    yield put(profileImageUpdate.request({ isLoading: true }));
    const { data } = action.payload;
    let response = yield call(profileImageUpdateApiCall, data);
    if (response.success) {
      yield put(profileImageUpdate.success({}));
    } else {
      if (response?.error) {
        alertBox(
          response?.error?.title || localize('common.error'),
          response?.error?.message || localize(`common.someThingWentWrong`)
        );
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(profileImageUpdate.fulfill({ isLoading: false }));
  }
}

function* userConfigUpdateRequest(action: any) {
  try {
    yield put(userConfigUpdate.request({ isLoading: true }));
    const { data } = action.payload;
    let response = yield call(userConfigUpdateApiCall, data);
    if (response.success) {
      yield put(userConfigUpdate.success({}));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(userConfigUpdate.fulfill({ isLoading: false }));
  }
}

export default function* profileSaga() {
  yield takeLatest(profileImageUpdate.TRIGGER, profileImageUpdateRequest);
  yield takeLatest(userConfigUpdate.TRIGGER, userConfigUpdateRequest);
}
