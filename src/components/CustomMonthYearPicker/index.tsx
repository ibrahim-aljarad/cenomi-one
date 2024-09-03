import React, { useCallback, useState, useEffect } from 'react';
import MonthPicker from 'react-native-month-year-picker';
import { SafeAreaView } from 'react-native';
import { getItem } from '../../utils/storage';
import { LANGUAGE_KEY } from '../../utils/constants';
import { localize } from '../../locale/utils';

const CustomMonthYearPicker = (props: any) => {
  const { isShow, onPressDate, date, ...restProps } = props || {};

  const onValueChange = useCallback(
    (_, newDate) => {
      if (newDate) {
        const selectedDate = newDate || date;
        onPressDate('' + selectedDate);
      } else [onPressDate('')];
    },
    [date, isShow]
  );

  return (
    <SafeAreaView>
      {isShow ? (
        <MonthPicker
          mode={'short'}
          locale={getItem(LANGUAGE_KEY) === 'ar' ? 'ar' : 'en'}
          okButton={localize('common.confirm')}
          cancelButton={localize('common.cancel')}
          onChange={onValueChange}
          value={date}
          {...restProps}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default CustomMonthYearPicker;
