import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomText, HeaderSVG, Loader } from '../../components';
import { localize } from '../../locale/utils';
import { Colors } from '../../theme';
import Config from '../../utils/config';
import { IntegrationTypeEnum } from '../../utils/constants';
import { getOrganizationInfo } from '../LoginHome/redux/actions';
import {
  getMyProfileDetailsSelector,
  getOrganizationDetailsSelector
} from '../LoginHome/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import styles from './styles';
import WrapperContainer from '../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  myProfileData: getMyProfileDetailsSelector,
  organizationDetails: getOrganizationDetailsSelector
});
const Analytics = () => {
  const navigation = useNavigation();
  const { isDarkMode, myProfileData, organizationDetails } = useSelector(stateSelector);
  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);

  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizationInfo.trigger({ organizationId: myProfileData?.organizationId }));
  }, []);

  useEffect(() => {
    if (!isEmpty(organizationDetails?.externalIntegrations)) {
      const { externalIntegrations } = organizationDetails || {};

      const filteredItem =
        externalIntegrations?.length > 0
          ? externalIntegrations?.find((item) => item?.type === IntegrationTypeEnum?.POWERBI)
          : {};

      let _url =
        Config.WEBSITE_BASEURL +
        `/powerbi?client_id=${filteredItem?.config?.client_id}&workspace_id=${filteredItem?.config?.workspace_id}&report_id=${filteredItem?.config?.report_id}`;

      setUrl(_url);
    }
  }, [organizationDetails]);

  return (
    <WrapperContainer isHideExtraPadding={true}>
      <SafeAreaView
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }
        ]}>
        <HeaderSVG
          isBackButtonVisible={true}
          titleText={localize('home.analytics')}
          titleFont={20}
          isRightButtonVisible={true}
          rightIcon={
            <TouchableOpacity
              style={{ alignItems: 'flex-end' }}
              onPress={() => {
                let lastUrl = url;
                setUrl('https://app.powerbi.com/Signout');

                setTimeout(() => {
                  navigation.goBack();
                }, 1000);
              }}>
              <CustomText color={Colors.white}>Signout</CustomText>
            </TouchableOpacity>
          }
        />
        {url && (
          <WebView
            domStorageEnabled={true}
            javaScriptEnabled={true}
            onNavigationStateChange={() => {}}
            renderError={() => {
              // setError(true);
              // onLoadComplete();
            }}
            onLoad={() => {
              // onLoadComplete();
            }}
            renderLoading={() => (
              <Loader isLoading={true} text={localize('components.pleaseWait')} />
            )}
            source={{
              uri: url
            }}
            startInLoadingState={true}
            style={{ backgroundColor: Colors.transparent }}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default Analytics;
