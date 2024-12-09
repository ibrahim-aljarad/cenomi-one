import { createSelector } from "reselect";
import { initialState, MeterReadingState } from "./reducer";
import REDUCER_KEY from "../../../store/reducerKeys";

type RootState = Record<
  typeof REDUCER_KEY.METER_READING_REDUCER,
  MeterReadingState
>;

const selectGlobalSubStore = (store: RootState): MeterReadingState =>
  store[REDUCER_KEY.METER_READING_REDUCER] || initialState;

const getMeterReadingStateSelector = createSelector(
  selectGlobalSubStore,
  (globalState: MeterReadingState): MeterReadingState => globalState
);

const getServiceRequestDetailsSelector = createSelector(
  getMeterReadingStateSelector,
  (
    globalState: MeterReadingState
  ): MeterReadingState["serviceRequestDetails"] =>
    globalState.serviceRequestDetails
);

const getMeterReadingDetailSelector = createSelector(
  getMeterReadingStateSelector,
  (globalState: MeterReadingState): MeterReadingState["meterReadingDetail"] =>
    globalState.meterReadingDetail
);

const getMetersListSelector = createSelector(
  getMeterReadingStateSelector,
  (globalState: MeterReadingState): MeterReadingState["metersList"] =>
    globalState.metersList
);

const getUpdatedReadingSelector = createSelector(
  getMeterReadingStateSelector,
  (globalState: MeterReadingState): MeterReadingState["updatedReading"] =>
    globalState.updatedReading
);

const getLoadingSelector = createSelector(
  getMeterReadingStateSelector,
  (globalState: MeterReadingState): MeterReadingState["loading"] =>
    globalState.loading
);

const getErrorSelector = createSelector(
  getMeterReadingStateSelector,
  (globalState: MeterReadingState): MeterReadingState["error"] =>
    globalState.error
);

export {
  getServiceRequestDetailsSelector,
  getMeterReadingDetailSelector,
  getMetersListSelector,
  getUpdatedReadingSelector,
  getLoadingSelector,
  getErrorSelector,
};
