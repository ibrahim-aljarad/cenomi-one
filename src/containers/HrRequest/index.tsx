import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, FlatList, Platform, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { HeaderSVG } from '../../components';
import ApprovalRequestGridItem from '../../components/ApprovalRequestGridItem';
import { localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors } from '../../theme';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH, RfW } from '../../utils/helper';
import { getFeatureModuleDataSelector, getServiceRequestSelector } from '../Home/redux/selectors';
import styles from './styles';
import { ApprovalsGridSkeleton } from '../../components/SkeletonLoader';
import { alertBox, getUserConfigData, openExternalUrl } from '../../utils/helpers';
import { isDarkModeSelector } from '../redux/selectors';
import CustomPopupModal from '../../components/CustomPopupModal';
import { CONFIG_CONSTANT } from '../../utils/constants';
import { getMyProfileDetailsSelector } from '../LoginHome/redux/selectors';
import WrapperContainer from '../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  serviceRequestData: getServiceRequestSelector,
  isDarkMode: isDarkModeSelector,
  myProfileData: getMyProfileDetailsSelector,
  featureModuleData: getFeatureModuleDataSelector
});

const HrRequest = () => {
  const navigation = useNavigation();
  const { serviceRequestData, isDarkMode, myProfileData, featureModuleData } =
    useSelector(stateSelector);
  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);

  const handleItemClick = (item) => {
    trackEvent(EVENT_NAME.PRESSED_HR + item?.name);

    if (serviceRequestData[0]?.isLive) {
      let routeName = '';

      if (item?.isLive) {
        if (item?.name === 'Payslip') {
          routeName = NavigationRouteNames.PAYSLIPDETAILS;
        } else if (item?.name === 'Apply Leave') {
          routeName = NavigationRouteNames.LEAVEDETAILS;
        } else if (item?.name === 'Education Fees') {
          // routeName = NavigationRouteNames.EDUCATIONCLAIMDETAILS;
        } else if (item?.name === 'IT Helpdesk') {
          openExternalUrl(item?.externalURL);
        }
      } else {
        setisShowComingSoonModal(true);
      }

      if (routeName) {
        navigation.navigate(routeName as never);
      }
    } else {
      setisShowComingSoonModal(true);
    }
  };

  const rendrHrRequestItem = ({ item }) => {
    return (
      <View style={{ width: Dimensions.get('window').width / 3 }}>
        <ApprovalRequestGridItem
          onPress={() => {
            handleItemClick(item);
          }}
          icon={item?.iconUrl}
          text={item.name}
          iconHeight={RfH(32)}
          iconWidth={RfH(32)}
          loading={false}
          customTextstyle={{ width: RfW(72) }}
        />
      </View>
    );
  };

  const mainSection = () => {
    if (serviceRequestData === undefined) {
      return <ApprovalsGridSkeleton isHideHeader={true} />;
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <FlatList
            columnWrapperStyle={{ marginTop: RfH(20) }}
            data={
              serviceRequestData?.length > 0
                ? serviceRequestData[0]?.subModules?.length > 0
                  ? serviceRequestData[0]?.subModules?.sort((a, b) => a.order - b.order)
                  : []
                : []
            }
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            renderItem={rendrHrRequestItem}
            style={{ marginTop: RfH(15) }}
            // scrollEnabled={modules.length > 20}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={{ height: Platform.OS === 'ios' ? RfH(50) : RfH(100) }} />
            }
            overScrollMode={'never'}
          />
        </View>
      );
    }
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }
        ]}>
        <HeaderSVG
          isBackButtonVisible={false}
          titleText={localize('home.hrRequests')}
          titleFont={20}
          titleStyle={{ marginLeft: -RfW(70) }}
        />
        {getUserConfigData(
          myProfileData?.config?.config,
          CONFIG_CONSTANT?.SERVICE_REQUEST_HR,
          featureModuleData
        )
          ? mainSection()
          : null}

        {isShowComingSoonModal && (
          <CustomPopupModal
            isVisible={isShowComingSoonModal}
            messageInfo={{ title: localize('common.ComingSoon'), description: '' }}
            pressedPopupButton={() => setisShowComingSoonModal(false)}
            buttonText={localize('common.okay')}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default HrRequest;
