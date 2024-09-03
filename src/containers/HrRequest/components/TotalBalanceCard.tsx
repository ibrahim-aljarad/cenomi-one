import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Images } from '../../../theme';
import { precisionRound } from '../../../utils/helper';
import { RfH, RfW } from '../../../utils/helpers';
import TextCard from './TextCard';
import { localize } from '../../../locale/utils';

const TotalBalanceCard = (props: any) => {
  const { onApplyLeave, absenseBalance, isDarkMode } = props;

  const [totalAndBalanceLeave, setTotalAndBalanceLeave] = useState({
    total: 0.0,
    balance: 0.0
  });

  useEffect(() => {
    if (!isEmpty(absenseBalance)) {
      let totalLeave = 0.0;
      let totalBalanceLeave = 0.0;
      absenseBalance.map((info) => {
        const balanceObj = info?.summary?.find((item) => item?.transactionTypeName === 'Balance');
        const carryoverObj = info?.summary?.filter(
          (item) =>
            item?.transactionTypeName === 'Carryover' ||
            item?.transactionTypeName === 'Periodic accrual' ||
            item?.transactionTypeName === 'Adjustment'
        );

        //picking only leavebalances with type day (D or C)
        if (info?.planUnitOfMeasure === 'D' || info?.planUnitOfMeasure === 'C') {
          carryoverObj?.map((obj) => {
            totalLeave += parseFloat(obj?.value);
          });

          totalBalanceLeave += parseFloat(balanceObj?.value);
        }
      });

      setTotalAndBalanceLeave({ total: totalLeave, balance: totalBalanceLeave });
    }
  }, [absenseBalance]);

  return (
    <View
      style={{
        paddingTop: RfH(27),
        alignItems: 'center',
        paddingHorizontal: RfW(24)
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: RfH(84)
        }}>
        {/* <TextCard
          textTitle={localize('hrRequest.total')}
          textValue={
            totalAndBalanceLeave?.total
              ? precisionRound(totalAndBalanceLeave?.total, 2).toFixed(2)
              : 0
          }
          icon={Images.calendarGrey}
        />
        <View style={{ width: RfW(16) }} /> */}
        <TextCard
          textTitle={localize('hrRequest.balance')}
          textValue={
            totalAndBalanceLeave?.balance
              ? precisionRound(totalAndBalanceLeave?.balance, 2).toFixed(2)
              : 0
          }
          icon={Images.Calendar_Balance}
        />
      </View>
    </View>
  );
};

export default TotalBalanceCard;
