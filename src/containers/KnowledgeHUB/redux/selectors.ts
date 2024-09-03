import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../../store/reducerKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.KNOWLEDGEHUB_REDUCER] || initialState;

const getKnowledgehubDocumentsSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.KnowledgehubDocumentsData;
});
const getKnowledgehubTagSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.KnowledgehubTagsData;
});

export { getKnowledgehubDocumentsSelector, getKnowledgehubTagSelector };
