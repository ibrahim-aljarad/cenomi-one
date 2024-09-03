import crashlytics from '@react-native-firebase/crashlytics';
import { createStackNavigator } from '@react-navigation/stack';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getIsForceUpdateSelector,
  getIsUnderMaintenanceSelector,
  isSplashScreenVisibleSelector
} from '../appContainer/redux/selectors';
import AppUpdate from '../containers/AppUpdate';
import { HomeStack } from '../containers/Home/routes';
import { RewardsHomeStack } from '../containers/RewardsHome/routes';
import { HrRequestStack } from '../containers/HrRequest/routes';
import { getKnowledgehubTag } from '../containers/KnowledgeHUB/redux/actions';
import { KnowledgeHUBStack } from '../containers/KnowledgeHUB/routes';
import {
  doLogout,
  getMyProfile,
  refreshToken,
  setIsLoggedIn
} from '../containers/LoginHome/redux/actions';
import {
  checkUserDataSelector,
  getIsRefreshTokenSelector,
  getMyProfileDetailsSelector,
  isBiometricOpenSelector,
  isLoggedInSelector,
  isLoggedOutDoneSelector
} from '../containers/LoginHome/redux/selectors';
import { LoginRoutes } from '../containers/LoginHome/routes';
import { CustomSplashScreen, TutorialScreen } from '../containers/Tutorials';
import { getPublicStaticData, getStaticData } from '../containers/redux/actions';
import { localize } from '../locale/utils';
import { BUILD_NUMBER, LOCAL_STORAGE_DATA_KEY } from '../utils/constants';
import { clearAllExceptTutorialShowAppLanguage } from '../utils/helper';
import { getSaveData, removeData } from '../utils/helpers';
import BottomTabStack from './BottomTabStack';
import RewardsBottomTabStack from './RewardsBottomTabStack';
import NavigationRouteNames from './ScreenNames';
import { getSyncProfileCompletedSelector, isDarkModeSelector } from '../containers/redux/selectors';
import * as PushNotification from 'react-native-push-notification';
import { useNavigationState } from '@react-navigation/core';
import CustomStatusBar from '../components/CustomStatusBar';
import RNRestart from 'react-native-restart';

setJSExceptionHandler((error, isFatal) => {
  crashlytics().recordError(error);
});

const Stack = createStackNavigator();

const stateSelector = createStructuredSelector({
  isSplashScreenVisible: isSplashScreenVisibleSelector,
  isLoggedInData: isLoggedInSelector,
  isLoggedOutDone: isLoggedOutDoneSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  isRefreshToken: getIsRefreshTokenSelector,
  isAppForceUpdate: getIsForceUpdateSelector,
  isAppUnderMaintenance: getIsUnderMaintenanceSelector,
  syncProfileCompleted: getSyncProfileCompletedSelector,
  checkUserData: checkUserDataSelector,
  isBiometricOpen: isBiometricOpenSelector
  //need version/under_maintanance/force_update info from api
  // appMetadata
});

// const appMetadata = [];
const rnBiometrics = new ReactNativeBiometrics();

const AppStack = () => {
  const {
    isSplashScreenVisible,
    isLoggedInData,
    isLoggedOutDone,
    myProfileDetails,
    isRefreshToken,
    isAppForceUpdate,
    isAppUnderMaintenance,
    syncProfileCompleted,
    checkUserData,
    isBiometricOpen
  } = useSelector(stateSelector);
  const [showTutorial, setShowTutorial] = useState(false);
  const [renderNavigation, setRenderNavigation] = useState(false);
  const [isForceUpdate, setIsForceUpdate] = useState(false);
  const [isLoggedInLocalState, setIsLoggedInLocalState] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isCalledRefreshToken, setCalledRefreshToken] = useState(false);

  const dispatch = useDispatch();
  let cancelCountBiometric = 0;

  const userType = checkUserData?.userType || myProfileDetails?.userType;
  const username = checkUserData?.username || myProfileDetails?.username;

  // Find current routes here
  const routesInfo = useNavigationState((state) => state?.routes[state.index]);
  const { state: { index, routeNames } = {}, name } = routesInfo || {};
  const screenName = !isEmpty(routeNames) ? routeNames[index] : name;
  const isHomePage =
    screenName === NavigationRouteNames.HOME || screenName === NavigationRouteNames.HOME_TAB;

  const autoLoginUser = () => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME).then((data) => {
      if (JSON.parse(data) === true) {
        setIsRememberMe(true);
        dispatch(getMyProfile.trigger());
      } else {
        setIsRememberMe(false);
        removeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN);
        removeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
        setIsLoggedInLocalState(false);
      }
    });
  };

  const handleCancelBioMetric = () => {
    Alert.alert(localize('profile.authFailed'), localize('login.authFailed'), [
      {
        text: localize('common.tryAgain'),
        onPress: () => {
          handleEnadleBiometric();
        }
      }
    ]);
  };

  const handleFailure = () => {
    Alert.alert(localize('profile.authFailed'), localize('login.authFailed'), [
      {
        text: localize('common.cancel').toLowerCase(),
        style: 'cancel'
      },
      {
        text: localize('common.tryAgain'),
        onPress: () => {
          cancelCountBiometric = cancelCountBiometric + 1;
          handleEnadleBiometric();
        }
      }
    ]);
  };

  const handleEnadleBiometric = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: localize('biometric.confirmFingerPrint') })
      .then((resultObject) => {
        const { success } = resultObject;
        if (success) {
          autoLoginUser();
        } else {
          if (cancelCountBiometric >= 3) {
            // remove biometric data

            dispatch(doLogout.trigger());

            // setIsRememberMe(false);
            // removeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN);
            // removeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
            // setIsLoggedIn(false);
          } else {
            handleFailure();
          }
        }
      })
      .catch(() => {
        dispatch(doLogout.trigger());
        // setIsRememberMe(false);
        // removeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN);
        // removeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
        // setIsLoggedIn(false);
        console.log('biometrics failed');
      });
  };

  useEffect(() => {
    console.log('isBioEnabled: 1');

    getSaveData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then(async (isBioEnabled) => {
      if (isBioEnabled) {
        const jsonLoginData = JSON.parse(isBioEnabled);
        console.log('isBioEnabled: ', jsonLoginData);
        if (jsonLoginData) {
          handleEnadleBiometric();
        } else {
          autoLoginUser();
        }
      } else {
        autoLoginUser();
      }
    });
  }, []);

  useEffect(() => {
    if (isRefreshToken && isCalledRefreshToken) {
      setCalledRefreshToken(false);

      dispatch(getMyProfile.trigger());
      if (userType !== 'rewards_user' || userType !== 'guest_user') {
        dispatch(getKnowledgehubTag.trigger());
      }
      setIsLoggedInLocalState(true);
      dispatch(setIsLoggedIn.trigger());
    }
  }, [isRefreshToken]);

  useEffect(() => {
    if (myProfileDetails?.statusCode) {
      if (myProfileDetails?.statusCode === 401) {
        if (isRememberMe) {
          setCalledRefreshToken(true);
          // Call refresh token api
          dispatch(refreshToken.trigger());
        } else {
          clearAllExceptTutorialShowAppLanguage(false);
          setIsLoggedInLocalState(false);
        }
      }
    } else if (!isEmpty(myProfileDetails) && isRememberMe) {
      console.log({ checkUserData, myProfileDetails });

      if (userType !== 'rewards_user' || userType !== 'guest_user') {
        dispatch(getKnowledgehubTag.trigger());
      }
      if (!isBiometricOpen) {
        if (username !== 'guest.user@cenomi.com') {
          setIsLoggedInLocalState(true);
          dispatch(setIsLoggedIn.trigger());
        } else {
          // dispatch(doLogout.trigger());
        }
      }
    }
  }, [myProfileDetails, isRememberMe]);

  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.TUTORIAL_SHOWN).then((val) => {
      setShowTutorial(val === null ? false : val === 'true');
      setRenderNavigation(true);
    });
  }, []);

  useEffect(() => {
    if (isLoggedInData) {
      setIsLoggedInLocalState(true);
    }
    if (isLoggedOutDone) {
      clearAllExceptTutorialShowAppLanguage(true);
      setShowTutorial(true);
      setIsLoggedInLocalState(false);
    }
  }, [isLoggedInData, isLoggedOutDone]);

  useEffect(() => {
    if (!isEmpty(isAppForceUpdate) && !isEmpty(isAppUnderMaintenance)) {
      try {
        if (
          isAppForceUpdate?.force_update?.is_force_update &&
          parseFloat(isAppForceUpdate.app_build_version) > parseFloat(BUILD_NUMBER)
        ) {
          setIsForceUpdate(true);
        } else if (isAppUnderMaintenance?.is_under_maintenance) {
          setIsForceUpdate(true);
        } else {
          if (isForceUpdate) {
            RNRestart.restart();
          }
          setIsForceUpdate(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [isAppForceUpdate, isAppUnderMaintenance]);

  useEffect(() => {
    if (isLoggedInLocalState) {
      if (userType !== 'rewards_user' || userType !== 'guest_user') {
        dispatch(getStaticData.trigger());
      }
      dispatch(getPublicStaticData.trigger());
    } else {
      PushNotification.setApplicationIconBadgeNumber(0);
    }
  }, [isLoggedInLocalState]);

  return (
    <>
      <CustomStatusBar isHomePage={isHomePage || false} />
      {renderNavigation && (
        <Stack.Navigator screenOptions={{ headerMode: 'screen' }}>
          {!isForceUpdate ? (
            <>
              {/* {isLoggedIn && userType === 'employee' ? ( */}
              {userType === 'guest_user' ? (
                <>
                  <Stack.Screen
                    name={NavigationRouteNames.REWARDS_HOME_TAB}
                    component={RewardsBottomTabStack}
                    options={{ headerShown: false, gestureEnabled: false }}
                  />
                  {RewardsHomeStack()}
                </>
              ) : isLoggedInLocalState ? (
                <>
                  {userType === 'rewards_user' ? (
                    <>
                      <Stack.Screen
                        name={NavigationRouteNames.REWARDS_HOME_TAB}
                        component={RewardsBottomTabStack}
                        options={{ headerShown: false, gestureEnabled: false }}
                      />
                      {RewardsHomeStack()}
                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        name={NavigationRouteNames.HOME_TAB}
                        component={BottomTabStack}
                        options={{ headerShown: false, gestureEnabled: false }}
                      />
                      {HomeStack()}
                      {KnowledgeHUBStack()}
                      {HrRequestStack()}
                    </>
                  )}
                </>
              ) : (
                <>
                  {isSplashScreenVisible && (
                    <Stack.Screen
                      name={NavigationRouteNames.SPLASH_SCREEN}
                      component={CustomSplashScreen}
                      options={{ headerShown: false }}
                    />
                  )}
                  {!showTutorial && (
                    <Stack.Screen
                      name={NavigationRouteNames.TUTORIAL_SCREEN}
                      component={TutorialScreen}
                      options={{ headerShown: false }}
                    />
                  )}
                  {LoginRoutes()}
                </>
              )}
            </>
          ) : (
            <Stack.Screen
              name={NavigationRouteNames.APP_UPDATE}
              component={AppUpdate}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      )}
    </>
  );
};

export default AppStack;
