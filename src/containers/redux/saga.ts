import { call, put, takeLatest } from 'redux-saga/effects';
import { setGlobalError } from '../../appContainer/redux/actions';
import { api } from '../../utils/axios';

import Config from '../../utils/config';
import {
  filePreview,
  fileUpload,
  getPublicStaticData,
  getStaticData,
  markOnboarded,
  syncProfile,
  getSendWishesInfo,
  getOrganizationConfig,
  getNewsList,
  getGreetingsData
} from './actions';

const FILE_UPLOAD_URL = 'upload';
const FILE_PREVIEW_URL = 'preview';
const SYNC_PROFILE_URL = 'user/sync-profile';
const MARK_ONBOARDED_URL = 'user/mark-onboarded';
const STATIC_DATA_URL = 'organization/static-data';
const PUBLIC_STATIC_DATA_URL = 'organization/public-static-data';
const SEND_WISHES__URL = 'process/hr-request/wishes';
const ORGANIZATION_CONFIG_URL = 'organization/config';
const NEWS_LIST_URL = 'cms/news';
const GRETTINGS_DATA_URL = 'cms/greetings';

const fileUploadApiCall = (data: any) =>
  api({
    method: 'POST',
    url: `${FILE_UPLOAD_URL}`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

const filePreviewApiCall = (filename: any) =>
  api({
    method: 'POST',
    url: `${FILE_PREVIEW_URL}?filename${filename}`
  });

const syncProfileApiCall = (firstTime) =>
  api({
    method: 'PUT',
    url: `${SYNC_PROFILE_URL}?first_time=${firstTime}`
  });

const markOnboardedApiCall = () =>
  api({
    method: 'PUT',
    url: `${MARK_ONBOARDED_URL}`
  });

const getStaticDataApiCall = () =>
  api({
    method: 'GET',
    url: `${STATIC_DATA_URL}`
  });

const getPublicStaticDataApiCall = () =>
  api({
    method: 'GET',
    url: `${PUBLIC_STATIC_DATA_URL}?api_key=${Config.API_KEY}`
  });

const getSendWishesInfoApiCall = () =>
  api({
    method: 'GET',
    url: `${SEND_WISHES__URL}`
  });

const getOrganizationConfigApiCall = () =>
  api({
    method: 'GET',
    url: `${ORGANIZATION_CONFIG_URL}`
  });

const getNewsListApiCall = () =>
  api({
    method: 'GET',
    url: `${NEWS_LIST_URL}`
  });
const getGreetingsDataApiCall = () =>
  api({
    method: 'GET',
    url: `${GRETTINGS_DATA_URL}`
  });

function* fileUploadRequest(action: any) {
  try {
    yield put(fileUpload.request({ isLoading: true }));
    const { fileName, mime, path } = action?.payload || {};
    const formData = new FormData();
    formData.append('file', {
      name: fileName,
      type: mime,
      uri: path
    });

    const response = yield call(fileUploadApiCall, formData);
    if (response.success) {
      const { data } = response;
      yield put(fileUpload.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(fileUpload.fulfill({ isLoading: false }));
  }
}

function* filePreviewRequest(action: any) {
  try {
    yield put(filePreview.request({ isLoading: true }));
    const { filename } = action?.payload || {};
    const response = yield call(filePreviewApiCall, filename);
    if (response.success) {
      const { data } = response;
      yield put(filePreview.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(filePreview.fulfill({ isLoading: false }));
  }
}

function* syncProfileRequest(action: any) {
  try {
    const { firstTime } = action?.payload || {};

    yield put(syncProfile.request({ isLoading: false }));
    const response = yield call(syncProfileApiCall, firstTime);
    if (response.success) {
      const { data } = response;
      yield put(syncProfile.success({ data: { ...data, statusCode: 200 } }));
    } else {
      if (response?.data?.statusCode === 401 || response?.data?.statusCode === 404) {
        yield put(
          syncProfile.success({
            data: { statusCode: response?.data?.statusCode }
          })
        );
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(syncProfile.fulfill({ isLoading: false }));
  }
}

function* markOnboardedRequest() {
  try {
    yield put(markOnboarded.request({ isLoading: true }));
    const response = yield call(markOnboardedApiCall);
    if (response.success) {
      const { data } = response;
      yield put(markOnboarded.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(markOnboarded.fulfill({ isLoading: false }));
  }
}

function* getStaticDataRequest() {
  try {
    yield put(getStaticData.request({ isLoading: true }));
    const response = yield call(getStaticDataApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getStaticData.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getStaticData.fulfill({ isLoading: false }));
  }
}

function* getPublicStaticDataRequest() {
  try {
    yield put(getPublicStaticData.request({ isLoading: true }));
    const response = yield call(getPublicStaticDataApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getPublicStaticData.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getPublicStaticData.fulfill({ isLoading: false }));
  }
}

function* getSendWishesInfoRequest() {
  try {
    yield put(getSendWishesInfo.request({ isLoading: false, isAPIExecuting: true }));
    const response = yield call(getSendWishesInfoApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getSendWishesInfo.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getSendWishesInfo.fulfill({ isLoading: false, isAPIExecuting: false }));
  }
}

function* getOrganizationConfigRequest() {
  try {
    yield put(getOrganizationConfig.request({ isLoading: false }));
    const response = yield call(getOrganizationConfigApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getOrganizationConfig.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getOrganizationConfig.failure());
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getOrganizationConfig.failure());
  } finally {
    yield put(getOrganizationConfig.fulfill({ isLoading: false }));
  }
}

function* getNewsListRequest() {
  try {
    yield put(getNewsList.request({ isLoading: false }));
    const response = yield call(getNewsListApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getNewsList.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getNewsList.failure());
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getNewsList.failure());
  } finally {
    yield put(getNewsList.fulfill({ isLoading: false }));
  }
}

function* getGreetingsDataRequest() {
  try {
    yield put(getGreetingsData.request({ isLoading: false }));
    const response = yield call(getGreetingsDataApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getGreetingsData.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getGreetingsData.failure());
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getGreetingsData.failure());
  } finally {
    yield put(getGreetingsData.fulfill({ isLoading: false }));
  }
}

export default function* commonSaga() {
  yield takeLatest(fileUpload.TRIGGER, fileUploadRequest);
  yield takeLatest(filePreview.TRIGGER, filePreviewRequest);
  yield takeLatest(syncProfile.TRIGGER, syncProfileRequest);
  yield takeLatest(markOnboarded.TRIGGER, markOnboardedRequest);
  yield takeLatest(getStaticData.TRIGGER, getStaticDataRequest);
  yield takeLatest(getPublicStaticData.TRIGGER, getPublicStaticDataRequest);
  yield takeLatest(getPublicStaticData.TRIGGER, getPublicStaticDataRequest);
  yield takeLatest(getSendWishesInfo.TRIGGER, getSendWishesInfoRequest);
  yield takeLatest(getOrganizationConfig.TRIGGER, getOrganizationConfigRequest);
  yield takeLatest(getNewsList.TRIGGER, getNewsListRequest);
  yield takeLatest(getGreetingsData.TRIGGER, getGreetingsDataRequest);
}
