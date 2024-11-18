import React, { useEffect, useRef } from 'react';
import { AppState, Platform, SafeAreaView, View } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getIsForceUpdateSelector,
  getIsUnderMaintenanceSelector
} from '../../appContainer/redux/selectors';
import { CustomText, IconButtonWrapper } from '../../components';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import AppPrimaryOutLineButton from '../../components/AppPrimaryOutLineButton';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images, WIDTH } from '../../theme';
import { openLinkInBrowser } from '../../utils/helper';
import { RfH } from '../../utils/helpers';
import { getPublicStaticDataSelector } from '../redux/selectors';
import styles from './styles';
import { isEmpty } from 'lodash';
import { getPublicStaticData } from '../redux/actions';

const APP_STORE_LINKS = {
    android: 'https://play.google.com/store/apps/details?id=com.cenomione.oca',
    ios: 'https://apps.apple.com/us/app/cenomi-one/id6470200926'
  };

const stateSelector = createStructuredSelector({
  isAppForceUpdate: getIsForceUpdateSelector,
  isAppUnderMaintenance: getIsUnderMaintenanceSelector, // app version info from api
  publicStaticData: getPublicStaticDataSelector
});

// app version info from api

function AppUpdate() {
  const appState = useRef(AppState.currentState);
  const { isAppForceUpdate, isAppUnderMaintenance, publicStaticData } = useSelector(stateSelector);

  const dispatch = useDispatch();

  const _handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // if (appMetadata[Platform.OS].is_app_under_maintenance) {
      // dispatch(getAppMetaData.trigger());
      // const appMetaResponse = await getAppMetaDataFromAzureBlob();
      // Not required, as we are listening to metadata in MainContainer
      // database().ref(env.META_DATA_REF).once('value').then(snapshot => {
      //     console.log('[Firebase]: MetaData --> ', snapshot.val());
      //     dispatch(getAppMetaData.success({ data: snapshot.val()?.data || {} }));
      // });
      // }
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    isEmpty(publicStaticData) && dispatch(getPublicStaticData.trigger());
  }, []);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      appStateSubscription.remove();
    };
  }, []);
  const handleClose = () => {
    RNExitApp.exitApp();
  };

  const goForUpdate = () =>
    openLinkInBrowser(
      Platform.OS === 'ios' ? APP_STORE_LINKS.ios : APP_STORE_LINKS.android
    );

  const renderForceUpdate = (headerText, subText, btnText, btnText2) => (
    <View style={styles.container}>
      {renderCenterContent(headerText, subText)}
      <View style={styles.bottomBtnContainer}>
        <AppPrimaryButton buttonText={localize(btnText).toUpperCase()} onPress={goForUpdate} />
        <View style={{ marginTop: RfH(16) }}>
          <AppPrimaryOutLineButton
            height={RfH(48)}
            buttonText={localize(btnText2).toUpperCase()}
            onPress={() => {
              handleClose();
            }}
          />
        </View>
      </View>
    </View>
  );

  const renderCenterContent = (headerText, subText) => (
    <View style={styles.noBookingView}>
      <IconButtonWrapper
        iconImage={Images.appMaintanence}
        iconHeight={WIDTH.W60}
        iconWidth={WIDTH.W60}
      />
      <CustomText
        fontSize={20}
        styling={{
          paddingTop: RfH(20),
          lineHeight: 30,
          textAlign: 'center',
          ...CommonStyles.regularFont500Style
        }}
        color={Colors.app_black}>
        {localize(headerText)}
      </CustomText>
      <CustomText
        fontSize={14}
        color={Colors.app_black}
        styling={{
          paddingTop: RfH(20),
          lineHeight: 20,
          textAlign: 'center',
          ...CommonStyles.regularFont400Style
        }}>
        {localize(subText)}
      </CustomText>
    </View>
  );
  const renderAppMaintenance = (headerText, subText, btnText) => (
    <View style={styles.container}>
      {renderCenterContent(headerText, subText)}
      <View style={styles.bottomBtnContainer}>
        <AppPrimaryButton
          buttonText={localize(btnText).toUpperCase()}
          onPress={() => {
            handleClose();
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isAppUnderMaintenance?.is_under_maintenance &&
        renderAppMaintenance(
          isAppUnderMaintenance?.title || 'common.maintenanceTitle',
          isAppUnderMaintenance?.content || 'common.maintenanceMessage',
          'common.okay'
        )}
      {!isAppUnderMaintenance?.is_under_maintenance &&
        isAppForceUpdate?.force_update?.is_force_update &&
        renderForceUpdate(
          isAppForceUpdate?.force_update?.title || 'common.forceUpdateTitle',
          isAppForceUpdate?.force_update?.content || 'common.forceUpdateMessage',
          'common.updateNow',
          'common.closeApp'
        )}
    </SafeAreaView>
  );
}

export default AppUpdate;
