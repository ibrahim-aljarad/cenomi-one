import DeviceInfo from 'react-native-device-info';
import { isRTL, localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Images } from '../../theme';
import { Platform } from 'react-native';
import Config from '../../utils/config';

export const profileMenu = () => {
  const isRtl = isRTL();
  return [
    {
      name: localize('profile.manageBiometric'),
      icon: Images.Fingerprint,
      routeName: '',
      usedFor: 'biometric'
    },
    // {
    //   name: localize('profile.changeLanguage'),
    //   icon: Images.profileTermcondition,
    //   routeName: NavigationRouteNames.CHANGELANGUAGE,
    // },
    {
      name: localize('common.terms&Conditions'),
      icon: Images.profileTermcondition,
      routeName: 'termsAndCondition'
    },
    {
      name: localize('common.privacyPolicy'),
      icon: Images.ProfilePrivacyPolicy,
      routeName: 'privacyPolicy'
    },
    {
      name: localize('profile.appSettings'),
      icon: Images.appSettings,
      routeName: NavigationRouteNames.APPSSETTINGS
    },
    {
      name: localize('profile.faq'),
      icon: Images.Profilefaq,
      routeName: NavigationRouteNames.FAQ
    }
  ];
};

export const appSettingsMenu = () => {
  const isRtl = isRTL();
  let data = [
    {
      name: localize('profile.chooseTheme'),
      icon: Images.theme_profile,
      routeName: NavigationRouteNames.CHANGE_THEME
    },
    {
      name: localize('profile.syncProfile'),
      icon: Images.syncProfile,
      routeName: NavigationRouteNames.SYNC_PROFILE
    },
    {
      name: localize('profile.changeLanguage'),
      icon: Images.languageChange,
      routeName: NavigationRouteNames.CHANGELANGUAGE
    }
  ];

  // if (__DEV__) {
  // if (Config.DEV_MODE) {
  //   data = [
  //     ...data,
  //     {
  //       name: localize('profile.changeLanguage'),
  //       icon: Images.languageChange,
  //       routeName: NavigationRouteNames.CHANGELANGUAGE
  //     }
  //   ];
  // }

  if (Platform.OS === 'ios' || (Platform.OS === 'android' && DeviceInfo.getSystemVersion() > 13)) {
    data = [
      ...data,
      {
        name: localize('profile.notificationSettings'),
        icon: Images.notificationsProfile,
        routeName: NavigationRouteNames.NOTIFICATIONSSETTINGS
      }
    ];
  }

  data = [
    ...data,
    {
      name: localize('common.logoutAll'),
      icon: Images.logout,
      routeName: localize('common.logoutAll')
    }
  ];

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
