import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState, View } from 'react';
import { Appearance, Platform } from 'react-native';
import Config from 'react-native-config';
import { usePromiseTracker } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, Loader, NetworkInfo } from '../components';
import AppPrimaryButton from '../components/AppPrimaryButton';
import CustomModal from '../components/CustomModal';
import {
  markReadNotification,
  setNotificationPayload
} from '../containers/Notifications/redux/actions';
import { notificationPayloadSelector } from '../containers/Notifications/redux/selectors';
import { setColorTheme } from '../containers/redux/actions';
import { localize } from '../locale/utils';
import { CommonStyles, Images } from '../theme';
import { LOCAL_STORAGE_DATA_KEY } from '../utils/constants';
import { initializeNotification, requestUserPermission } from '../utils/fcmNotification';
import { RfH, RfW } from '../utils/helper';
import { alertBox, getSaveData } from '../utils/helpers';
import { setAppForceUpdate, setAppUnderMaintenance, setCurrentNetworkState } from './redux/actions';
import {
  getNetworkStateSelector,
  isLoadingSelector,
  selectGlobalError,
  selectIsGlobalError
} from './redux/selectors';

let currentNetwork = false;
NetInfo.fetch().then((state) => {
  currentNetwork = state.isConnected;
});

const stateSelector = createStructuredSelector({
  isLoading: isLoadingSelector,
  isError: selectIsGlobalError,
  error: selectGlobalError,
  networkConnected: getNetworkStateSelector,

  notificationPayload: notificationPayloadSelector
});

function MainContainer(props: { children: any }): JSX.Element {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [netInfo, setNetInfo] = useState(currentNetwork);
  const { promiseInProgress } = usePromiseTracker();

  const { isLoading, isError, error, networkConnected, notificationPayload } =
    useSelector(stateSelector);

  const [errorMessageInfo, setErrorMessageInfo] = useState({
    title: '',
    description: '',
    buttonText: '',
    usedFor: '',
    isVisible: false
  });

  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS).then((res) => {
      if (res) {
        const { isDark, isEnableDeviceSettings } = JSON.parse(res);
        if (isEnableDeviceSettings) {
          dispatch(setColorTheme.trigger({ theme: Appearance.getColorScheme() }));
        } else if (isDark) {
          dispatch(setColorTheme.trigger({ theme: 'dark' }));
        } else {
          dispatch(setColorTheme.trigger({ theme: 'light' }));
        }
      } else {
        dispatch(setColorTheme.trigger({ theme: 'light' }));
      }
    });
  }, [Appearance.getColorScheme(), isFocused]);

  useEffect(() => {
    if (networkConnected) {
      console.log('Network Connection State: ', networkConnected);
    }
  }, [networkConnected]);

  const checkConnection = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setCurrentNetworkState.trigger(state.isConnected));
      setNetInfo(state.isConnected);
    });
    return () => unsubscribe();
  };

  const handleRequest = useCallback(() => {
    NetInfo.fetch().then((state) => {
      dispatch(setCurrentNetworkState.trigger(state.isConnected));
      setNetInfo(state.isConnected);
    });
  }, [netInfo]);

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    checkConnection();
    requestUserPermission();
    initializeNotification();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('NOTIFICATION MESSAGE: remoteMessage', remoteMessage);
      if (!isEmpty(remoteMessage) && !isEmpty(remoteMessage.data)) {
        console.log({ payload: JSON.parse(remoteMessage.data?.payload) });

        dispatch(
          setNotificationPayload.success({ payload: JSON.parse(remoteMessage.data?.payload) })
        );
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          'NOTIFICATION MESSAGE: Notification caused app to open from quit state:',
          remoteMessage
        );
        if (!isEmpty(remoteMessage) && !isEmpty(remoteMessage.data)) {
          console.log({ payload: JSON.parse(remoteMessage.data?.payload) });

          dispatch(
            setNotificationPayload.success({ payload: JSON.parse(remoteMessage.data?.payload) })
          );
        }
      });

    // foreground
    messaging().onMessage(async (remoteMessage) => {
      console.log('NOTIFICATION MESSAGE: A new FCM message arrived!', remoteMessage);
      if (!isEmpty(remoteMessage) && !isEmpty(remoteMessage.data)) {
        console.log({ payload: JSON.parse(remoteMessage.data?.payload) });

        dispatch(
          setNotificationPayload.success({
            payload: { foreground: true, ...JSON.parse(remoteMessage.data?.payload) }
          })
        );
      }
    });

    // background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('NOTIFICATION MESSAGE: Message handled in the background!', remoteMessage);
    });
  }, []);

  useEffect(() => {
    if (isError && (error?.message || error?.title)) {
      alertBox(error?.title, error?.message);
      // setErrorMessageInfo({
      //   title: error?.title,
      //   description: error?.message,
      //   buttonText: localize('common.tryAgainC'),
      //   usedFor: 'error',
      //   isVisible: true,
      // });
    }
  }, [error, isError]);

  const closeErrorPopup = () => {
    setErrorMessageInfo({
      title: '',
      description: '',
      buttonText: '',
      usedFor: '',
      isVisible: false
    });
  };

  const pressedErrorPopupButton = () => {
    // Do some thing from here
    closeErrorPopup();
  };

  useEffect(() => {
    let onMetaDataChange;
    // Logging users anonymously, in order to use Realtime database.
    auth()
      .signInAnonymously()
      .then(({ user }) => {
        console.log('[Firebase]: User logged in anonymously', user.toJSON());
        console.log('[Firebase]: MetaData Ref --> ', Config.FB_DB_META_DATA_REF);
        onMetaDataChange = database()
          .ref(Config.FB_DB_META_DATA_REF)
          .on('value', (snapshot) => {
            let data = snapshot.val();
            console.log('[Firebase]: MetaData --> ', data);

            if (data && !isEmpty(data?.maintenance)) {
              dispatch(setAppUnderMaintenance.trigger(data?.maintenance));
            }

            if (data && !isEmpty(data[Platform.OS === 'ios' ? 'ios' : 'android'])) {
              dispatch(setAppForceUpdate.trigger(data[Platform.OS === 'ios' ? 'ios' : 'android']));
            }
          });
      });

    // Stop listening for updates when no longer required
    return () => database().ref(Config.FB_DB_META_DATA_REF).off('value', onMetaDataChange);
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    if (!isEmpty(notificationPayload)) {
      let payload = notificationPayload?.payload;

      console.log({ payload });

      dispatch(markReadNotification.trigger({ id: payload?.id }));
    }
  }, [notificationPayload]);

  return (
    <>
      <NetworkInfo netInfo={netInfo} handleRequest={handleRequest} />
      {/* <Loader isLoading={isLoading || promiseInProgress} /> */}
      <Loader isLoading={isLoading} />
      {errorMessageInfo?.isVisible ? (
        <CustomModal modalVisible={errorMessageInfo?.isVisible} onRequestClose={closeErrorPopup}>
          <>
            <CustomImage
              image={Images.infoIcon}
              imageWidth={60}
              imageHeight={60}
              imageResizeMode={'contain'}
              displayLoader={false}
              containerStyling={{ paddingVertical: RfH(25) }}
            />
            <CustomText
              fontSize={20}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(22),
                top: -RfH(10)
              }}>
              {errorMessageInfo?.title || ''}
            </CustomText>
            <CustomText
              fontSize={14}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(22),
                paddingHorizontal: RfW(40),
                textAlign: 'center'
              }}>
              {errorMessageInfo?.description || ''}
            </CustomText>

            <View style={{ marginTop: RfH(22), width: '100%' }}>
              <AppPrimaryButton
                buttonText={localize('common.tryAgainC')}
                onPress={pressedErrorPopupButton}
              />
            </View>
          </>
        </CustomModal>
      ) : null}
      {props.children}
    </>
  );
}

export default MainContainer;
