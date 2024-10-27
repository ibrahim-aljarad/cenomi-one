import { createSelector } from "reselect";
import { initialState } from "./reducer";
import REDUCER_KEY from "../../../store/reducerKeys";

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.HR_REQUEST_REDUCER] || initialState;

const getPayslipListSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.paySlipList;
  }
);

const getPayslipDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.payslipDetailsData;
  }
);

const getPayslipDocumentSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.paySlipDocument;
  }
);

const getAbsenseTypeListSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.absenseTypeList;
  }
);

const getAbsenseBalanceSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.absenseBalance;
  }
);

const applyLeaveSuccessDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.applyLeaveSuccessData;
  }
);

const getAbsenseDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.absenseData;
  }
);

const cancelledAbsenseDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.cancelledAbsenceData;
  }
);

const getAbsenseReasonDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.absenseReason;
  }
);
const getAttendanceSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.attendanceList;
  }
);

const getPublicHolidayStatusSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.publicHolidayData;
  }
);

export {
  getPayslipListSelector,
  getPayslipDetailsSelector,
  getPayslipDocumentSelector,
  getAbsenseTypeListSelector,
  getAbsenseBalanceSelector,
  applyLeaveSuccessDataSelector,
  getAbsenseDataSelector,
  cancelledAbsenseDataSelector,
  getAbsenseReasonDataSelector,
  getAttendanceSelector,
  getPublicHolidayStatusSelector,
};
