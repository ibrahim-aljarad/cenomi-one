import DeviceInfo from 'react-native-device-info';
import { localize } from '../../../locale/utils';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Images } from '../../../theme';
import { Platform } from 'react-native';

export const profileMenu = () => {
  return [
    {
      name: localize('profile.manageBiometric'),
      icon: Images.Fingerprint,
      routeName: '',
      ArrowListingicon: 'biometric'
    },
    {
      name: localize('common.terms&Conditions'),
      icon: Images.profileTermcondition,
      routeName: 'termsAndCondition',
      ArrowListingicon: Images.arrowRight
    },
    {
      name: localize('common.privacyPolicy'),
      icon: Images.ProfilePrivacyPolicy,
      routeName: 'privacyPolicy',
      ArrowListingicon: Images.arrowRight
    }
  ];
};

export const appSettingsMenu = () => {
  let data = [
    {
      name: localize('profile.syncProfile'),
      icon: Images.notificationsProfile,
      routeName: NavigationRouteNames.SYNC_PROFILE,
      ArrowListingicon: Images.arrowRight
    }
  ];

  if (Platform.OS === 'ios' || (Platform.OS === 'android' && DeviceInfo.getSystemVersion() > 13)) {
    data = [
      ...data,
      {
        name: localize('profile.notificationSettings'),
        icon: Images.notificationsProfile,
        routeName: NavigationRouteNames.NOTIFICATIONSSETTINGS,
        ArrowListingicon: Images.arrowRight
      }
    ];
  }
  return data;
};
export const fetchspecificationUploadList = () => {
  return [
    {
      title: localize('imageSpecification.title1')
    },
    {
      title: localize('imageSpecification.title2')
    },
    {
      title: localize('imageSpecification.title3')
    },
    {
      title: localize('imageSpecification.title4')
    },
    {
      title: localize('imageSpecification.title5')
    }
  ];
};
