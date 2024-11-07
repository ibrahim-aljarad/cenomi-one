import produce from "immer";

import {
  clearDiscrepancy,
  getDiscrepancyDetail,
  getUnitDicrepancy,
  getUnitList,
  saveUnitDicrepancy,
} from "./actions";

type ListApiResponse = {
  list: any[];
  current_page: number;
  total_count: number;
  limit: number;
};
export type DiscrepancyDetailsData = {
  discrepancyDetailData: ListApiResponse | undefined | {};
  unitList: ListApiResponse | undefined | {};
  unitDiscrepancy:
    | {
        discrepancy_id: string;
        service_request_id: number;
        payload: any;
        status: string;
        document_ids: string[];
      }
    | undefined
    | {};
  savedDiscrepancy: any;
};

export const initialState: DiscrepancyDetailsData = {
  discrepancyDetailData: {},
  unitList: {},
  unitDiscrepancy: {},
  savedDiscrepancy: {},
};

export default (
  state = initialState,
  action: { type: any; payload: { data: any } }
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getDiscrepancyDetail.TRIGGER: {
        draft.discrepancyDetailData = undefined;
        break;
      }
      case getDiscrepancyDetail.SUCCESS: {
        draft.discrepancyDetailData = action.payload?.data?.data;
        break;
      }
      case getDiscrepancyDetail.FAILURE: {
        draft.discrepancyDetailData = {};
        break;
      }

      case getUnitList.TRIGGER: {
        draft.unitList = undefined;
        break;
      }
      case getUnitList.SUCCESS: {
        console.log('action.payload', action.payload);
        const { current_page, limit, list, total_count } = action.payload?.data?.data;
  draft.unitList = {
    list,
    pagination: {
      current_page,
      total_pages: Math.ceil(total_count / limit),
      total_items: total_count,
      items_per_page: limit
    }
  };
        break;
      }
      case getUnitList.FAILURE: {
        draft.unitList = {};
        break;
      }

      case getUnitDicrepancy.TRIGGER: {
        draft.unitDiscrepancy = undefined;
        break;
      }
      case getUnitDicrepancy.SUCCESS: {
        draft.unitDiscrepancy = action.payload?.data?.data;
        break;
      }
      case getUnitDicrepancy.FAILURE: {
        draft.unitDiscrepancy = {};
        break;
      }

      case saveUnitDicrepancy.TRIGGER: {
        draft.savedDiscrepancy = undefined;
        break;
      }
      case saveUnitDicrepancy.SUCCESS: {
        draft.savedDiscrepancy = "success";
        break;
      }

      case clearDiscrepancy.TRIGGER: {
        draft.discrepancyDetailData = {};
        draft.unitList = {};
        draft.unitDiscrepancy = {};
        draft.savedDiscrepancy = {};
        break;
      }

      default: {
        break;
      }
    }
  });
