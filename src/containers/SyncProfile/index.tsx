import { useIsFocused, useNavigation } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomText, LoaderSmall } from '../../components';
import CustomImage from '../../components/CustomImage';
import { localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors, CommonStyles, Images } from '../../theme';
import { LOTTIE_JSON_FILES } from '../../utils/constants';
import { RfH, RfW, clearAllExceptTutorialShowAppLanguage } from '../../utils/helper';
import { alertBox } from '../../utils/helpers';
import { doLogout, getMyProfile } from '../LoginHome/redux/actions';
import { getMyProfileDetailsSelector } from '../LoginHome/redux/selectors';
import { getNotification } from '../Notifications/redux/actions';
import {
  markOnboarded,
  syncProfile,
  updateMarkOnboardedFlag,
  updateSyncProfileFlag
} from '../redux/actions';
import {
  getIsMarkOnboardedSelector,
  getSyncProfileCompletedSelector,
  isDarkModeSelector
} from '../redux/selectors';

const stateSelector = createStructuredSelector({
  // selectors
  syncProfileCompleted: getSyncProfileCompletedSelector,
  isMarkOnboarded: getIsMarkOnboardedSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector
});

function SyncProfile(props: any) {
  const { route: { params: { firstTime = false } = {} } = {} } = props || {};
  const { syncProfileCompleted, isMarkOnboarded, myProfileDetails, isDarkMode } =
    useSelector(stateSelector);
  const [isTriggerMeApi, setIsTriggerMeApi] = useState(false);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isEmpty(myProfileDetails) && isTriggerMeApi) {
      setIsTriggerMeApi(false);
      navigation.navigate(NavigationRouteNames.HOME_TAB as never);
    }
  }, [myProfileDetails]);

  useEffect(() => {
    if (isMarkOnboarded) {
      dispatch(updateMarkOnboardedFlag.trigger());
      setIsTriggerMeApi(true);
      dispatch(getMyProfile.trigger());
    }
  }, [isMarkOnboarded]);

  useEffect(() => {
    if (syncProfileCompleted?.isCompleted) {
      dispatch(updateSyncProfileFlag.trigger());

      if (syncProfileCompleted?.statusCode === 200) {
        if (firstTime) {
          dispatch(markOnboarded.trigger());
        } else {
          dispatch(getNotification.trigger({ page: 1, size: 20 }));
          navigation.goBack();
        }
      } else {
        if (firstTime) {
          alertBox(localize('profile.firstSyncFailedTitle'), localize('profile.firstSyncFailed'), {
            cancelable: false,
            positiveText: localize('common.ok'),
            onPositiveClick: () => {
              clearAllExceptTutorialShowAppLanguage(true);
              dispatch(doLogout.trigger());
            }
          });
        } else {
          alertBox(localize('profile.syncFailed'), '', {
            cancelable: false,
            positiveText: localize('common.ok'),
            onPositiveClick: () => navigation.goBack()
          });
        }
      }
    }
  }, [syncProfileCompleted]);

  useEffect(() => {
    if (isFocused) {
      // call api
      dispatch(syncProfile.trigger({ firstTime: true }));
    }
  }, [isFocused]);

  return (
    <View
      style={[
        styles.splashContainer,
        { backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white }
      ]}>
      <CustomImage
        image={Images.clientLogo}
        imageHeight={200}
        imageWidth={106}
        tintColor={isDarkMode ? Colors.white : Colors.app_black}
      />

      <View style={{ position: 'absolute', top: RfH(611) }}>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(20),
            textAlign: 'center'
          }}>
          {firstTime ? localize('profile.firtTimeMsg') : localize('profile.syncYourProfile')}
        </CustomText>
        <LoaderSmall
          customSource={
            isDarkMode ? LOTTIE_JSON_FILES.loaderDarkModeJson : LOTTIE_JSON_FILES.loaderJson
          }
          styling={{
            alignSelf: 'center',
            height: RfW(80),
            width: RfW(80)
          }}
          isLoading={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SyncProfile;
