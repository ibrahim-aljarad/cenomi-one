import { call, put, takeLatest } from 'redux-saga/effects';
import { getNotification, markReadNotification, markallReadNotification } from './actions';
import { api } from '../../../utils/axios';
import { setGlobalError } from '../../../appContainer/redux/actions';
import { isEmpty } from 'lodash';

const NOTIFICATION_API_URL = '/notification';

const getNotificationApiCall = (page, size) =>
  api({
    method: 'GET',
    url: `${NOTIFICATION_API_URL}/search?page=${page}&size=${size}`
  });

const markallReadNotificationApiCall = () =>
  api({
    method: 'PUT',
    url: `${NOTIFICATION_API_URL}/mark-all-read`
  });
const markReadNotificationApiCall = (id: any) =>
  api({
    method: 'PUT',
    url: `${NOTIFICATION_API_URL}/${id}/mark-read`
  });

function* getNotificationRequest(action: any) {
  try {
    // change for skeleton loader
    yield put(getNotification.request({ isLoading: false }));
    const { page, size } = action?.payload || {};
    const response = yield call(getNotificationApiCall, page, size);
    if (response.success) {
      const { data } = response;
      yield put(getNotification.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getNotification.fulfill({ isLoading: false }));
  }
}

function* markallReadNotificationRequest(action: any) {
  try {
    yield put(markallReadNotification.request({ isLoading: true }));
    const response = yield call(markallReadNotificationApiCall);
    if (response.success) {
      const { data } = response;
      yield put(markallReadNotification.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(markallReadNotification.fulfill({ isLoading: false }));
  }
}

function* markReadNotificationRequest(action: any) {
  try {
    yield put(markReadNotification.request({ isLoading: true }));
    const { id } = action?.payload || {};
    const response = yield call(markReadNotificationApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(markReadNotification.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(markReadNotification.fulfill({ isLoading: false }));
  }
}

export default function* notificationSaga() {
  yield takeLatest(getNotification.TRIGGER, getNotificationRequest);
  yield takeLatest(markallReadNotification.TRIGGER, markallReadNotificationRequest);
  yield takeLatest(markReadNotification.TRIGGER, markReadNotificationRequest);
}
