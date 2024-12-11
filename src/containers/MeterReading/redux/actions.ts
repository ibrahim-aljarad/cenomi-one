import { createRoutine } from "redux-saga-routines";
import {
  GET_SR_METERS,
  UPDATE_METER_READING,
  GET_METER_READING_DETAILS,
} from "./constants";

export const getSrMeters = createRoutine(GET_SR_METERS);
export const getMeterReadingDetails = createRoutine(GET_METER_READING_DETAILS);
export const updateMeterReading = createRoutine(UPDATE_METER_READING);
