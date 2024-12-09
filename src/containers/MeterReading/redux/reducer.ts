import produce from "immer";
import {
  MeterDetail,
  MeterReadingDetail,
  ServiceRequestDetails,
} from "../type";

import {
  getSrDetails,
  getSrMeters,
  getMeterReadingDetails,
  updateMeterReading,
} from "./actions";

export type MeterReadingState = {
  serviceRequestDetails: ServiceRequestDetails | undefined | {};
  meterReadingDetail: MeterReadingDetail | undefined | {};
  metersList: MeterDetail[] | undefined | [];
  updatedReading: any;
  loading: {
    srDetails: boolean;
    meterDetails: boolean;
    metersList: boolean;
    updateReading: boolean;
  };
  error: {
    srDetails: string | null;
    meterDetails: string | null;
    metersList: string | null;
    updateReading: string | null;
  };
};

export const initialState: MeterReadingState = {
  serviceRequestDetails: {},
  meterReadingDetail: {},
  metersList: [],
  updatedReading: {},
  loading: {
    srDetails: false,
    meterDetails: false,
    metersList: false,
    updateReading: false,
  },
  error: {
    srDetails: null,
    meterDetails: null,
    metersList: null,
    updateReading: null,
  },
};

export default (state = initialState, action: { type: any; payload: any }) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Service Request Details
      case getSrDetails.TRIGGER: {
        draft.loading.srDetails = true;
        draft.error.srDetails = null;
        break;
      }
      case getSrDetails.SUCCESS: {
        draft.loading.srDetails = false;
        draft.serviceRequestDetails = action.payload?.data;
        break;
      }
      case getSrDetails.FAILURE: {
        draft.loading.srDetails = false;
        draft.error.srDetails =
          action.payload?.message || "Failed to fetch SR details";
        draft.serviceRequestDetails = {};
        break;
      }

      // Service Request Meters List
      case getSrMeters.TRIGGER: {
        draft.loading.metersList = true;
        draft.error.metersList = null;
        break;
      }
      case getSrMeters.SUCCESS: {
        draft.loading.metersList = false;
        draft.metersList = action.payload?.data;
        break;
      }
      case getSrMeters.FAILURE: {
        draft.loading.metersList = false;
        draft.error.metersList =
          action.payload?.message || "Failed to fetch meters list";
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
        draft.updatedReading = action.payload?.data;
        break;
      }
      case updateMeterReading.FAILURE: {
        draft.loading.updateReading = false;
        draft.error.updateReading =
          action.payload?.message || "Failed to update meter reading";
        draft.updatedReading = {};
        break;
      }

      default: {
        break;
      }
    }
  });
