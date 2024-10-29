import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { api, appianApi, tenantCentralApi } from "../../../utils/axios";

import { getDiscrepancyDetail, getUnitList } from "./actions";

import { alertBox } from "../../../utils/helpers";
import { DEVICE_TIMEZONE } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const qs = require("qs");

const DISCREPANCY_DETAIL = "service-requests/discrepancy";
const UNIT_LIST = "units";

const getDiscrepancyDetailApiCall = (data) =>
  tenantCentralApi({
    method: "GET",
    url: `${DISCREPANCY_DETAIL}/${data}`,
  });

  const getUnitListApiCall = (data) =>
    tenantCentralApi({
      method: "GET",
      url:
      `${UNIT_LIST}` +
      "?" +
      qs.stringify(data, { arrayFormat: "repeat", encode: false }),
    });

function* getDiscrepancyDetailRequest(action: {
  payload: any;
}) {
  try {
    const data = action.payload;
    yield put(getDiscrepancyDetail.request({ isLoading: true }));

    const response = yield call(getDiscrepancyDetailApiCall, data);

    if (response.success) {
      const { data } = response;
      yield put(getDiscrepancyDetail.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getDiscrepancyDetail.fulfill({ isLoading: false }));
  }
}

function* getUnitListRequest(action: {
  payload: { name: any; autoComplete: any };
}) {
  try {
    const data = action.payload;
    yield put(getUnitList.request({ isLoading: true }));

    const response = yield call(getUnitListApiCall, data);

    if (response.success) {
      const { data } = response;
      yield put(getUnitList.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getUnitList.fulfill({ isLoading: false }));
  }
}

export default function* approvalsSaga() {
  yield takeLatest(getDiscrepancyDetail.TRIGGER, getDiscrepancyDetailRequest);
  yield takeLatest(getUnitList.TRIGGER, getUnitListRequest);
}
