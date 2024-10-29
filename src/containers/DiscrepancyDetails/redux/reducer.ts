import produce from "immer";

import { getDiscrepancyDetail, getUnitList } from "./actions";

type ListApiResponse = {
  list: any[];
  current_page: number;
  total_count: number;
  limit: number;
};
export type DiscrepancyDetailsData = {
  discrepancyDetailData: ListApiResponse | undefined | {};
  unitList: ListApiResponse | undefined | {};
};

export const initialState: DiscrepancyDetailsData = {
  discrepancyDetailData: {},
  unitList: {},
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
        draft.unitList = action.payload?.data?.data;
        break;
      }
      case getUnitList.FAILURE: {
        draft.unitList = {};
        break;
      }
      default: {
        break;
      }
    }
  });
