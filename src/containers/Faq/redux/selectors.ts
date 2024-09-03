import {createSelector} from 'reselect';
import {initialState} from './reducer';
import REDUCER_KEY from '../../../store/reducerKeys';

const selectGlobalSubStore = (store: {[x: string]: any}) =>
  store[REDUCER_KEY.FAQ_REDUCER] || initialState;

const getFaqSelector = createSelector(selectGlobalSubStore, globalState => {
  return globalState.faqData;
});

export {getFaqSelector};
