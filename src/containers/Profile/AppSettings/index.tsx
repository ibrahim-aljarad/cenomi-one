import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, HeaderSVG } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helper';
import { doLogoutAll, getMyProfile } from '../../LoginHome/redux/actions';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
// import styles from '../../Notifications/styles';
// import styles from '../styles';
import { userConfigUpdate } from '../redux/actions';
import { isUserConfigUpdateSelector } from '../redux/selectors';
import { Shadow } from 'react-native-shadow-2';
import { appSettingsMenu } from '../serializer';
import { BorderRadius } from '../../../theme/sizes';
import { isDarkModeSelector } from '../../redux/selectors';
import { getSaveData, storeData } from '../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import { localize } from '../../../locale/utils';
import MenuListComponent from '../MenuListComponent';
import WrapperContainer from '../../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
  isUserConfigUpdate: isUserConfigUpdateSelector,
  isDarkMode: isDarkModeSelector
});

const AppSettings = () => {
  const navigation = useNavigation();
  const { myProfileDetails, isUserConfigUpdate, isDarkMode } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isApiTrigger, setIsApiTrigger] = useState(false);
  const [themeInfo, setThemeInfo] = useState({ isDark: false, isEnableSetting: false });

  const toggleSwitch = () => {
    setIsApiTrigger(true);
    setIsEnabled(!isEnabled);
    const data = {
      notificationEnabled: !isEnabled
    };
    dispatch(userConfigUpdate.trigger({ data }));
  };

  useEffect(() => {
    if (isFocused) {
      getSaveData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS).then((res) => {
        if (res) {
          const { isDark, isEnableDeviceSettings } = JSON.parse(res);
          // setIsEnabledDeviceSettings(isEnableDeviceSettings);
          // setIsDarkEnable(isDark);
          setThemeInfo({ isDark, isEnableSetting: isEnableDeviceSettings });
        } else {
          storeData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS, {
            isDark: false,
            isEnableDeviceSettings: false
          });
        }
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isUserConfigUpdate && isApiTrigger) {
      setIsApiTrigger(false);
      dispatch(getMyProfile.trigger());
    }
  }, [isUserConfigUpdate]);

  useEffect(() => {
    if (!isEmpty(myProfileDetails)) {
      const { config } = myProfileDetails || {};
      setIsEnabled(config ? config?.notificationEnabled : false);
    }
  }, [myProfileDetails]);

  const onClickItems = (routesName) => {
    if (routesName === '') {
      return '';
    }

    if (routesName === localize('common.logoutAll')) {
      console.log('logout all...');
      dispatch(doLogoutAll.trigger());

      return;
    }

    navigation.navigate(routesName as never, { isDarkMode, themeInfo });
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
            titleText={localize('profile.appSettings')}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => navigation.goBack()}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
            }}>
            <View style={{ paddingHorizontal: RfW(24), paddingTop: RfH(25) }}>
              {appSettingsMenu().map((element, index) => {
                return (
                  // <TouchableOpacity
                  //   disabled={isEmpty(element.routeName)}
                  //   style={[
                  //     styles.rowContainer,
                  //     { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white },
                  //     CommonStyles.card_elevation_t,
                  //     index === 0 ? { marginVertical: 0, marginBottom: RfH(6) } : null
                  //   ]}
                  //   activeOpacity={0.8}
                  //   onPress={() => {
                  //     onClickItems(element.routeName);
                  //   }}>
                  //   <Shadow
                  //     // startColor={isDarkMode ? Colors.darkModeShadow : Colors.lightModeShadow}
                  //     startColor={isDarkMode ? Colors.darkModeButton : Colors.white}
                  //     // offset={[0, RfH(5)]}
                  //     paintInside={true}
                  //     style={{ width: '100%' }}
                  //     containerStyle={{}}>
                  //     <View style={styles.iconbg}>
                  //       <CustomImage
                  //         image={element.icon}
                  //         imageWidth={RfW(30)}
                  //         imageHeight={RfW(30)}
                  //         imageResizeMode={'contain'}
                  //         displayLoader={false}
                  //         styling={{
                  //           overflow: 'hidden'
                  //         }}
                  //         // tintColor={}
                  //       />
                  //     </View>
                  //   </Shadow>

                  //   <CustomText
                  //     fontSize={16}
                  //     color={Colors.black}
                  //     numberOfLines={2}
                  //     styling={{
                  //       flex: 1,
                  //       marginLeft: RfW(10),
                  //       ...CommonStyles.regularFont400Style
                  //     }}>
                  //     {element.name}
                  //   </CustomText>

                  //   <CustomImage
                  //     image={element.ArrowListingicon}
                  //     imageWidth={RfW(11)}
                  //     imageHeight={RfH(17)}
                  //     imageResizeMode={'contain'}
                  //     displayLoader={false}
                  //     styling={{
                  //       overflow: 'hidden'
                  //     }}
                  //     tintColor={isDarkMode ? Colors.white : Colors.black}
                  //   />
                  // </TouchableOpacity>
                  <MenuListComponent element={element} onClickItems={onClickItems} />
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

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
    // flex: 1,
    borderRadius: BorderRadius.BR0,
    marginVertical: RfH(7),
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
    // backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AppSettings;
