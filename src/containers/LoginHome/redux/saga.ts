import { isEmpty } from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { localize } from "../../../locale/utils";
import { api } from "../../../utils/axios";
import Config from "../../../utils/config";
import { LOCAL_STORAGE_DATA_KEY } from "../../../utils/constants";
import { alertBox, getSaveData } from "../../../utils/helpers";
import {
  checkUser,
  doGoogleLogin,
  doLogin,
  doLogout,
  doLogoutAll,
  getMyProfile,
  getOrganizationInfo,
  refreshToken,
  registerDevice,
} from "./actions";

const USER_API_URL = "auth";
const REGISTER_FCM_API_URL = "user/device";
const ORGANIZATION_URL = "organization";

const doLoginApiCall = (data: any) =>
  api({
    method: "POST",
    url: `${USER_API_URL}/login`,
    data,
  });

const getMyProfileApiCall = () =>
  api({
    method: "GET",
    url: `${USER_API_URL}/me`,
  });

const doLogoutApiCall = () =>
  api({
    method: "POST",
    url: `${USER_API_URL}/logout-mobile`,
  });

const doLogoutAllApiCall = () =>
  api({
    method: "POST",
    url: `${USER_API_URL}/logout-all`,
  });

const doGoogleLoginApiCall = (data: any) =>
  api({
    method: "POST",
    url: `${USER_API_URL}/social-login`,
    data,
  });

const FCMRegistrationApiCall = (payload: any) =>
  api({
    method: "POST",
    url: REGISTER_FCM_API_URL,
    data: payload,
  });

const checkUserApiCall = (data: any) =>
  api({
    method: "POST",
    url: `${USER_API_URL}/check-user?api_key=${Config.API_KEY}`,
    data,
  });

const refreshTokenApiCall = async () =>
  api({
    method: "GET",
    url: `${USER_API_URL}/refresh-token`,
    headers: {
      Authorization: `Bearer ${await getSaveData(
        LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN
      )}`,
    },
  });

const getOrganizationInfoAPICall = (organizationId: any) =>
  api({
    method: "GET",
    url: `${ORGANIZATION_URL}/${organizationId}?api_key=${Config.API_KEY}`,
  });

function* doLoginRequest(action: { payload: { loginData: any } }) {
  try {
    yield put(doLogin.request({ isLoading: true }));
    const { loginData } = action.payload;
    let response = yield call(doLoginApiCall, loginData);
    // let response = {
    //   success: true,
    //   data: {
    //     accessToken:
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiZTM4MmE1LTA3YmYtNGQ4OC04NWE5LTljMzI1NDc1ZWFmOSIsImVtYWlsIjoidmluY2VuemFfaGFuZEBob3RtYWlsLmNvbSIsInR5cGUiOiJwYXJlbnQiLCJpYXQiOjE2OTE1Nzg2NjUsImV4cCI6MTY5MTY2NTA2NX0.bhRP7N3-ps4c7WSyJnhCoL0ZiSV6ViRQQsawfnh5EJQ',
    //     refreshToken:
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiZTM4MmE1LTA3YmYtNGQ4OC04NWE5LTljMzI1NDc1ZWFmOSIsImVtYWlsIjoidmluY2VuemFfaGFuZEBob3RtYWlsLmNvbSIsInR5cGUiOiJwYXJlbnQiLCJpYXQiOjE2OTE1Nzg2NjUsImV4cCI6MTcyMzExNDY2NX0.rR-Fs4dXYhwYE66Tu4tjH6n4pPkwKHi8yaBKsV7ZDLo',
    //   },
    // };
    if (response.success) {
      const { data } = response;
      yield put(doLogin.success({ userInfo: data }));
    } else {
      if (response?.error) {
        console.log("error=======>", response?.error);
        let msg = "";
        if (response?.error === "incorrect_username_password") {
          msg = `Invalid email or password`;
        }
        if (response?.error === "user_not_found") {
          msg = `User not found`;
        }
        const error = {
          title: localize("common.error"),
          message: msg,
        };
        yield put(setGlobalError.success({ error }));
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doLogin.fulfill({ isLoading: false }));
  }
}

function* fcmNoticifationApiRequest(action) {
  try {
    yield put(registerDevice.request());
    const { payload } = action.payload;
    yield call(FCMRegistrationApiCall, payload);
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(registerDevice.fulfill());
  }
}

function* doLogoutRequest() {
  try {
    yield put(doLogout.request({ isLoading: true }));
    const response = yield call(doLogoutApiCall);
    if (response.success) {
      yield put(doLogout.success({}));
    } else {
      if (response?.data?.statusCode === 401) {
        yield put(doLogout.success({}));
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doLogout.fulfill({ isLoading: false }));
  }
}

function* doLogoutAllRequest() {
  try {
    yield put(doLogoutAll.request({ isLoading: true }));
    const response = yield call(doLogoutAllApiCall);
    if (response.success) {
      yield put(doLogoutAll.success({}));
    } else {
      if (response?.data?.statusCode === 401) {
        yield put(doLogoutAll.success({}));
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doLogoutAll.fulfill({ isLoading: false }));
  }
}

function* getMyProfileRequest(action: any) {
  try {
    yield put(getMyProfile.request({ isLoading: true }));
    const userInfo = action.payload?.userInfo ?? {};
    const response = yield call(getMyProfileApiCall);
    if (response.success) {
      const { data } = response;
      console.log("data from profile sega", data.config.config);

      if (!isEmpty(data)) {
        let myData = data;
        if (!isEmpty(userInfo)) {
          myData = { ...myData, ...userInfo };
        }
        yield put(getMyProfile.success({ myData }));
      } else {
        yield put(getMyProfile.success({}));
      }
    } else {
      if (response?.error) {
        if (response?.data?.statusCode === 401) {
          yield put(
            getMyProfile.success({
              myData: { statusCode: response?.data?.statusCode },
            })
          );
        } else if (response?.error?.message) {
          alertBox(
            response?.error?.title || localize("common.error"),
            response?.error?.message
          );
        } else {
          yield put(setGlobalError.success());
        }
      } else {
        yield put(setGlobalError.success());
      }
      // yield put(setGlobalError.success());
    }
  } catch (error) {
    console.log("error========>", error);
    yield put(setGlobalError.success());
  } finally {
    yield put(getMyProfile.fulfill({ isLoading: false }));
  }
}

function* doGoogleLoginRequest(action: any) {
  try {
    yield put(doGoogleLogin.request({ isLoading: true }));
    const { payload } = action.payload;
    const response = yield call(doGoogleLoginApiCall, payload);
    if (response.success) {
      const { data } = response;
      yield put(doGoogleLogin.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doGoogleLogin.fulfill({ isLoading: false }));
  }
}

function* checkUserRequest(action: any) {
  try {
    yield put(checkUser.request({ isLoading: true }));
    const { data } = action?.payload;
    let response = yield call(checkUserApiCall, data);
    if (response.success) {
      const { data } = response;
      yield put(checkUser.success({ data }));
    } else {
      if (response?.error) {
        // if (response?.error === 'user_not_found') {
        yield put(checkUser.success({ data: { error: response?.error } }));
        // } else {
        //   alertBox(
        //     localize('common.error'),
        //     localize(`login.error.${response?.error}`),
        //   );
        // }
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(checkUser.fulfill({ isLoading: false }));
  }
}

function* refreshTokenRequest(action: any) {
  try {
    yield put(refreshToken.request({ isLoading: true }));
    let response = yield call(refreshTokenApiCall);
    if (response.success) {
      const { data } = response;
      yield put(refreshToken.success({ userInfo: data }));
    } else {
      yield put(doLogout.success({}));
      alertBox("Session Expired", "Please Login Again");
      // yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(refreshToken.fulfill({ isLoading: false }));
  }
}

function* getOrganizationInfoRequest(action: any) {
  try {
    yield put(getOrganizationInfo.request({ isLoading: true }));
    const { organizationId } = action?.payload || {};
    const response = yield call(getOrganizationInfoAPICall, organizationId);
    if (response.success) {
      const { data } = response;
      if (!isEmpty(data)) {
        yield put(getOrganizationInfo.success({ data }));
      } else {
        yield put(getOrganizationInfo.success({}));
      }
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    console.log("error========>", error);
    yield put(setGlobalError.success());
  } finally {
    yield put(getOrganizationInfo.fulfill({ isLoading: false }));
  }
}

export default function* loginSaga() {
  yield takeLatest(doLogin.TRIGGER, doLoginRequest);
  yield takeLatest(doLogout.TRIGGER, doLogoutRequest);
  yield takeLatest(doLogoutAll.TRIGGER, doLogoutAllRequest);
  yield takeLatest(getMyProfile.TRIGGER, getMyProfileRequest);
  yield takeLatest(doGoogleLogin.TRIGGER, doGoogleLoginRequest);
  yield takeLatest(registerDevice.TRIGGER, fcmNoticifationApiRequest);
  yield takeLatest(checkUser.TRIGGER, checkUserRequest);
  yield takeLatest(refreshToken.TRIGGER, refreshTokenRequest);
  yield takeLatest(getOrganizationInfo.TRIGGER, getOrganizationInfoRequest);
}
