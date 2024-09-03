import produce from "immer";

import {
  getAbsenseType,
  getPayslip,
  getPayslipDocument,
  getAbsenseBalance,
  hrApplyLeave,
  getAbsenseData,
  putCancelAbsense,
  getAbsenseReasons,
  getPayslipDetails,
  getAttendances,
} from "./actions";

export const initialState = {
  paySlipList: undefined,
  payslipDetailsData: undefined,
  paySlipDocument: "",
  absenseTypeList: undefined,
  absenseBalance: undefined,
  applyLeaveSuccessData: {},
  absenseData: undefined,
  cancelledAbsenceData: false,
  absenseReason: {},
  attendanceList: [],
};

export default (
  state = initialState,
  action: { type: any; payload: { type: any } }
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getPayslip.TRIGGER: {
        draft.paySlipList = undefined;
        break;
      }
      case getPayslip.SUCCESS: {
        const { data } = action.payload || {};
        draft.paySlipList = data || [];
        break;
      }

      case getPayslipDetails.TRIGGER: {
        draft.payslipDetailsData = undefined;
        break;
      }
      case getPayslipDetails.SUCCESS: {
        const { data } = action.payload || {};
        draft.payslipDetailsData = data || [];
        break;
      }
      case getPayslipDetails.FAILURE: {
        draft.payslipDetailsData = [];
        break;
      }

      case getPayslipDocument.TRIGGER: {
        draft.paySlipDocument = "";
        break;
      }
      case getPayslipDocument.SUCCESS: {
        const { data } = action.payload || {};
        draft.paySlipDocument = data;
        break;
      }

      case getAbsenseType.TRIGGER: {
        draft.absenseTypeList = undefined;
        break;
      }
      case getAbsenseType.SUCCESS: {
        const { data } = action.payload || {};
        draft.absenseTypeList = data || [];
        break;
      }
      case getAbsenseType.FAILURE: {
        draft.absenseTypeList = [];
        break;
      }

      case getAbsenseBalance.TRIGGER: {
        draft.absenseBalance = undefined;
        break;
      }
      case getAbsenseBalance.SUCCESS: {
        const { data } = action.payload || {};
        draft.absenseBalance = data;
        break;
      }
      case getAbsenseBalance.FAILURE: {
        draft.absenseBalance = [];
        break;
      }

      case hrApplyLeave.TRIGGER: {
        draft.applyLeaveSuccessData = [];
        break;
      }
      case hrApplyLeave.SUCCESS: {
        const { data } = action.payload || {};
        draft.applyLeaveSuccessData = data;
        break;
      }

      case getAbsenseData.TRIGGER: {
        draft.absenseData = undefined;
        break;
      }
      case getAbsenseData.SUCCESS: {
        const { data } = action.payload || {};
        draft.absenseData = data;
        break;
      }
      case getAbsenseData.FAILURE: {
        draft.absenseData = [];
        break;
      }

      case putCancelAbsense.TRIGGER: {
        draft.cancelledAbsenceData = false;
        break;
      }
      case putCancelAbsense.SUCCESS: {
        draft.cancelledAbsenceData = true;
        break;
      }

      case getAbsenseReasons.TRIGGER: {
        draft.absenseReason = {};
        break;
      }
      case getAbsenseReasons.SUCCESS: {
        const { data } = action?.payload || {};
        draft.absenseReason = data;
        break;
      }
      case getAttendances.TRIGGER: {
        draft.attendanceList = [];
        break;
      }
      case getAttendances.SUCCESS: {
        const { data } = action?.payload || {};
        draft.attendanceList = data;
        break;
      }

      default:
        break;
    }
  });
