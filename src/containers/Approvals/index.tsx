import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApprovalRequestModal, HeaderSVG } from '../../components';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH, RfW, getUserConfigData } from '../../utils/helpers';
import {
  getApprovalFeatureModulesSelector,
  getFeatureModuleDataSelector
} from '../Home/redux/selectors';
import {
  getApprovalTasksCountLoadingSelector,
  getApprovalTasksCountSelector
} from './redux/selectors';

import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import ApprovalRequestGridItem from '../../components/ApprovalRequestGridItem';
import CustomPopupModal from '../../components/CustomPopupModal';
import { ApprovalsGridSkeleton } from '../../components/SkeletonLoader';
import WrapperContainer from '../../components/WrapperContainer';
import { localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors } from '../../theme';
import YouDontHaveAccessModal from '../Home/components/YouDontHaveAccessModal';
import { getApprovalFeatureModules } from '../Home/redux/actions';
import { getMyProfileDetailsSelector } from '../LoginHome/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import SearchSubCatApprovalModal from './SearchSubCatApprovalModal';
import { getApprovalTasksCount } from './redux/actions';
import { getTaskCountByModule } from './serializer';
import styles from './styles';

const stateSelector = createStructuredSelector({
  approvalFeatureModulesData: getApprovalFeatureModulesSelector,
  approvalTasksCountData: getApprovalTasksCountSelector,
  approvalTasksCountDataLoading: getApprovalTasksCountLoadingSelector,
  isDarkMode: isDarkModeSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  featureModuleData: getFeatureModuleDataSelector
});

function Approvals() {
  const navigation = useNavigation();
  const {
    approvalFeatureModulesData,
    approvalTasksCountData,
    approvalTasksCountDataLoading,
    isDarkMode,
    myProfileDetails,
    featureModuleData
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [modules, setModules] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [approvalRequestModal, setApprovalRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);
  const [isShowDontAccessModal, setisShowDontAccessModal] = useState(false);
  const isFocused = useIsFocused();

  const redirectToApprovalListing = (item) => {
    trackEvent(EVENT_NAME.PRESSED_APPROVALS_ + item?.name);
    setTimeout(() => {
      setApprovalRequestModal(false);
    }, 300);

    navigation.navigate(NavigationRouteNames.APPROVALS_LISTING, {
      module: item,
      approvalType: selectedItem?.feature,
      redirectToExternalUrl: selectedItem?.redirectToExternalUrl
    });
  };

  useEffect(() => {
    if (isFocused) {
      if (isEmpty(approvalFeatureModulesData)) {
        dispatch(getApprovalFeatureModules.trigger());
      }
      dispatch(getApprovalTasksCount.trigger());
    }
  }, [isFocused]);

  const navigateToDetailScreen = (item) => {
    try {
      setApprovalRequestModal(false);
      navigation.navigate(NavigationRouteNames.APPROVALS_DETAILS, {
        approvalItem: item,
        module: item,
        fromNotification: false,
        isButtonDisable: false
      });
    } catch (error) {
      // handleError(error);
    }
  };

  const handleClick = (item) => {
    trackEvent(EVENT_NAME.PRESSED_APPROVALS_ + item?.name);

    try {
      if (item?.isLive) {
        if (!isEmpty(item.subModules)) {
          setSelectedItem(item);
          setApprovalRequestModal(true);
        } else if (item?.name === 'IT') {
          setisShowDontAccessModal(true);
        } else {
          redirectToApprovalListing(item);
        }
      } else {
        setisShowComingSoonModal(true);
      }
    } catch (error) {
      // handleError(error);
    }
  };

  const mainSection = () => {
    if (approvalFeatureModulesData === undefined) {
      return <ApprovalsGridSkeleton isHideHeader={true} />;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <FlatList
          key={'_'}
          columnWrapperStyle={{ marginTop: RfH(20) }}
          data={
            approvalFeatureModulesData?.length > 0
              ? approvalFeatureModulesData
                  ?.filter(
                    (item) =>
                      item?.isActive &&
                      getUserConfigData(
                        myProfileDetails?.config?.config,
                        item?.feature,
                        featureModuleData
                      )
                  )
                  ?.slice()
                  ?.sort((a, b) => a.order - b.order)
              : []
          }
          numColumns={3}
          renderItem={({ item }) => (
            <View style={{ width: Dimensions.get('window').width / 3 }}>
              {/* FIXME: USE <ApprovalTiles /> */}
              <ApprovalRequestGridItem
                onPress={() => handleClick(item)}
                icon={item?.iconUrl}
                badgeCount={getTaskCountByModule(item?.feature, approvalTasksCountData)}
                text={item?.name}
                iconHeight={RfH(32)}
                iconWidth={RfH(32)}
                loading={false}
                customTextstyle={{ width: RfW(80) }}
              />
            </View>
          )}
          style={{ marginTop: RfH(15) }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={{ height: Platform.OS === 'ios' ? RfH(50) : RfH(100) }} />
          }
          overScrollMode={'never'}
        />
      </View>
    );
  };

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
          isBackButtonVisible={false}
          titleText={localize('home.approvals')}
          titleFont={20}
          titleStyle={{ marginLeft: -RfW(70) }}
        />

        {mainSection()}

        {searchModal && (
          <SearchSubCatApprovalModal
            isVisible={searchModal}
            openModal={() => setSearchModal(false)}
            onClick={(item) => {
              redirectToApprovalListing(item);
              setTimeout(() => {
                setSearchModal(false);
              }, 300);
            }}
            // modules={searchOriginalApprovalList(fetchapprovalFeatureModulesData())}
          />
        )}

        {approvalRequestModal && (
          <ApprovalRequestModal
            isVisible={approvalRequestModal}
            onRequestClose={() => setApprovalRequestModal(false)}
            module={selectedItem}
            onClick={(item) => redirectToApprovalListing(item)}
          />
        )}

        {isShowComingSoonModal && (
          <CustomPopupModal
            isVisible={isShowComingSoonModal}
            messageInfo={{ title: localize('common.ComingSoon'), description: '' }}
            pressedPopupButton={() => setisShowComingSoonModal(false)}
            buttonText={localize('common.okay')}
          />
        )}

        {isShowDontAccessModal && (
          <YouDontHaveAccessModal
            isVisible={isShowDontAccessModal}
            onRequestClose={() => setisShowDontAccessModal(false)}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
}

export default Approvals;
