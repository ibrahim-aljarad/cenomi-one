import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { mockApiService } from "../mocks/mockService";
import {
  getSrDetails,
  getSrMeters,
  getMeterReadingDetails,
  updateMeterReading
} from "./actions";

function* getSrDetailsRequest(action: { payload: string | number }) {
  try {
    const serviceRequestId = action.payload;
    yield put(getSrDetails.request({ isLoading: true }));

    const response = yield call(mockApiService.getSrDetails, serviceRequestId);

    if (response.success) {
      const { data } = response;
      yield put(getSrDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getSrDetails.failure({ message: "Failed to fetch SR details" }));
    }
  } catch (error: any) {
    yield put(setGlobalError.success());
    yield put(getSrDetails.failure({ message: error.message }));
  } finally {
    yield put(getSrDetails.fulfill({ isLoading: false }));
  }
}

function* getMeterReadingDetailsRequest(action: { payload: string | number }) {
  try {
    const meterDetailId = action.payload;
    yield put(getMeterReadingDetails.request({ isLoading: true }));

    const response = yield call(mockApiService.getMeterReadingDetails, meterDetailId);

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

    const response = yield call(mockApiService.getSrMeters, serviceRequestId);
    if (response.success) {
      const { data } = response;
      yield put(getSrMeters.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getSrMeters.failure({ message: "Failed to fetch SR meters" }));
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
    yield put(updateMeterReading.request({ isLoading: true }));

    const response = yield call(mockApiService.updateMeterReading, data);

    if (response.success) {
      const { data } = response;
      yield put(updateMeterReading.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(updateMeterReading.failure({ message: "Failed to update meter reading" }));
    }
  } catch (error: any) {
    yield put(setGlobalError.success());
    yield put(updateMeterReading.failure({ message: error.message }));
  } finally {
    yield put(updateMeterReading.fulfill({ isLoading: false }));
  }
}

export default function* meterReadingSaga() {
  yield takeLatest(getSrDetails.TRIGGER, getSrDetailsRequest);
  yield takeLatest(getMeterReadingDetails.TRIGGER, getMeterReadingDetailsRequest);
  yield takeLatest(getSrMeters.TRIGGER, getSrMetersRequest);
  yield takeLatest(updateMeterReading.TRIGGER, updateMeterReadingRequest);
}
