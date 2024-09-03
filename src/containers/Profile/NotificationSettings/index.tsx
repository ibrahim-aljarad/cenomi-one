import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  Linking,
  NativeModules,
  Platform,
  SafeAreaView,
  Switch,
  View
} from 'react-native';
import { checkNotifications } from 'react-native-permissions';
import { CustomText, HeaderSVG, Loader } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import { RfH, RfW } from '../../../utils/helper';
import { alertBox, getSaveData } from '../../../utils/helpers';
import styles from '../../Notifications/styles';
import { NotificationSettingsSkeleton } from '../../../components/SkeletonLoader';
import CustomSwitch from '../../../components/CustomSwitch';
import { localize } from '../../../locale/utils';
import WrapperContainer from '../../../components/WrapperContainer';

const NotificationSetting = (props: any) => {
  const { isDarkMode = false } = props?.route?.params || {};
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTriggerOff, setIsTriggerOff] = useState(false);

  const appState = useRef(AppState?.currentState);

  useEffect(() => {
    const subscrption = AppState?.addEventListener('change', _handleAppStateChange);
    return () => {
      subscrption.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (appState?.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('backgroud  to active mode....');
      checkNotificationStatus();
    } else if (appState?.current?.match(/active/) && nextAppState?.match(/inactive|background/)) {
      console.log('active to background mode....');
    }

    appState.current = nextAppState;
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.sendIntent('android.settings.SETTINGS');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const isFocused = useIsFocused();

  const checkNotificationStatus = () => {
    checkNotifications().then(({ status, settings }) => {
      if (status !== 'granted') {
        alertBox(
          localize('notification.chngNotificationSettings'),
          localize('notification.gotoNotificationSettings'),
          {
            positiveText: localize('common.settings'),
            cancelable: true,
            negativeText: localize('common.cancel'),
            onPositiveClick: () => openSettings(),
            onNegativeClick: () => {
              setIsEnabled(false);
              goBack();
            }
          }
        );
      }
      setIsEnabled(status === 'granted');
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      checkNotificationStatus();
    }
  }, [isFocused]);

  const toggleSwitch = async () => {
    if (isEnabled) {
      setIsEnabled(false);
      setIsTriggerOff(true);
      alertBox(
        localize('notification.notificationSettings'),
        localize('notification.keepThinOnNotification'),
        {
          negativeText: localize('notification.noTurnOff'),
          cancelable: true,
          positiveText: localize('notification.keepItOn'),
          onNegativeClick: () => {
            openSettings();
            setIsTriggerOff(false);
          },
          onPositiveClick: () => {
            setIsTriggerOff(false);
            setIsEnabled(true);
          }
        }
      );
    } else {
      setIsEnabled(true);
      alertBox(
        localize('notification.chngNotificationSettings'),
        localize('notification.gotoNotificationSettings'),
        {
          positiveText: localize('common.settings'),
          cancelable: true,
          negativeText: localize('common.cancel'),
          onPositiveClick: () => openSettings(),
          onNegativeClick: () => {
            setIsEnabled(true);
            goBack();
          }
        }
      );
    }
  };
  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View
          style={{
            flex: 1,
            paddingTop: RfH(10)
          }}>
          <HeaderSVG
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText={localize('profile.notificationSettings')}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={goBack}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
          />

          <View
            style={{
              flex: 1,

              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
            }}>
            {isEnabled || isTriggerOff ? (
              <View style={styles.notification_Settings_con}>
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    lineHeight: RfH(20),
                    paddingLeft: RfW(4),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {localize('profile.pushNotification')}
                </CustomText>
                <CustomSwitch onValueChange={toggleSwitch} value={isEnabled} />
              </View>
            ) : (
              <NotificationSettingsSkeleton />
            )}
          </View>
        </View>
        <Loader isLoading={isLoading} />
      </SafeAreaView>
    </WrapperContainer>
  );
};
export default NotificationSetting;
