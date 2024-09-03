import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import * as PushNotification from 'react-native-push-notification';
import { Shadow } from 'react-native-shadow-2';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomModalWebView, CustomText, HeaderSVG } from '../../../components';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import CustomSwitch from '../../../components/CustomSwitch';
import { localize } from '../../../locale/utils';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, CommonStyles, Images } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import Config from '../../../utils/config';
import { APP_VERSION, BUILD_NUMBER, LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import {
  RfH,
  RfW,
  alertBox,
  deviceWidth,
  getSaveData,
  removeData,
  storeData
} from '../../../utils/helpers';
import CallCenterPopup from '../../LoginHome/components/CallCenterPopup';
import { doLogout } from '../../LoginHome/redux/actions';
import {
  getMyProfileDetailsSelector,
  isLoggedOutDoneSelector
} from '../../LoginHome/redux/selectors';
import { getPublicStaticDataSelector, isDarkModeSelector } from '../../redux/selectors';
import EditProfileImage from './EditProfileImage';
import { profileMenu } from './serializer';
import { deleteRewardsAccount } from './redux/actions';

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isLoggedOutDone: isLoggedOutDoneSelector,
  publicStaticData: getPublicStaticDataSelector,
  isDarkMode: isDarkModeSelector
});

const rnBiometrics = new ReactNativeBiometrics();

function RewardsProfile({}): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { myProfileData, isLoggedOutDone, publicStaticData, isDarkMode } =
    useSelector(stateSelector);

  const [profileMenus, setProfileMenus] = useState([]);
  const [webViewModalInfo, setWebViewModalInfo] = useState({
    isVisible: false,
    url: '',
    title: ''
  });
  const [isSensorAvailable, setSensorAvailable] = useState(false);
  const [biometricSwitch, setBiometricSwitch] = useState(false);
  const [isPressedLogout, setIsPressedLogout] = useState(false);
  const [callCenterVisible, setCallCenterVisible] = useState(false);

  const {
    profile: {
      displayName
      // emails,
      // workRelationships
      // phones,
      // firstName,
      // middleName,
      // lastName
    } = {}
  } = myProfileData || {};

  const isGuestUser = myProfileData?.username === `guest.user@cenomi.com`;

  const setBiometricOptionEnable = () => {
    setSensorAvailable(true);
    getSaveData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then(async (isBioEnabled) => {
      if (isBioEnabled) {
        const isBioData = JSON.parse(isBioEnabled);
        setBiometricSwitch(isBioData);
      }
    });
  };

  useEffect(() => {
    if (isLoggedOutDone && isPressedLogout) {
      setIsPressedLogout(false);
      PushNotification.setApplicationIconBadgeNumber(0);
    }
  }, [isLoggedOutDone]);

  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((d) => {
        console.log(d);
      });
    });
  }, []);

  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME).then((data) => {
      if (JSON.parse(data) === true) {
        rnBiometrics.isSensorAvailable().then((resultObject) => {
          const { available, biometryType } = resultObject;
          if (available && biometryType === BiometryTypes.TouchID) {
            console.log('TouchID is supported');
            setBiometricOptionEnable();
          } else if (available && biometryType === BiometryTypes.FaceID) {
            setBiometricOptionEnable();
            console.log('FaceID is supported');
          } else if (available && biometryType === BiometryTypes.Biometrics) {
            setBiometricOptionEnable();
            console.log('Biometrics is supported');
          } else {
            setSensorAvailable(false);
            console.log('Biometrics not supported');
          }
        });
      } else {
        setBiometricSwitch(false);
        setSensorAvailable(false);
      }
    });
  }, []);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_PROFILE);
    setProfileMenus(profileMenu());
  }, [myProfileData]);

  const handleLogout = () => {
    alertBox(localize('common.logout'), localize('common.wantToLogout'), {
      positiveText: localize('common.logout'),
      negativeText: localize('common.cancel'),
      onPositiveClick: () => {
        setIsPressedLogout(true);
        trackEvent(EVENT_NAME.PRESSED_LOGOUT);
        dispatch(doLogout.trigger());
      }
    });
  };

  const handleDeleteAccount = () => {
    // setCallCenterVisible(true);
    alertBox(localize('common.delete'), localize('common.areYouSureDeleteAccount'), {
      negativeText: localize('common.delete'),
      positiveText: localize('common.cancel'),
      onNegativeClick: () => {
        dispatch(deleteRewardsAccount.trigger());
      }
    });
  };

  const pleaseEnableBiometric = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: localize('biometric.confirmFingerPrint') })
      .then((resultObject) => {
        const { success } = resultObject;
        console.log('handleEnadleBiometric', resultObject);
        if (success) {
          console.log('successful biometrics provided');
          storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, true);
          setBiometricSwitch(true);
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const onBiometricEnableHandler = (value: boolean) => {
    if (value) {
      pleaseEnableBiometric();
    } else {
      alertBox(localize('profile.biometric'), localize('profile.areSureWantRemove'), {
        positiveText: localize('common.yes'),
        negativeText: localize('common.no'),
        onPositiveClick: () => {
          removeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then(() => {
            setBiometricSwitch(false);
            // setBiometricPopup(false);
          });
        },
        cancelable: true
      });
    }
  };

  const renderOCAContainer = () => (
    <View style={styles.ocaView}>
      <View
        style={{
          marginTop: RfH(28),
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <EditProfileImage />
        <View style={{ flex: 1, marginLeft: RfW(10) }}>
          <CustomText
            fontSize={16}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              marginTop: RfH(20),
              ...CommonStyles.regularFont500Style
            }}>
            {displayName || '-'}
          </CustomText>
        </View>
      </View>

      <CustomText
        fontSize={12}
        color={Colors.white}
        styling={{
          lineHeight: RfH(20),
          marginTop: RfH(15),
          paddingBottom: RfH(Platform.OS === 'ios' ? 38 : 0),
          textAlign: 'center',
          ...CommonStyles.regularFont400Style
        }}>
        {myProfileData?.organization?.website}
      </CustomText>
    </View>
  );

  const onClickItems = (routesName) => {
    if (routesName === '-') {
      return '-';
    }

    if (routesName === 'termsAndCondition') {
      trackEvent(EVENT_NAME.PRESSED_TERMS_AND_CONDITIONS_FROM_PROFILE);
      setWebViewModalInfo({
        isVisible: true,
        url: Config.TERMS_AND_CONDITION || '',
        title: 'Terms and condition'
      });
    } else if (routesName === 'privacyPolicy') {
      trackEvent(EVENT_NAME.PRESSED_PRIVACY_POLICY_FROM_PROFILE);
      setWebViewModalInfo({
        isVisible: true,
        url: Config.PRIVACY_POLICY || '',
        title: 'Privacy policy'
      });
    } else {
      if (routesName === NavigationRouteNames.FAQ) {
        trackEvent(EVENT_NAME.PRESSED_FAQ_FROM_PROFILE);
      }
      if (routesName === NavigationRouteNames.APPSSETTINGS) {
        trackEvent(EVENT_NAME.PRESSED_APPS_SETTINGS_FROM_PROFILE);
      }
      navigation.navigate(routesName as never);
    }
  };
  const renderCard = () => (
    <ScrollView
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: RfW(24) }}>
      <View
        style={{
          flex: 1,
          marginTop: RfH(15)
        }}>
        <ImageBackground
          style={{
            width: '100%',
            overflow: 'hidden'
          }}
          source={Images.profileCardBg}
          resizeMode={'cover'}
          imageStyle={{
            // borderRadius: RfH(12),
            width: deviceWidth(),
            height: 230,
            overflow: 'hidden',
            left: -RfW(24)
          }}>
          {renderOCAContainer()}
        </ImageBackground>
        <View
          style={{
            alignItems: 'center',
            marginTop: RfH(20)
          }}>
          {profileMenus.map((element, index) => {
            return (
              <TouchableOpacity
                disabled={isEmpty(element.routeName)}
                style={[
                  styles.rowContainer,
                  CommonStyles.card_elevation_t,
                  index === 0 ? { marginVertical: 0, marginBottom: RfH(6) } : null,
                  { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white }
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  onClickItems(element.routeName);
                }}>
                <Shadow
                  startColor={Colors.lightModeShadow}
                  offset={[0, RfH(5)]}
                  paintInside={true}
                  style={{ width: '100%' }}
                  containerStyle={{}}>
                  <View style={styles.iconbg}>
                    <CustomImage
                      image={element.icon}
                      imageWidth={RfW(20)}
                      imageHeight={RfH(25)}
                      imageResizeMode={'contain'}
                      displayLoader={false}
                      styling={{
                        overflow: 'hidden'
                      }}
                    />
                  </View>
                </Shadow>

                <CustomText
                  fontSize={16}
                  color={Colors.black}
                  numberOfLines={2}
                  styling={{
                    flex: 1,
                    paddingLeft: RfW(10),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {element.name}
                </CustomText>

                {element.ArrowListingicon === 'biometric' ? (
                  <CustomSwitch
                    disabled={!isSensorAvailable}
                    onValueChange={onBiometricEnableHandler}
                    value={biometricSwitch}
                  />
                ) : (
                  <CustomImage
                    image={element.ArrowListingicon}
                    imageWidth={RfW(11)}
                    imageHeight={RfH(17)}
                    imageResizeMode={'contain'}
                    displayLoader={false}
                    styling={{
                      overflow: 'hidden'
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ paddingTop: RfH(40) }}>{renderLogoutRow()}</View>
        <View style={{ paddingTop: RfH(20) }}>{!isGuestUser ? renderDeleteAccount() : null}</View>
      </View>
    </ScrollView>
  );

  const renderDeleteAccount = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: RfH(20)
      }}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          handleDeleteAccount();
        }}>
        <CustomText
          fontSize={14}
          color={Colors.app_black}
          styling={CommonStyles.regularFont400Style}>
          {localize('profile.deleteAccount')}
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  const renderLogoutRow = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // marginBottom: RfH(20)
      }}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          if (isGuestUser) {
            dispatch(doLogout.trigger());
          } else {
            handleLogout();
          }
        }}>
        <CustomText
          fontSize={16}
          color={Colors.primary}
          styling={{ ...CommonStyles.regularFont400Style }}>
          {isGuestUser ? `Login` : `Logout`}
        </CustomText>
      </TouchableOpacity>
      <CustomText fontSize={14} color={Colors.app_black} styling={CommonStyles.regularFont400Style}>
        {/* {localize('profile.app_ver') + ' ' + APP_VERSION} */}
        {`v${APP_VERSION} (${BUILD_NUMBER})`}
      </CustomText>
    </View>
  );
  return (
    <SafeAreaView
      style={{
        ...styles.mainContainer,
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
      }}>
      <View
        style={{
          flex: 1,
          paddingTop: RfH(Platform.OS === 'android' ? 10 : 0),
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
        }}>
        <HeaderSVG
          isRightButtonVisible={true}
          isBackButtonVisible={true}
          titleText={localize('profile.profile')}
          titleFont={20}
          onRightButtonClickHandler={() => {}}
          onBackPressHandler={() => navigation.goBack()}
          // isRight2BtnVisible={true}
          onRight2BtnClick={() => {}}
        />
        {!isEmpty(myProfileData) ? renderCard() : <></>}
      </View>

      {webViewModalInfo?.isVisible && (
        <CustomModalWebView
          headerText={webViewModalInfo?.title}
          rightButtonVisible={true}
          backButtonHandler={() => setWebViewModalInfo({ isVisible: false, url: '', title: '' })}
          onLoadComplete={() => {}}
          modalVisible={webViewModalInfo?.isVisible}
          url={webViewModalInfo?.url}
        />
      )}

      <CustomBottomSheet
        title={''}
        rightIconWidth={RfH(14)}
        rightIconHeight={RfH(14)}
        isVisible={callCenterVisible}
        onRequestClose={() => setCallCenterVisible(false)}>
        <CallCenterPopup
          isDarkMode={isDarkMode}
          onPressGoit={() => setCallCenterVisible(false)}
          sourceFrom={'deleteAccount'}
        />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  ocaView: {
    // paddingLeft: RfW(16),
    // paddingVertical: RfH(16),
    // paddingRight: RfW(12),
    padding: RfW(15)
  },
  updatePictureView: {
    position: 'absolute',
    right: RfH(-10),
    bottom: RfH(-10),
    padding: RfH(10)
  },
  rowContainer: {
    backgroundColor: Colors.white,
    height: RfH(64),
    flexDirection: 'row',
    flex: 1,
    borderRadius: BorderRadius.BR0,
    marginVertical: RfH(6),
    marginHorizontal: RfH(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: RfW(16),
    paddingLeft: RfW(8)
  },
  share_container: {
    width: '48%',
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center',
    height: RfH(41),
    flexDirection: 'row'
  },
  iconbg: {
    backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RewardsProfile;
