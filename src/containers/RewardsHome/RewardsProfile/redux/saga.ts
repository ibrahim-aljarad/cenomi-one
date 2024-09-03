import { call, put, takeLatest } from 'redux-saga/effects';
import { setGlobalError } from '../../../../appContainer/redux/actions';
import { api } from '../../../../utils/axios';

import { localize } from '../../../../locale/utils';
import { alertBox } from '../../../../utils/helpers';
import { deleteRewardsAccount, rewardsProfileImageUpdate, userConfigUpdate } from './actions';
import { doLogout } from '../../../LoginHome/redux/actions';

const USER_PROFILE_IMAGE_URL = 'user/profile-image';
const USER_CONFIG_UPDATE = 'user/config';
const DELETE_REWARDS_ACCOUNT_URL = 'user';

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

const deleteRewardsAccountApiCall = () =>
  api({
    method: 'DELETE',
    url: `${DELETE_REWARDS_ACCOUNT_URL}`
  });

function* rewardsProfileImageUpdatedRequest(action: any) {
  try {
    yield put(rewardsProfileImageUpdate.request({ isLoading: true }));
    const { data } = action.payload;
    let response = yield call(profileImageUpdateApiCall, data);
    if (response.success) {
      yield put(rewardsProfileImageUpdate.success({}));
    } else {
      if (response?.error) {
        alertBox(`Error`, localize(`login.error.${response?.error}`));
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(rewardsProfileImageUpdate.fulfill({ isLoading: false }));
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

function* deleteRewardsAccountRequest(action: any) {
  try {
    yield put(deleteRewardsAccount.request({ isLoading: true }));
    let response = yield call(deleteRewardsAccountApiCall);
    if (response.success) {
      // yield put(deleteRewardsAccount.success({}));
      yield put(doLogout.success({}));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(deleteRewardsAccount.fulfill({ isLoading: false }));
  }
}

export default function* rewardsProfileSaga() {
  yield takeLatest(rewardsProfileImageUpdate.TRIGGER, rewardsProfileImageUpdatedRequest);
  yield takeLatest(userConfigUpdate.TRIGGER, userConfigUpdateRequest);
  yield takeLatest(deleteRewardsAccount.TRIGGER, deleteRewardsAccountRequest);
}
