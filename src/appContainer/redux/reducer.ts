import produce from 'immer';
import { BackHandler } from 'react-native';
import { isEmpty } from 'lodash';
import {
  setSplashScreen,
  setGlobalError,
  setCurrentNetworkState,
  setAppForceUpdate,
  setAppUnderMaintenance
} from './actions';
import { localize } from '../../locale/utils';
import { alertBox } from '../../utils/helpers';

export const initialState = {
  isSplashScreenVisible: true,
  isAPIExecuting: false,
  networkConnected: false,
  isLoading: false,
  isError: false,
  isAppUnderMaintenance: false,
  isAppForceUpdate: false
};

let handler = '';

export default (state = initialState, action) =>
  produce(state, (draft) => {
    if (action.type.includes('/REQUEST')) {
      draft.error = {};
      draft.isError = false;
      if (action?.payload) {
        if (action?.payload?.isLoading) {
          draft.isLoading = true;
          handler = BackHandler.addEventListener('hardwareBackPress', function () {
            return true;
          });
        }
        // This "isAPIExecuting" variabe is used to track if API call is going.
        if (action?.payload?.isAPIExecuting && action?.payload?.isAPIExecuting != undefined) {
          draft.isAPIExecuting = true;
        }
      }
    } else if (action.type.includes('/FULFILL')) {
      if (action?.payload) {
        if (!action?.payload?.isLoading) {
          draft.isLoading = false;
          if (!isEmpty(handler)) {
            handler.remove();
          }
        }
        // This "isAPIExecuting" variabe is used to track if API call is end.
        if (!action?.payload?.isAPIExecuting && action?.payload?.isAPIExecuting != undefined) {
          draft.isAPIExecuting = false;
        }
      }
    }

    switch (action.type) {
      case setAppForceUpdate.TRIGGER: {
        draft.isAppForceUpdate = action.payload;
        break;
      }
      case setAppUnderMaintenance.TRIGGER: {
        draft.isAppUnderMaintenance = action.payload;
        break;
      }
      case setCurrentNetworkState.TRIGGER: {
        draft.networkConnected = action.payload;
        break;
      }
      case setGlobalError.SUCCESS: {
        if (isEmpty(action.payload)) {
          // draft.error = {
          //   title: localize('common.error'),
          //   message: localize('common.someThingWentWrong')
          // };
        } else {
          const { error } = action.payload;
          draft.error = error;
        }
        draft.isError = true;
        break;
      }
      case setSplashScreen.TRIGGER: {
        draft.isSplashScreenVisible = false;
        break;
      }

      default: {
        break;
      }
    }
  });
