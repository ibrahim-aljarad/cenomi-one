import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appearance, SafeAreaView, Switch, View } from 'react-native';
import { CustomImage, CustomText, HeaderSVG, Loader } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helper';
import styles from '../../Notifications/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setColorTheme } from '../../redux/actions';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../redux/selectors';
import { storeData } from '../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import CustomSwitch from '../../../components/CustomSwitch';
import { localize } from '../../../locale/utils';
import WrapperContainer from '../../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const ChangeTheme = (props: any) => {
  const { isDarkMode } = useSelector(stateSelector);
  const { themeInfo } = props?.route?.params || {};

  const navigation = useNavigation();
  const [isEnabledDeviceSettings, setIsEnabledDeviceSettings] = useState(
    themeInfo?.isEnableSetting || false
  );
  const [isDarkEnable, setIsDarkEnable] = useState(themeInfo?.isDark || false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isEnabledDeviceSettings) {
      dispatch(setColorTheme.trigger({ theme: Appearance.getColorScheme() }));
    } else {
      dispatch(setColorTheme.trigger({ theme: isDarkEnable ? 'dark' : 'light' }));
    }
  }, [isDarkEnable, isEnabledDeviceSettings]);

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
            titleText={localize('profile.chooseTheme')}
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
            <View style={{ marginHorizontal: RfW(24), marginVertical: RfH(25) }}>
              <CustomText
                fontSize={16}
                color={Colors.white}
                styling={{
                  lineHeight: RfH(20),
                  paddingLeft: RfW(4),
                  ...CommonStyles.regularFont400Style
                }}>
                {localize('profile.selectYourTheme')}
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingTop: RfH(25)
                }}>
                <View style={{ alignItems: 'center' }}>
                  <CustomImage
                    image={Images.lightTheme}
                    imageHeight={RfH(84)}
                    imageWidth={RfW(39)}
                  />
                  <CustomText
                    fontSize={14}
                    color={Colors.white}
                    styling={{
                      ...CommonStyles.regularFont400Style,
                      textAlign: 'center',
                      paddingTop: RfH(8),
                      marginBottom: RfH(16)
                    }}>
                    {localize('profile.themeLight')}
                  </CustomText>
                  <CustomImage
                    image={
                      isDarkEnable
                        ? isDarkMode
                          ? Images.checkboxPrimaryInactiveWhite
                          : Images.checkboxPrimaryInactive
                        : Images.checkboxPrimaryActive
                    }
                    imageHeight={RfH(32)}
                    imageWidth={RfH(32)}
                    submitFunction={() => {
                      storeData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS, {
                        isDark: !isDarkEnable,
                        isEnableDeviceSettings: isEnabledDeviceSettings
                      });
                      setIsDarkEnable(!isDarkEnable);
                    }}
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <CustomImage
                    image={Images.darkTheme}
                    imageHeight={RfH(84)}
                    imageWidth={RfW(45)}
                  />
                  <CustomText
                    color={Colors.white}
                    fontSize={14}
                    styling={{
                      ...CommonStyles.regularFont400Style,
                      textAlign: 'center',
                      paddingTop: RfH(8),
                      marginBottom: RfH(16)
                    }}>
                    {localize('profile.themeDark')}
                  </CustomText>
                  <CustomImage
                    image={
                      // isDarkEnable ? Images.checkboxPrimaryActive : Images.checkboxPrimaryInactive
                      isDarkEnable
                        ? Images.checkboxPrimaryActive
                        : isDarkMode
                        ? Images.checkboxPrimaryInactiveWhite
                        : Images.checkboxPrimaryInactiveWhite
                    }
                    imageHeight={RfH(32)}
                    imageWidth={RfH(32)}
                    submitFunction={() => {
                      storeData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS, {
                        isDark: !isDarkEnable,
                        isEnableDeviceSettings: isEnabledDeviceSettings
                      });
                      setIsDarkEnable(!isDarkEnable);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.notification_Settings_con}>
              <CustomText
                fontSize={16}
                color={Colors.white}
                styling={{
                  lineHeight: RfH(20),
                  // paddingLeft: RfW(4),
                  ...CommonStyles.regularFont400Style
                }}>
                {localize('profile.useDeviceSettings')}
              </CustomText>

              <CustomSwitch
                onValueChange={() => {
                  storeData(LOCAL_STORAGE_DATA_KEY.LOCAL_THEME_SETTINGS, {
                    isDark: isDarkEnable,
                    isEnableDeviceSettings: !isEnabledDeviceSettings
                  });
                  setIsEnabledDeviceSettings(!isEnabledDeviceSettings);
                }}
                value={isEnabledDeviceSettings}
              />
            </View>
            <CustomText
              fontSize={16}
              styling={{
                lineHeight: RfH(20),
                paddingHorizontal: RfW(24),
                ...CommonStyles.regularFont400Style,
                color: isDarkMode ? Colors.silverColor : Colors.white
              }}>
              {localize('profile.usesLightDarkDisplaySettings')}
            </CustomText>
          </View>
        </View>
        <Loader isLoading={isLoading} />
      </SafeAreaView>
    </WrapperContainer>
  );
};
export default ChangeTheme;
