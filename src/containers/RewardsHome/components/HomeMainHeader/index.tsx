import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../../components';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { RfH, RfW, getProfilePicInfo, getSaveData } from '../../../../utils/helpers';
import styles from './style';

import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NavigationRouteNames from '../../../../routes/ScreenNames';
import COLORS from '../../../../theme/colors';
import { EVENT_NAME, trackEvent } from '../../../../utils/analytics';
import { getNotificationSelector } from '../../../Notifications/redux/selectors';
import HomeHeaderSkeleton from '../../../../components/SkeletonLoader/HomeHeaderSkeleton';
import Config from '../../../../utils/config';
import { LOCAL_STORAGE_DATA_KEY } from '../../../../utils/constants';
import { isDarkModeSelector } from '../../../redux/selectors';
import { localize } from '../../../../locale/utils';
import ProfileImageSection from '../../../Home/components/ProfileImageSection';
import { checkUserDataSelector } from '../../../LoginHome/redux/selectors';
import CustomModal from '../../../../components/CustomModal';
import AppPrimaryButton from '../../../../components/AppPrimaryButton';
import { doLogout } from '../../../LoginHome/redux/actions';
import AppPrimaryOutLineButton from '../../../../components/AppPrimaryOutLineButton';

const stateStructure = createStructuredSelector({
  notification: getNotificationSelector,
  isDarkMode: isDarkModeSelector,
  checkUserData: checkUserDataSelector
});
export function HomeMainHeader(props: any): JSX.Element {
  const { profileData } = props;
  const navigation = useNavigation();
  const { isDarkMode, checkUserData } = useSelector(stateStructure);
  const dispatch = useDispatch();

  const { profileText, userName } = getProfilePicInfo(profileData) || {};
  const [isShowModal, setIsShowModal] = useState(false);

  const onClickProfile = () => {
    if (checkUserData?.userType === 'guest_user') {
      setIsShowModal(true);
    } else {
      trackEvent(EVENT_NAME.PRESSED_PROFILE_IOCN);
      navigation.navigate(NavigationRouteNames.REWARDS_PROFILE as never);
    }
  };
  const [imagePath, setImagePath] = useState('');
  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN).then((token) =>
      setImagePath(`${Config.API_BASE_URL}user/profile-image?token=${token}`)
    );
  }, []);

  const mainSection = () => {
    if (!isEmpty(profileData)) {
      return (
        <>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={onClickProfile}>
              <View style={styles.leftIconContainer}>
                <ProfileImageSection imageSize={RfH(45)} labelFontSize={18} isForRewards={true} />

                <IconButtonWrapper
                  iconWidth={RfW(11)}
                  iconHeight={RfH(11)}
                  iconImage={Images.homeProfileIcon}
                  imageResizeMode={'contain'}
                  containerStyling={{
                    borderRadius: RfH(9),
                    overflow: 'hidden',
                    backgroundColor: COLORS.primary,
                    position: 'absolute',
                    left: RfH(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    bottom: RfH(-4),
                    width: RfH(17),
                    height: RfH(17)
                  }}
                />

                <CustomImage
                  image={Images.cenomiBorder}
                  imageHeight={RfH(60)}
                  imageWidth={RfH(60)}
                  styling={{ position: 'absolute', top: -RfH(52), left: -RfH(30) }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <View style={styles.headerSubTextContainer}>
                <CustomText
                  numberOfLines={1}
                  fontSize={16}
                  color={isDarkMode ? Colors.white : Colors.app_black}
                  fontWeight={'400'}
                  styling={CommonStyles.regularFontStyle}>
                  {localize('common.hello') + ', '}
                </CustomText>
                <CustomText
                  numberOfLines={1}
                  fontSize={16}
                  fontWeight={'500'}
                  color={isDarkMode ? Colors.white : Colors.app_black}
                  styling={{
                    ...CommonStyles.semiboldFontStyle,
                    paddingTop: RfH(Platform.OS === 'ios' ? 4 : 0)
                  }}>
                  {userName ?? 'Guest'}
                </CustomText>
              </View>
            </View>
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
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
      }}>
      {mainSection()}

      {isShowModal ? (
        <CustomModal modalVisible={isShowModal} onRequestClose={() => setIsShowModal(false)}>
          <>
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
    </View>
  );
}

// export default HomeMainHeader;
