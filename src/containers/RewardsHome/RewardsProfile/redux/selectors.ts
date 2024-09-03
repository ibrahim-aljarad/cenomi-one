import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../../../store/reducerKeys';

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.REWARDS_PROFILE_REDUCER] || initialState;

const isRewardsProfileImageUpdatedSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isRewardsProfileImageUpdated
);

const rewardProfileImageTimestampSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.rewardProfileImageTimestamp
);

const isUserConfigUpdateSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isUserConfigUpdate
);

export {
  isRewardsProfileImageUpdatedSelector,
  isUserConfigUpdateSelector,
  rewardProfileImageTimestampSelector
};
