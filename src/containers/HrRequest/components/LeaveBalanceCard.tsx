import React from 'react';
import { View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helpers';
import styles from '../styles';
import { isEmpty } from 'lodash';
import { BorderRadius } from '../../../theme/sizes';
import { createStructuredSelector } from 'reselect';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getColorWithOpacity, precisionRound } from '../../../utils/helper';
import { isDarkModeSelector } from '../../redux/selectors';
import { localize } from '../../../locale/utils';

const stateStructure = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector
});

const LeaveBalanceCard = (props: any) => {
  const { absenseBalance } = props || {};
  const { myProfileDetails, isDarkMode } = useSelector(stateStructure);
  const {
    organization: {
      config: { leavePeriod: { startDate: leaveStartDate, endDate: leaveEndDate } = {} } = {}
    } = {}
  } = myProfileDetails || {};

  //picking only leavebalances with type day (D or C)
  const leaveStartAndEndDate = absenseBalance?.find(
    (data) => data?.planUnitOfMeasure === 'D' || data?.planUnitOfMeasure === 'C'
  );

  const leaveBalanceDataSection = () => {
    if (!isEmpty(absenseBalance)) {
      return absenseBalance?.map((item, index) => {
        const balanceObj = item?.summary?.find((data) => data?.transactionTypeName === 'Balance');

        let totalLeave = 0.0;
        let totalBalanceLeave = 0.0;

        const carryoverObj = item?.summary?.filter(
          (item) =>
            item?.transactionTypeName === 'Carryover' ||
            item?.transactionTypeName === 'Periodic accrual' ||
            item?.transactionTypeName === 'Adjustment'
        );

        carryoverObj?.map((obj) => {
          totalLeave += parseFloat(obj?.value);
        });

        totalBalanceLeave += parseFloat(balanceObj?.value);

        return (
          <View
            style={
              absenseBalance?.length - 1 !== index
                ? {
                    flexDirection: 'row',
                    borderBottomColor: Colors.grayBorder,
                    borderBottomWidth: 1
                  }
                : { flexDirection: 'row' }
            }>
            <View style={styles.leaveBalLeftView}>
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {item?.planName || ''}
              </CustomText>
            </View>
            <View style={styles.leaveBalRightView}>
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {totalBalanceLeave
                  ? precisionRound(parseFloat(totalBalanceLeave), 2).toFixed(2)
                  : 0}{' '}
                {item?.unitOfMeasureMeaning}
              </CustomText>
            </View>
            {/* <View style={styles.leaveBalRightView}>
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.white : Colors.app_black}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {totalLeave ? precisionRound(parseFloat(totalLeave), 2).toFixed(2) : 0}{' '}
                {item?.unitOfMeasureMeaning}
              </CustomText>
            </View> */}
          </View>
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeButton
            : getColorWithOpacity(Colors.midnightExpress, 0.24),
          marginHorizontal: RfW(24),
          marginTop: RfW(13),
          borderRadius: BorderRadius.BR15,
          paddingTop: RfH(14)
        }
      ]}>
      <CustomText
        fontSize={20}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={{
          marginLeft: RfW(21),
          lineHeight: RfH(22),
          ...CommonStyles.regularFont500Style
        }}>
        {localize('hrRequest.leaveBalance')}
      </CustomText>
      <CustomText
        fontSize={12}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={{
          marginLeft: RfW(21),
          lineHeight: RfH(22),
          ...CommonStyles.regularFont400Style
        }}>
        {/* coming form organisation api */}
        {/* {'01-Mar-2022 to 31-Mar-2023'} */}
        {`${
          (leaveStartAndEndDate?.planPeriodStartDate &&
            moment(leaveStartAndEndDate?.planPeriodStartDate).format('DD-MMM-YYYY')) ||
          leaveStartDate ||
          ''
        } to ${
          (leaveStartAndEndDate?.planPeriodEndDate &&
            moment(leaveStartAndEndDate?.planPeriodEndDate).format('DD-MMM-YYYY')) ||
          leaveEndDate ||
          ''
        }`}
      </CustomText>
      <View
        style={{
          borderColor: Colors.grayBorder,
          borderWidth: 1,
          borderRadius: BorderRadius.BR0,
          margin: RfW(11)
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.grayBorder,
            borderBottomWidth: 1
          }}>
          <View style={styles.leaveBalLeftView}>
            <CustomText
              fontSize={14}
              color={isDarkMode ? Colors.white : Colors.white}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(22)
              }}>
              {localize('hrRequest.leaveType')}
            </CustomText>
          </View>
          <View style={styles.leaveBalRightView}>
            <CustomText
              fontSize={14}
              color={isDarkMode ? Colors.white : Colors.white}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(22)
              }}>
              {localize('hrRequest.balance')}
            </CustomText>
          </View>
          {/* <View style={styles.leaveBalRightView}>
            <CustomText
              fontSize={14}
              color={isDarkMode ? Colors.white : Colors.app_black}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(22)
              }}>
              {localize('hrRequest.total')}
            </CustomText>
          </View> */}
        </View>
        {leaveBalanceDataSection()}
      </View>
      <CustomText
        fontSize={14}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={{
          paddingLeft: RfW(21.5),
          paddingBottom: RfW(16),
          lineHeight: RfH(22),
          ...CommonStyles.regularFont400Style
        }}>
        {/* {'The above amount will be credited to your account.'} */}
        {''}
      </CustomText>
    </View>
  );
};

export default LeaveBalanceCard;
