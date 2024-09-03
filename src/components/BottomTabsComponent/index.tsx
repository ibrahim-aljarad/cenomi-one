import React, { useCallback, useState } from 'react';
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStructuredSelector } from 'reselect';
import { SCREEN_WIDTH } from '../../constant';
import { doLogout } from '../../containers/LoginHome/redux/actions';
import {
  checkUserDataSelector,
  getMyProfileDetailsSelector
} from '../../containers/LoginHome/redux/selectors';
import { localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { BorderRadius } from '../../theme/sizes';
import { getColorWithOpacity } from '../../utils/helper';
import AppPrimaryButton from '../AppPrimaryButton';
import AppPrimaryOutLineButton from '../AppPrimaryOutLineButton';
import CustomImage from '../CustomImage';
import CustomModal from '../CustomModal';
import CustomText from '../CustomText';
import IconButtonWrapper from '../IconButtonWrapper';

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
  checkUserData: checkUserDataSelector
});

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;

const BottomTabsComponent = ({
  state,
  descriptors,
  navigation,
  isDarkMode,
  showChatGptOption = true
}) => {
  const { myProfileDetails, checkUserData } = useSelector(stateSelector);

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);

  const handleTabPress = useCallback(({ isFocused, routeName }) => {
    if (!isFocused) {
      if (
        routeName === NavigationRouteNames.REWARDS_PROFILE &&
        checkUserData?.username === 'guest.user@cenomi.com'
      ) {
        setIsShowModal(true);
      } else {
        navigation.navigate(routeName);
      }
    }
  }, []);

  return (
    <>
      <View
        style={[
          Styles.container,
          {
            paddingRight: !showChatGptOption ? 0 : RfW(100),
            paddingBottom: insets.bottom || RfH(Platform.OS === 'ios' ? 30 : 0),
            backgroundColor: isDarkMode
              ? Colors.darkModeButton
              : showChatGptOption
              ? getColorWithOpacity(Colors.white, 0.2)
              : Colors.darkModeButton,
            overflow: 'hidden',
            position: 'absolute',
            borderTopLeftRadius: BorderRadius.BR15,
            borderTopRightRadius: BorderRadius.BR15,
            bottom: 0,
            zIndex: 99999
          }
        ]}>
        {state.routes.map((route, index) => {
          const {
            name,
            key: routeKey,
            params: { icon, IconComponent }
          } = route;
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : name;

          const isFocused = state.index === index;

          const iconName = isFocused ? icon.active : icon.inactive;
          return (
            <TouchableOpacity
              key={routeKey}
              accessibilityRole="button"
              testID={options.tabBarTestID}
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() => handleTabPress({ routeName: name, isFocused })}
              style={[
                // Styles.ocaTabStyle,
                Styles.affiliateTabStyle,
                {
                  borderBottomColor: isFocused
                    ? Colors.white
                    : isDarkMode
                    ? Colors.darkModeButton
                    : Colors.transparent,
                  borderBottomWidth: RfH(3)
                }
              ]}>
              {IconComponent ? (
                <IconComponent isFocused={isFocused} />
              ) : (
                <IconButtonWrapper
                  iconImage={iconName}
                  iconWidth={RfW(24)}
                  iconHeight={RfH(24)}
                  styling={{ paddingRight: RfW(5) }}
                />
              )}

              <CustomText
                color={isFocused ? (isDarkMode ? Colors.white : Colors.white) : Colors.white}
                styling={{ ...CommonStyles.regularFontStyle, marginTop: RfH(7) }}
                allowFontScaling={false}
                fontSize={Platform.OS === 'ios' ? 11 : 12}>
                {label}
              </CustomText>
            </TouchableOpacity>
          );
        })}
        {/* </View> */}
        {showChatGptOption && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationRouteNames.BOT_PRESS as never, { modalVisible: true })
            }
            style={{
              height: RfW(0),
              width: RfW(75),
              justifyContent: 'center',
              position: 'absolute',
              right: 25,
              top: 0
            }}>
            <ImageBackground
              source={Images.withoutIcon}
              resizeMode="cover"
              style={{ alignItems: 'center' }}
              imageStyle={{ height: RfH(75), width: RfW(75) }}>
              <CustomImage
                imageResizeMode={'center'}
                image={Images.chat_gpt}
                imageHeight={RfH(60)}
                imageWidth={RfW(60)}
              />
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
      {isShowModal ? (
        // <CustomPopupModal
        //   isVisible={isShowModal}
        //   messageInfo={{ title: localize('common.ComingSoon'), description: '' }}
        //   pressedPopupButton={() => setIsShowModal(false)}
        //   buttonText={localize('common.okay')}
        // />
        <CustomModal modalVisible={isShowModal} onRequestClose={() => setIsShowModal(false)}>
          <>
            {/* <CustomText
              fontSize={20}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(22),
                top: RfH(10)
              }}>
              {'Test'}
            </CustomText> */}

            <View style={{ marginTop: RfH(22), width: '90%' }}>
              <AppPrimaryButton
                buttonText={localize('common.login')}
                onPress={() => {
                  dispatch(doLogout.trigger());
                  setIsShowModal(false);
                }}
              />
            </View>
            <View style={{ marginTop: RfH(22), marginBottom: RfH(12), width: '90%' }}>
              <AppPrimaryOutLineButton
                height={RfH(48)}
                buttonText={localize('common.cancel')}
                onPress={() => setIsShowModal(false)}
              />
            </View>
          </>
        </CustomModal>
      ) : null}
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  ocaTabStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  affiliateTabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RfW(SCREEN_WIDTH / 3) - RfW(30),
    flex: 1,
    paddingVertical: RfH(13)
  }
});

export default BottomTabsComponent;
