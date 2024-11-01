import { createRoutine } from "redux-saga-routines";

import {
  CLEAR_DISCREPANCY,
  GET_DISCREPANCY_DETAIL,
  GET_UNIT_DISCREPANCY,
  GET_UNIT_LIST,
  SAVE_UNIT_DISCREPANCY,
} from "./constants";

export const getDiscrepancyDetail = createRoutine(GET_DISCREPANCY_DETAIL);
export const getUnitList = createRoutine(GET_UNIT_LIST);
export const getUnitDicrepancy = createRoutine(GET_UNIT_DISCREPANCY);
export const saveUnitDicrepancy = createRoutine(SAVE_UNIT_DISCREPANCY);
export const clearDiscrepancy = createRoutine(CLEAR_DISCREPANCY);
