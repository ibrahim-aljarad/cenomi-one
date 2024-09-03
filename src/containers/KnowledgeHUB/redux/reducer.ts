import produce from 'immer';
import { getKnowledgehubDocuments, getKnowledgehubTag } from './actions';

export const initialState = {
  KnowledgehubDocumentsData: [],
  KnowledgehubTagsData: []
};

export default (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getKnowledgehubDocuments.TRIGGER: {
        draft.KnowledgehubDocumentsData = [];
        break;
      }

      case getKnowledgehubDocuments.SUCCESS: {
        draft.KnowledgehubDocumentsData = action.payload;
        break;
      }

      case getKnowledgehubTag.TRIGGER: {
        draft.KnowledgehubTagsData = [];
        break;
      }

      case getKnowledgehubTag.SUCCESS: {
        draft.KnowledgehubTagsData = action.payload.data;

        break;
      }

      default: {
        break;
      }
    }
  });
