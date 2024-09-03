import produce from 'immer';

import {
  rewardsProfileImageUpdate,
  rewardsProfileImageUpdateFlag,
  userConfigUpdate
} from './actions';

export const initialState = {
  isRewardsProfileImageUpdated: false,
  isUserConfigUpdate: false,
  rewardProfileImageTimestamp: new Date().getTime()
};

export default (state = initialState, action: { type: any; payload: { type: any } }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case rewardsProfileImageUpdate.TRIGGER: {
        draft.isRewardsProfileImageUpdated = false;
        break;
      }
      case rewardsProfileImageUpdate.SUCCESS: {
        draft.isRewardsProfileImageUpdated = true;
        draft.rewardProfileImageTimestamp = new Date().getTime();
        break;
      }

      case userConfigUpdate.TRIGGER: {
        draft.isUserConfigUpdate = false;
        break;
      }
      case userConfigUpdate.SUCCESS: {
        draft.isUserConfigUpdate = true;
        break;
      }

      case rewardsProfileImageUpdateFlag.TRIGGER: {
        draft.isRewardsProfileImageUpdated = action?.payload || false;
        break;
      }

      default: {
        break;
      }
    }
  });
