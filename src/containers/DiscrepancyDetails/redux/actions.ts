import { createRoutine } from "redux-saga-routines";

import {
  GET_DISCREPANCY_DETAIL,
  GET_UNIT_DISCREPANCY,
  GET_UNIT_LIST,
} from "./constants";

export const getDiscrepancyDetail = createRoutine(GET_DISCREPANCY_DETAIL);
export const getUnitList = createRoutine(GET_UNIT_LIST);
export const getUnitDicrepancy = createRoutine(GET_UNIT_DISCREPANCY);
