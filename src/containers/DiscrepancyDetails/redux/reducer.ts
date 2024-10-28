import produce from 'immer';

import {
  getDiscrepancyDetail
} from './actions';

export type DiscrepancyDetailsData =  {
  discrepancyDetailData: any
}

export const initialState: DiscrepancyDetailsData = {
  discrepancyDetailData: {},
};

export default (state = initialState, action: { type: any; payload: { type: any } }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getDiscrepancyDetail.TRIGGER: {
        draft.discrepancyDetailData = undefined;
        break;
      }
      case getDiscrepancyDetail.SUCCESS: {
        draft.discrepancyDetailData = action.payload?.data;
        break;
      }
      case getDiscrepancyDetail.FAILURE: {
        draft.discrepancyDetailData = [];
        break;
      }
 
      default: {
        break;
      }
    }
  });
