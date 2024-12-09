import produce from "immer";
import { getKnowledgehubDocuments, getKnowledgehubTag } from "./actions";

export const initialState = {
  KnowledgehubDocumentsData: [],
  KnowledgehubTagsData: [],
  isLoading: false,
};

export default (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getKnowledgehubDocuments.TRIGGER: {
        draft.KnowledgehubDocumentsData = [];
        draft.isLoading = true;
        break;
      }

      case getKnowledgehubDocuments.SUCCESS: {
        draft.KnowledgehubDocumentsData = action.payload;
        draft.isLoading = false;
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
