import * as PushNotification from 'react-native-push-notification';

import { Colors, CommonStyles, Images } from '../../../../theme';
import { CustomImage, CustomText } from '../../../../components';
import { EVENT_NAME, trackEvent } from '../../../../utils/analytics';
import { Platform, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { RfH, RfW, getProfilePicInfo } from '../../../../utils/helpers';
// import NavigationRouteNames from '../../../../../routes/ScreenNames';
import { useDispatch, useSelector } from 'react-redux';

import COLORS from '../../../../theme/colors';
import CustomBadge from '../../../../components/CustomBadge';
import HomeHeaderSkeleton from '../../../../components/SkeletonLoader/HomeHeaderSkeleton';
import NavigationRouteNames from '../../../../routes/ScreenNames';
import NotificationBell from '../../../../components/SVG/notificationBell';
import ProfileCardIconSVG from '../../../../components/SVG/profileCardIconSVG';
import ProfileImageSection from '../ProfileImageSection';
import { createStructuredSelector } from 'reselect';
import { getColorWithOpacity } from '../../../../utils/helper';
import { getNotification } from '../../../Notifications/redux/actions';
import { getNotificationSelector } from '../../../Notifications/redux/selectors';
import { getUnreadNotificationCountSelector } from '../../redux/selectors';
import { isDarkModeSelector } from '../../../redux/selectors';
import { isEmpty } from 'lodash';
import { localize } from '../../../../locale/utils';
import { setNotificationCount } from '../../redux/actions';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import CustomBlurView from '../../../../components/CustomBlurView';

const stateStructure = createStructuredSelector({
  notification: getNotificationSelector,
  isDarkMode: isDarkModeSelector,
  unreadNotificationCount: getUnreadNotificationCountSelector
});
export function HomeMainHeader(props: any): JSX.Element {
  const { profileData, isForRewards } = props;
  const navigation = useNavigation();
  const size = 20;
  const { notification, isDarkMode, unreadNotificationCount } = useSelector(stateStructure);

  const dispatch = useDispatch();

  const { userName } = getProfilePicInfo(profileData) || {};

  useEffect(() => {
    PushNotification.setApplicationIconBadgeNumber(unreadNotificationCount || 0);
  }, [unreadNotificationCount]);

  const onClickProfileCardQR = () => {
    trackEvent(EVENT_NAME.PRESSED_DIGICARD_IOCN);
    navigation.navigate(NavigationRouteNames.DIGITAL_CARD as never);
  };
  const onClickProfile = () => {
    trackEvent(EVENT_NAME.PRESSED_PROFILE_IOCN);
    navigation.navigate(NavigationRouteNames.PROFILE as never);
  };
  const onClickNotification = () => {
    trackEvent(EVENT_NAME.PRESSED_NOTIFICATION_IOCN);
    navigation.navigate(NavigationRouteNames.NOTIFICATIONS as never);
  };

  useEffect(() => {
    if (!isEmpty(notification)) {
      dispatch(
        // setNotificationCount.trigger(
        //   notification?.unreadCount
        //     ? notification?.unreadCount?.length > 0
        //       ? notification?.unreadCount
        //       : 0
        //     : 0
        // )

        setNotificationCount.trigger(notification?.unreadCount > 0 ? notification?.unreadCount : 0)
      );
    }
  }, [notification]);
  useEffect(() => {
    dispatch(getNotification.trigger({ page: 1, size }));
  }, []);

  const mainSection = () => {
    if (!isEmpty(profileData)) {
      return (
        <>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={onClickProfile}>
              <View style={styles.leftIconContainer}>
                <ProfileImageSection
                  imageSize={RfH(48)}
                  labelFontSize={18}
                  isForRewards={isForRewards}
                />

                <CustomImage
                  imageWidth={RfW(11)}
                  imageHeight={RfH(11)}
                  image={Images.homeProfileIcon}
                  imageResizeMode={'contain'}
                  tintColor={Colors.darkPurple}
                  containerStyling={{
                    borderRadius: RfH(8),
                    overflow: 'hidden',
                    backgroundColor: COLORS.white,
                    position: 'absolute',
                    left: RfH(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    bottom: RfH(0),
                    width: RfW(15),
                    height: RfW(15)
                  }}
                />

                <CustomImage
                  image={Images.cenomiBorder}
                  imageHeight={RfH(60)}
                  imageWidth={RfH(60)}
                  styling={{ position: 'absolute', top: -RfH(54), left: -RfH(30) }}
                  tintColor={Colors.white}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <View style={styles.headerSubTextContainer}>
                <CustomText
                  numberOfLines={1}
                  fontSize={16}
                  color={Colors.white}
                  fontWeight={'400'}
                  styling={CommonStyles.regularFontStyle}>
                  {localize('common.hi') + ', '}
                </CustomText>
                <CustomText
                  // numberOfLines={1}
                  fontSize={16}
                  fontWeight={'500'}
                  color={Colors.white}
                  styling={{
                    ...CommonStyles.semiboldFontStyle,
                    paddingTop: RfH(Platform.OS === 'ios' ? 4 : 0)
                  }}>
                  {userName ?? 'Guest'}
                </CustomText>
              </View>
            </View>
          </View>

          <View
            style={{
              ...styles.rightContainer2
              // backgroundColor: Colors.white
            }}>
            <TouchableOpacity style={styles.employeeCardIcon} onPress={onClickProfileCardQR}>
              <ProfileCardIconSVG isDarkMode={isDarkMode} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon} onPress={onClickNotification}>
              <View
                style={{
                  marginRight: unreadNotificationCount > 0 ? RfH(12) : 0
                }}>
                <NotificationBell isDarkMode={isDarkMode} />
              </View>
              <View style={{ position: 'absolute', left: RfH(9), top: 0 }}>
                <CustomBadge
                  loading={unreadNotificationCount === undefined}
                  count={unreadNotificationCount}
                  backgroundColor={Colors.darkPurple}
                />
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    return <HomeHeaderSkeleton isDarkMode={isDarkMode} />;
  };

  return (
    <View
      style={{
        ...styles.headerContainer,
        backgroundColor: isDarkMode
          ? Colors.darkModeBackground
          : getColorWithOpacity(Colors.midnightExpress, 0.24)
      }}>
      {mainSection()}
    </View>
  );
}

// export default HomeMainHeader;
