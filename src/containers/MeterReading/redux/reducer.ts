import produce from "immer";
import { localize } from "../../../locale/utils";
import {
  MeterDetail,
  MeterReadingDetail,
} from "../type";

import {
  getSrMeters,
  getMeterReadingDetails,
  updateMeterReading,
  clearMeterReading,
  clearError,
} from "./actions";

export type MeterReadingState = {
  meterReadingDetail: MeterReadingDetail | undefined | {};
  metersList: MeterDetail[] | undefined | [];
  updatedReading: any;
  loading: {
    meterDetails: boolean;
    metersList: boolean;
    updateReading: boolean;
  };
  error: {
    meterDetails: string | null;
    metersList: string | null;
    updateReading: string | null;
  };
};

export const initialState: MeterReadingState = {
  meterReadingDetail: {},
  metersList: [],
  updatedReading: {},
  loading: {
    meterDetails: false,
    metersList: false,
    updateReading: false,
  },
  error: {
    meterDetails: null,
    metersList: null,
    updateReading: null,
  },
};

export default (state = initialState, action: { type: any; payload: any }) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Service Request Meters List
      case getSrMeters.TRIGGER: {
        draft.loading.metersList = true;
        draft.error.metersList = null;
        break;
      }
      case getSrMeters.SUCCESS: {
        draft.loading.metersList = false;
        draft.metersList = action.payload?.data?.data;
        break;
      }
      case getSrMeters.FAILURE: {
        draft.loading.metersList = false;
        draft.error.metersList =
          action.payload?.message || localize("meterReadings.failedToFetchMeters");
        draft.metersList = [];
        break;
      }

      // Individual Meter Reading Details
      case getMeterReadingDetails.TRIGGER: {
        draft.loading.meterDetails = true;
        draft.error.meterDetails = null;
        break;
      }
      case getMeterReadingDetails.SUCCESS: {
        draft.loading.meterDetails = false;
        draft.meterReadingDetail = action.payload?.data;
        break;
      }
      case getMeterReadingDetails.FAILURE: {
        draft.loading.meterDetails = false;
        draft.error.meterDetails =
          action.payload?.message || "Failed to fetch meter details";
        draft.meterReadingDetail = {};
        break;
      }

      // Update Meter Reading
      case updateMeterReading.TRIGGER: {
        draft.loading.updateReading = true;
        draft.error.updateReading = null;
        break;
      }
      case updateMeterReading.SUCCESS: {
        draft.loading.updateReading = false;
        draft.updatedReading = "success";
        break;
      }
      case updateMeterReading.FAILURE: {
        draft.loading.updateReading = false;
        draft.error.updateReading =
          action.payload?.message || localize("meterReadings.failedToUpdateMeter");
        draft.updatedReading = {};
        break;
      }

      case clearError.TRIGGER: {
        draft.error.meterDetails = null;
        draft.error.metersList = null;
        draft.error.updateReading = null;
        break;
      }

      case clearMeterReading.TRIGGER: {
        draft.meterReadingDetail = {};
        draft.metersList = [];
        draft.updatedReading =  {};
        draft.loading =  {
          meterDetails: false,
          metersList: false,
          updateReading: false,
        };
        draft.error = {
          meterDetails: null,
          metersList: null,
          updateReading: null,
        };
        break;
      }

      default: {
        break;
      }
    }
  });
