import produce from 'immer';

import { getFaq } from './actions';

export const initialState = {
  faqData: []
};

export default (state = initialState, action: { type: any; payload: { type: any } }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getFaq.TRIGGER: {
        draft.faqData = [];
        break;
      }
      case getFaq.SUCCESS: {
        const { data } = action?.payload;
        draft.faqData = data;
        break;
      }

      default: {
        break;
      }
    }
  });
