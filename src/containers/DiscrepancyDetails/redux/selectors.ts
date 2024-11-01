import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../../store/reducerKeys';

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.DISCREPANCY_REDUCER] || initialState;

const getDiscrepancyDetailDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.discrepancyDetailData;
});

const getUnitListSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.unitList;
});

const getUnitDiscrepancySelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.unitDiscrepancy;
});

const saveUnitDiscrepancySelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.savedDiscrepancy;
});

export {
  getDiscrepancyDetailDataSelector,
  getUnitListSelector,
  getUnitDiscrepancySelector,
  saveUnitDiscrepancySelector,
};
