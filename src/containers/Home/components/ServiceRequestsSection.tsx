import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText } from '../../../components';
import CustomPopupModal from '../../../components/CustomPopupModal';
import { HrRequestSkeleton } from '../../../components/SkeletonLoader';
import { localize } from '../../../locale/utils';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { RfH, RfW, getUserConfigData, openExternalUrl } from '../../../utils/helpers';
import { isDarkModeSelector } from '../../redux/selectors';
import { getFeatureModuleDataSelector, getServiceRequestSelector } from '../redux/selectors';
import HeaderCateRow from './HeaderCateRow';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
import { CONFIG_CONSTANT } from '../../../utils/constants';
type ServiceRequestsSectionProps = {};
const stateSelector = createStructuredSelector({
  serviceRequestData: getServiceRequestSelector,
  isDarkMode: isDarkModeSelector,
  myProfileData: getMyProfileDetailsSelector,
  featureModuleData: getFeatureModuleDataSelector
});
export function ServiceRequestsSection(props: ServiceRequestsSectionProps): JSX.Element {
  const navigation = useNavigation();
  const { serviceRequestData, isDarkMode, myProfileData, featureModuleData } =
    useSelector(stateSelector);
  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);

  const onPressOnItem = (item) => {
    trackEvent(EVENT_NAME.PRESSED_HRREQUESTS_FROM_HOME);

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

  if (serviceRequestData === undefined) {
    return <HrRequestSkeleton isDarkMode={isDarkMode} />;
  }

  const mainSection = () => {
    return (
      <>
        <HeaderCateRow
          categoryName={localize('home.hrRequests')}
          showSeeAll={false}
          onClickSeeAll={() => {
            navigation.navigate(NavigationRouteNames.HR_REQUEST as never);
          }}
        />
        <ScrollView
          horizontal={true}
          overScrollMode={'never'}
          showsHorizontalScrollIndicator={false}>
          <FlatList
            bounces={false}
            data={serviceRequestData[0]?.subModules}
            numColumns={2}
            style={[
              {
                marginTop: RfH(10)
              },
              CommonStyles.marginHorizontal_default
            ]}
            contentContainerStyle={{ paddingHorizontal: RfW(10) }}
            renderItem={({ item }) => (
              // <Shadow
              //   startColor={isDarkMode ? Colors.darkModeShadow : Colors.lightModeShadow}
              //   offset={[0, RfH(5)]}
              //   paintInside={true}
              //   style={{
              //     borderRadius: BorderRadius.BR0
              //   }}
              //   containerStyle={{
              //     marginHorizontal: RfW(6),
              //     marginBottom: RfH(15),
              //     marginTop: RfW(5)
              //   }}>
              <TouchableOpacity
                onPress={() => onPressOnItem(item)}
                key={item.id}
                style={{
                  marginHorizontal: RfW(6),
                  marginBottom: RfH(15),
                  marginTop: RfW(5)
                }}
                activeOpacity={0.9}>
                <View
                  style={[
                    styles.serviceRequestsSectionContainerImage,
                    {
                      flexDirection: 'row',
                      backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white
                    }
                  ]}>
                  <View
                    style={{
                      height: RfH(44),
                      width: RfH(44),
                      borderRadius: BorderRadius.BR10,
                      backgroundColor: Colors.darkPurple,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <CustomImage
                      imageHeight={RfH(24)}
                      imageWidth={RfH(24)}
                      image={item?.iconUrl}
                      imageResizeMode={'contain'}
                      tintColor={isDarkMode ? Colors.white : Colors.white}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      width: RfW(88)
                    }}>
                    <CustomText
                      color={isDarkMode ? Colors.white : Colors.darkPurple}
                      fontSize={14}
                      numberOfLines={2}
                      styling={{
                        paddingHorizontal: RfH(10),
                        ...CommonStyles.regularFont500Style,
                        lineHeight: RfH(16.8)
                      }}>
                      {item?.name}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
              // </Shadow>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          {isShowComingSoonModal && (
            <CustomPopupModal
              isVisible={isShowComingSoonModal}
              messageInfo={{ title: localize('common.ComingSoon'), description: '' }}
              pressedPopupButton={() => setisShowComingSoonModal(false)}
              buttonText={localize('common.okay')}
            />
          )}
        </ScrollView>
      </>
    );
  };

  if (
    getUserConfigData(
      myProfileData?.config?.config,
      CONFIG_CONSTANT?.SERVICE_REQUEST_HR,
      featureModuleData
    )
  ) {
    return (
      // <LinearGradient
      //   style={{
      //     paddingTop: RfH(15),
      //     paddingBottom: RfH(13)
      //   }}
      //   locations={[0.1, 1]}
      //   colors={
      //     isDarkMode
      //       ? [Colors.darkModeBackground, Colors.darkModeBackground]
      //       : [Colors.primaryContainerColor, Colors.primaryContainerColor]
      //   }>
      //   {mainSection()}
      // </LinearGradient>
      <View
        style={{
          paddingTop: RfH(15),
          paddingBottom: RfH(13)
        }}>
        {mainSection()}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  serviceRequestsSectionContainerImage: {
    borderRadius: BorderRadius.BR10,
    paddingHorizontal: RfW(9),

    paddingVertical: RfH(8),
    alignItems: 'center',
    width: RfW(154),
    height: RfW(64)
  }
});
