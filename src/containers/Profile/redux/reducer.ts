import produce from 'immer';

import { profileImageUpdate, userConfigUpdate, profileImageUpdateFlag } from './actions';

export const initialState = {
  isProfileImageUpdated: false,
  isUserConfigUpdate: false,
  profileImageTimestamp: new Date().getTime()
};

export default (state = initialState, action: { type: any; payload: { type: any } }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case profileImageUpdate.TRIGGER: {
        draft.isProfileImageUpdated = false;
        break;
      }
      case profileImageUpdate.SUCCESS: {
        draft.isProfileImageUpdated = true;
        draft.profileImageTimestamp = new Date().getTime();
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

      case profileImageUpdateFlag.TRIGGER: {
        draft.isProfileImageUpdated = action?.payload || false;
        break;
      }

      default: {
        break;
      }
    }
  });
