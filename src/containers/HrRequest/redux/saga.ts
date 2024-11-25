import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { api } from "../../../utils/axios";
import { alertBox } from "../../../utils/helpers";

import { localize } from "../../../locale/utils";
import {
  getAbsenseBalance,
  getAbsenseData,
  getAbsenseReasons,
  getAbsenseType,
  getAttendances,
  getPayslip,
  getPayslipDetails,
  getPayslipDocument,
  hrApplyLeave,
  putCancelAbsense,
  createPublicHoliday,
  getPublicHolidayStatus,
} from "./actions";

const PAYSLIP_URL = "process/hr-request/payslips";
const ABSENSE_TYPE_URL = "process/hr-request/absense-types";
const ABSENSE_BALANCE_URL = "process/hr-request/absense-balance";
const APPLY_LEAVE_URL = "process/hr-request/apply-leave";
const ABSENSE_DATA_URL = "process/hr-request/absense-history";
const CANCEL_ABSENSE_DATA_URL = "process/hr-request/cancel-leave";
const GET_ABSENSE_REASONS_URL = "process/hr-request/absense-reasons";
const GET_ATTENDANCE_URL = "attendence/your-entity";
const CREATE_PUBLIC_HOLIDAY_URL = "public-holiday/public-holiday/create";
const GET_PUBLIC_HOLIDAY_STATUS_URL = "public-holiday/public-holiday/latest";

const getPayslipApiCall = () =>
  api({
    method: "GET",
    url: `${PAYSLIP_URL}`,
  });

const getPayslipDetailsApiCall = (documentsOfRecordId) =>
  api({
    method: "GET",
    url: `${PAYSLIP_URL}/${documentsOfRecordId}`,
  });

const getPayslipDocumentApiCall = (documentsOfRecordId) =>
  api({
    method: "GET",
    url: `${PAYSLIP_URL}/download/${documentsOfRecordId}`,
  });

const getAbsenseTypeApiCall = () =>
  api({
    method: "GET",
    url: `${ABSENSE_TYPE_URL}`,
  });

const getAbsenseBalanceApiCall = () =>
  api({
    method: "GET",
    url: `${ABSENSE_BALANCE_URL}`,
  });

const hrApplyLeaveApiCall = (data: any) =>
  api({
    method: "POST",
    url: `${APPLY_LEAVE_URL}`,
    data,
  });

const getAbsenseDataApiCall = () =>
  api({
    method: "GET",
    url: `${ABSENSE_DATA_URL}`,
  });

const putCancelAbsenseApiCall = (data: any) =>
  api({
    method: "PUT",
    url: `${CANCEL_ABSENSE_DATA_URL}`,
    data,
  });

const getAbsenseReasonsApiCall = () =>
  api({
    method: "GET",
    url: `${GET_ABSENSE_REASONS_URL}`,
  });

const getAttendanceApiCall = (id: number) =>
  api({
    method: "GET",
    url: `${GET_ATTENDANCE_URL}/${id}`,
  });

const createPublicHolidayApiCall = () =>
  api({
    method: "POST",
    url: CREATE_PUBLIC_HOLIDAY_URL,
    data: { status: false },
  });

const getPublicHolidayStatusApiCall = () =>
  api({
    method: "GET",
    url: GET_PUBLIC_HOLIDAY_STATUS_URL,
  });

function* getPaySlipRequest(action: any) {
  try {
    yield put(getPayslip.request({ isLoading: false }));
    const response = yield call(getPayslipApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getPayslip.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getPayslip.fulfill({ isLoading: false }));
  }
}

function* getPayslipDetailsRequest(action: any) {
  try {
    yield put(getPayslipDetails.request({ isLoading: false }));
    const { documentsOfRecordId } = action.payload;
    const response = yield call(getPayslipDetailsApiCall, documentsOfRecordId);
    if (response.success) {
      const { data } = response;
      yield put(getPayslipDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getPayslipDetails.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getPayslipDetails.failure({}));
  } finally {
    yield put(getPayslipDetails.fulfill({ isLoading: false }));
  }
}

function* getPayslipDocumentRequest(action: any) {
  try {
    yield put(getPayslipDocument.request({ isLoading: true }));
    const { documentsOfRecordId } = action.payload;
    const response = yield call(getPayslipDocumentApiCall, documentsOfRecordId);
    if (response.success) {
      const { data } = response;
      yield put(getPayslipDocument.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getPayslipDocument.fulfill({ isLoading: false }));
  }
}

function* getAbsenseTypeRequest(action: any) {
  try {
    yield put(getAbsenseType.request({ isLoading: false }));
    const response = yield call(getAbsenseTypeApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getAbsenseType.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getAbsenseType.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getAbsenseType.failure({}));
  } finally {
    yield put(getAbsenseType.fulfill({ isLoading: false }));
  }
}

function* getAbsenseBalanceRequest(action: any) {
  try {
    const { isSilentCall = false } = action?.payload || {};
    yield put(
      getAbsenseBalance.request({ isLoading: isSilentCall ? false : true })
    );
    const response = yield call(getAbsenseBalanceApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getAbsenseBalance.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getAbsenseBalance.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getAbsenseBalance.failure({}));
  } finally {
    yield put(getAbsenseBalance.fulfill({ isLoading: false }));
  }
}

function* hrApplyLeaveRequest(action: any) {
  try {
    yield put(hrApplyLeave.request({ isLoading: true }));
    const { data } = action.payload;
    let response = yield call(hrApplyLeaveApiCall, data);
    if (response.success) {
      const { data } = response;
      yield put(hrApplyLeave.success({ data }));
    } else {
      if (response?.error) {
        alertBox(localize("common.error"), response?.error);
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(hrApplyLeave.fulfill({ isLoading: false }));
  }
}

function* getAbsenseDataRequest(action: any) {
  try {
    const { isSilentCall = false } = action?.payload || {};
    yield put(
      getAbsenseData.request({ isLoading: isSilentCall ? false : true })
    );
    const response = yield call(getAbsenseDataApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getAbsenseData.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getAbsenseData.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getAbsenseData.failure({}));
  } finally {
    yield put(getAbsenseData.fulfill({ isLoading: false }));
  }
}

function* putCancelAbsenseRequest(action: any) {
  try {
    yield put(putCancelAbsense.request({ isLoading: true }));
    const { data } = action.payload;
    let response = yield call(putCancelAbsenseApiCall, data);
    if (response.success) {
      const { data } = response;
      yield put(putCancelAbsense.success({ data }));
    } else {
      if (response?.error) {
        alertBox(localize("common.error"), response?.error);
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(putCancelAbsense.fulfill({ isLoading: false }));
  }
}

function* getAbsenseReasonsRequest(action: any) {
  try {
    yield put(getAbsenseReasons.request({ isLoading: false }));
    let response = yield call(getAbsenseReasonsApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getAbsenseReasons.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getAbsenseReasons.fulfill({ isLoading: false }));
  }
}
function* getAttendanceList(action: any) {
  try {
    yield put(getAttendances.fulfill({ isLoading: true }));
    const { id } = action.payload;
    yield put(getAttendances.request({ isLoading: false }));
    let response = yield call(getAttendanceApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(getAttendances.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getAttendances.fulfill({ isLoading: false }));
  }
}

function* createPublicHolidayRequest() {
  try {
    yield put(createPublicHoliday.request());
    const response = yield call(createPublicHolidayApiCall);
    if (response.success) {
      yield put(createPublicHoliday.success({ data: response.data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(createPublicHoliday.fulfill({ isLoading: false }));
  }
}

function* getPublicHolidayStatusRequest() {
  try {
    yield put(getPublicHolidayStatus.request());
    const response = yield call(getPublicHolidayStatusApiCall);
    if (response.success) {
      yield put(getPublicHolidayStatus.success({ data: response.data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getPublicHolidayStatus.fulfill({ isLoading: false }));
  }
}

export default function* hrRequestSaga() {
  yield takeLatest(getPayslip.TRIGGER, getPaySlipRequest);
  yield takeLatest(getPayslipDetails.TRIGGER, getPayslipDetailsRequest);
  yield takeLatest(getPayslipDocument.TRIGGER, getPayslipDocumentRequest);
  yield takeLatest(getAbsenseType.TRIGGER, getAbsenseTypeRequest);
  yield takeLatest(getAbsenseBalance.TRIGGER, getAbsenseBalanceRequest);
  yield takeLatest(hrApplyLeave.TRIGGER, hrApplyLeaveRequest);
  yield takeLatest(getAbsenseData.TRIGGER, getAbsenseDataRequest);
  yield takeLatest(putCancelAbsense.TRIGGER, putCancelAbsenseRequest);
  yield takeLatest(getAbsenseReasons.TRIGGER, getAbsenseReasonsRequest);
  yield takeLatest(getAttendances.TRIGGER, getAttendanceList);
  yield takeLatest(createPublicHoliday.TRIGGER, createPublicHolidayRequest);
  yield takeLatest(
    getPublicHolidayStatus.TRIGGER,
    getPublicHolidayStatusRequest
  );
}
