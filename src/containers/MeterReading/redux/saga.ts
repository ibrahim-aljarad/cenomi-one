import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { localize } from "../../../locale/utils";
import { tenantCentralApi } from "../../../utils/axios";
import {
  getSrMeters,
  getMeterReadingDetails,
  updateMeterReading
} from "./actions";

const METER_READING_BASE = "meter-reading";
const SERVICE_REQUESTS = "service-request";

const getMeterReadingDetailsApiCall = (meterDetailId: string | number) =>
  tenantCentralApi({
    method: "GET",
    url: `/${METER_READING_BASE}/${meterDetailId}`,
  });

const getSrMetersApiCall = (serviceRequestId: string | number) =>
  tenantCentralApi({
    method: "GET",
    url: `/${METER_READING_BASE}/${SERVICE_REQUESTS}/${serviceRequestId}`,
  });

const updateMeterReadingApiCall = (data: {
  service_request_id: number;
  meter_id: number;
  preset_reading: number;
  document_id: string[];
  status: string;
}) =>
  tenantCentralApi({
    method: "PATCH",
    url: `${METER_READING_BASE}`,
    data,
  });


function* getMeterReadingDetailsRequest(action: { payload: string | number }) {
  try {
    const meterDetailId = action.payload;
    yield put(getMeterReadingDetails.request({ isLoading: true }));

    const response = yield call(getMeterReadingDetailsApiCall, meterDetailId);

    if (response.success) {
      const { data } = response;
      yield put(getMeterReadingDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getMeterReadingDetails.failure({ message: "Failed to fetch meter reading details" }));
    }
  } catch (error: any) {
    yield put(setGlobalError.success());
    yield put(getMeterReadingDetails.failure({ message: error.message }));
  } finally {
    yield put(getMeterReadingDetails.fulfill({ isLoading: false }));
  }
}

function* getSrMetersRequest(action: { payload: string | number }) {
  try {
    const serviceRequestId = action.payload;
    yield put(getSrMeters.request({ isLoading: true }));

    const response = yield call(getSrMetersApiCall, serviceRequestId);
    console.log("sr meters resp", response);
    if (response.success) {
      const { data } = response;
      yield put(getSrMeters.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getSrMeters.failure({ message: localize("meterReadings.failedToFetchMeters") }));
    }
  } catch (error: any) {
    yield put(setGlobalError.success());
    yield put(getSrMeters.failure({ message: error.message }));
  } finally {
    yield put(getSrMeters.fulfill({ isLoading: false }));
  }
}

function* updateMeterReadingRequest(action: {
  payload: {
    service_request_id: number;
    meter_id: number;
    preset_reading: number;
    document_id: string[];
    status: string;
  }
}) {
  try {
    const data = action.payload;
    console.log("data", data);
    yield put(updateMeterReading.request({ isLoading: true }));

    const response = yield call(updateMeterReadingApiCall, data);
    console.log("response", response);
    if (response.success) {
      const { data } = response;
      console.log("data", data);
      yield put(updateMeterReading.success({ data }));
    } else {
        const errorMessage = response.message || localize("meterReadings.failedToUpdateMeter");
        yield put(updateMeterReading.failure({ message: errorMessage }));
    }
  } catch (error: any) {
    console.error("Meter reading update error:", error);
    const errorMessage = error.response?.data?.message || error.message || localize("common.someThingWentWrong");
    yield put(updateMeterReading.failure({ message: errorMessage }));
  } finally {
    yield put(updateMeterReading.fulfill({ isLoading: false }));
  }
}

// Root saga
export default function* meterReadingSaga() {
  yield takeLatest(getMeterReadingDetails.TRIGGER, getMeterReadingDetailsRequest);
  yield takeLatest(getSrMeters.TRIGGER, getSrMetersRequest);
  yield takeLatest(updateMeterReading.TRIGGER, updateMeterReadingRequest);
}
