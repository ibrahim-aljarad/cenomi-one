import { createRoutine } from "redux-saga-routines";

import {
  GET_PAYSLIP,
  GET_PAYSLIP_DETAILS,
  GET_PAYSLIP_DOCUMENT,
  GET_ABSENSE_TYPE,
  GET_ABSENSE_BALANCE,
  HR_APPLY_LEAVE,
  GET_ABSENSE_DATA,
  CANCEL_ABSENSE_DATA,
  GET_ABSENSE_REASONS,
  GET_ATTENDANCE,
  CREATE_PUBLIC_HOLIDAY,
  GET_PUBLIC_HOLIDAY_STATUS,
} from "./constants";

export const getPayslip = createRoutine(GET_PAYSLIP);
export const getPayslipDetails = createRoutine(GET_PAYSLIP_DETAILS);
export const getPayslipDocument = createRoutine(GET_PAYSLIP_DOCUMENT);
export const getAbsenseType = createRoutine(GET_ABSENSE_TYPE);
export const getAbsenseBalance = createRoutine(GET_ABSENSE_BALANCE);
export const hrApplyLeave = createRoutine(HR_APPLY_LEAVE);
export const getAbsenseData = createRoutine(GET_ABSENSE_DATA);
export const putCancelAbsense = createRoutine(CANCEL_ABSENSE_DATA);
export const getAbsenseReasons = createRoutine(GET_ABSENSE_REASONS);
export const getAttendances = createRoutine(GET_ATTENDANCE);
export const createPublicHoliday = createRoutine(CREATE_PUBLIC_HOLIDAY);
export const getPublicHolidayStatus = createRoutine(GET_PUBLIC_HOLIDAY_STATUS);
