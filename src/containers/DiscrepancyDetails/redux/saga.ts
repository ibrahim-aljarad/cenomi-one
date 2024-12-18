import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { tenantCentralApi } from "../../../utils/authService";

import {
  getDiscrepancyDetail,
  getUnitDicrepancy,
  getUnitList,
  saveUnitDicrepancy,
} from "./actions";
const qs = require("qs");

const DISCREPANCY_DETAIL = "service-requests/discrepancy";
const UNIT_LIST = "units";
const UNIT_DISCREPANCY = "discrepancy";

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

const getUnitDiscrepancyApiCall = (data) =>
  tenantCentralApi({
    method: "GET",
    url:
      `${UNIT_DISCREPANCY}` +
      "?" +
      qs.stringify(data, { arrayFormat: "repeat", encode: false }),
  });

const saveUnitDiscrepancyApiCall = (data) =>
  tenantCentralApi({
    method: "PATCH",
    url: `${UNIT_DISCREPANCY}`,
    data,
  });

function* getDiscrepancyDetailRequest(action: { payload: any }) {
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
    payload: {
      "property-id": number;
      floor_code: string | number;
      page: number;
      limit: number;
      search?: string;
    };
  }) {
    try {
      const requestData = action.payload;
      yield put(getUnitList.request({ isLoading: true }));

      const response = yield call(getUnitListApiCall, requestData);
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
function* getUnitDiscrepancyRequest(action: { payload: any }) {
  try {
    const data = action.payload;
    yield put(getUnitDicrepancy.request({ isLoading: true }));

    const response = yield call(getUnitDiscrepancyApiCall, data);

    if (response.success) {
      const { data } = response;
      yield put(getUnitDicrepancy.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getUnitDicrepancy.fulfill({ isLoading: false }));
  }
}

function* saveUnitDiscrepancyRequest(action: { payload: any }) {
  try {
    const data = action.payload;
    yield put(saveUnitDicrepancy.request({ isLoading: true }));

    const response = yield call(saveUnitDiscrepancyApiCall, data);

    if (response.success) {
      const { data } = response;
      yield put(saveUnitDicrepancy.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(saveUnitDicrepancy.fulfill({ isLoading: false }));
  }
}

export default function* approvalsSaga() {
  yield takeLatest(getDiscrepancyDetail.TRIGGER, getDiscrepancyDetailRequest);
  yield takeLatest(getUnitList.TRIGGER, getUnitListRequest);
  yield takeLatest(getUnitDicrepancy.TRIGGER, getUnitDiscrepancyRequest);
  yield takeLatest(saveUnitDicrepancy.TRIGGER, saveUnitDiscrepancyRequest);
}
