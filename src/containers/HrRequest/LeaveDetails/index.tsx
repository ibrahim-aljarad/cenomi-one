import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { FlatList, Platform, SafeAreaView, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomText, HeaderSVG } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import TotalBalanceCardSkeleton from '../../../components/SkeletonLoader/TotalBalanceCardSkeleton';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, CommonStyles } from '../../../theme';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { RfH, RfW } from '../../../utils/helper';
import { isDarkModeSelector } from '../../redux/selectors';
import LeaveBalanceCard from '../components/LeaveBalanceCard';
import RecentlyAppliedListItems from '../components/RecentlyAppliedListItems';
import TotalBalanceCard from '../components/TotalBalanceCard';
import {
  getAbsenseBalance,
  getAbsenseData,
  getAbsenseReasons,
  getAbsenseType
} from '../redux/actions';
import {
  applyLeaveSuccessDataSelector,
  getAbsenseBalanceSelector,
  getAbsenseDataSelector,
  getAbsenseTypeListSelector
} from '../redux/selectors';
import styles from './styles';
import {
  LabelSkeleton,
  LeavebalanceCardSkeleton,
  PrimaryButtonSkeleton
} from '../../../components/SkeletonLoader';
import RecentAppliedLeaveSkeleton from '../../../components/SkeletonLoader/RecentAppliedLeaveSkeleton';
import { localize } from '../../../locale/utils';
import LeaveSummaryCard from '../components/LeaveSummaryCard';
import WrapperContainer from '../../../components/WrapperContainer';

const stateStructure = createStructuredSelector({
  absenseBalance: getAbsenseBalanceSelector,
  absenseData: getAbsenseDataSelector,
  applyLeaveSuccessData: applyLeaveSuccessDataSelector,
  isDarkMode: isDarkModeSelector,
  absenseTypeList: getAbsenseTypeListSelector
});

const LeaveDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { absenseBalance, absenseData, applyLeaveSuccessData, isDarkMode, absenseTypeList } =
    useSelector(stateStructure);
  const isFocused = useIsFocused();

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPLY_LEAVE);
    dispatch(getAbsenseBalance.trigger({ isSilentCall: true }));
    dispatch(getAbsenseData.trigger({ isSilentCall: true }));

    dispatch(getAbsenseType.trigger());
    dispatch(getAbsenseReasons.trigger());
  }, []);

  useEffect(() => {
    if (!isEmpty(applyLeaveSuccessData)) {
      dispatch(getAbsenseBalance.trigger({ isSilentCall: true }));
      dispatch(getAbsenseData.trigger({ isSilentCall: true }));
    }
  }, [applyLeaveSuccessData]);

  const applyButtonSection = () => {
    if (absenseTypeList === undefined) {
      return <PrimaryButtonSkeleton isDarkMode={isDarkMode} />;
    } else if (absenseTypeList?.length > 0) {
      return (
        <AppPrimaryButton
          buttonText={localize('hrRequest.applyLeaveC')}
          onPress={() => {
            trackEvent(EVENT_NAME.PRESSED_APPLY_LEAVE);
            navigation.navigate(NavigationRouteNames.APPLYLEAVE as never);
          }}
        />
      );
    }

    return null;
  };

  const absenseBalanceSection = () => {
    if (absenseBalance === undefined) {
      return <TotalBalanceCardSkeleton isDarkMode={isDarkMode} />;
    } else if (absenseBalance?.length > 0) {
      return (
        <TotalBalanceCard
          absenseBalance={absenseBalance}
          isDarkMode={isDarkMode}
          onApplyLeave={() => {
            trackEvent(EVENT_NAME.PRESSED_APPLY_LEAVE);
            navigation.navigate(NavigationRouteNames.APPLYLEAVE as never);
          }}
        />
      );
    }
    return null;
  };

  const leaveBalanceCardSection = () => {
    if (absenseBalance === undefined) {
      return <LeavebalanceCardSkeleton isDarkMode={isDarkMode} />;
    } else if (absenseBalance?.length > 0) {
      return <LeaveBalanceCard absenseBalance={absenseBalance} />;
    }
    return null;
  };

  const leaveSummaryCardSection = () => {
    if (absenseBalance === undefined) {
      return <LeavebalanceCardSkeleton isDarkMode={isDarkMode} />;
    } else if (absenseBalance?.length > 0) {
      return <LeaveSummaryCard absenseBalance={absenseBalance} />;
    }
    return null;
  };

  const renderHeader = () => {
    return (
      <View>
        {leaveSummaryCardSection()}
        {absenseBalanceSection()}

        <View
          style={{
            paddingTop: RfH(27),
            alignItems: 'center',
            paddingHorizontal: RfW(24)
          }}>
          <View
            style={{
              flex: 1,
              marginVertical: RfH(30),
              width: RfW(319)
            }}>
            {applyButtonSection()}
          </View>
          {/* <SkeletonPlaceholder
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(319)}
              height={RfH(54)}
              alignItems="center"
              justifyContent="center"
            />
          </SkeletonPlaceholder> */}
        </View>
        {leaveBalanceCardSection()}

        {absenseData === undefined ? (
          <>
            <LabelSkeleton
              containerStyle={{ paddingHorizontal: RfW(24), marginTop: RfH(40) }}
              isDarkMode={isDarkMode}
            />
            <RecentAppliedLeaveSkeleton isDarkMode={isDarkMode} />
          </>
        ) : (
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              paddingHorizontal: RfW(24),
              marginTop: RfH(40)
            }}>
            {localize('hrRequest.recentlyApplied')}
          </CustomText>
        )}
      </View>
    );
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
          isBackButtonVisible={true}
          titleText={localize('leave.leaveApply')}
          titleFont={20}
          onBackPressHandler={() => navigation.goBack()}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader()}
            data={absenseData || []}
            renderItem={({ item }) => (
              <View style={{ width: '100%' }}>
                <RecentlyAppliedListItems leaveItem={item} onPress={() => {}} />
              </View>
            )}
            ListFooterComponent={
              <>
                {absenseData && absenseData?.length === 0 ? (
                  <CustomText
                    fontSize={14}
                    styling={{
                      ...CommonStyles.regularFont400Style,
                      color: isDarkMode ? Colors.white : Colors.ButtonGrey,
                      lineHeight: RfH(22),
                      paddingLeft: RfW(24),
                      paddingTop: RfH(6)
                    }}>
                    {localize('leave.youHavntAppliedLeave')}
                  </CustomText>
                ) : null}
                <View style={{ height: Platform.OS === 'ios' ? RfH(50) : RfH(100) }} />
              </>
            }
            overScrollMode={'never'}
          />
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default LeaveDetails;
