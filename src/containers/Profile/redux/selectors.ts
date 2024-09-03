import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../../store/reducerKeys';

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.PROFILE_REDUCER] || initialState;

const isProfileImageUpdatedSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isProfileImageUpdated
);

const isUserConfigUpdateSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isUserConfigUpdate
);

const profileImageTimestampSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.profileImageTimestamp
);

export { isProfileImageUpdatedSelector, isUserConfigUpdateSelector, profileImageTimestampSelector };
