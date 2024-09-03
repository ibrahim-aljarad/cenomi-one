import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, getColorWithOpacity, getDateFormat, getTimeFormat } from '../../utils/helper';
import { RfW } from '../../utils/helpers';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { getItem } from '../../utils/storage';
import { LANGUAGE_KEY } from '../../utils/constants';
import { localize } from '../../locale/utils';

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomDatePicker = (props: any) => {
  const {
    isShowMonthYear = false,
    isMandatory = true,
    label,
    onPressDate,
    placeholder,
    selectedDate,
    children,
    isDisabled = false,
    containerStyle = {},
    ...restProps
  } = props;

  const { isDarkMode } = useSelector(stateStructure);

  const [date, setDate] = useState(selectedDate || new Date());
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    if (getItem(LANGUAGE_KEY) === 'en_US') {
      setSelectedLanguage('en');
    } else {
      setSelectedLanguage(getItem(LANGUAGE_KEY));
    }
  }, [getItem(LANGUAGE_KEY)]);

  const valueSection = () => {
    if (selectedDate) {
      if (restProps?.mode === 'time') {
        return selectedDate;
      }
      return '' + getDateFormat('' + selectedDate);
    }
    return placeholder;
  };

  return (
    <>
      {children ? (
        <TouchableOpacity
          onPress={() => {
            if (!isDisabled) {
              setOpen(true);
            }
          }}>
          {children}
        </TouchableOpacity>
      ) : (
        <View style={{ marginHorizontal: RfW(24), marginTop: RfH(19) }}>
          <CustomText
            fontSize={12}
            color={getColorWithOpacity(Colors.white, 0.6)}
            styling={{
              ...CommonStyles.regularFont400Style
            }}>
            {isMandatory ? '*' : ''}
            {label}
          </CustomText>

          <TouchableOpacity
            onPress={() => {
              if (!isDisabled) {
                setOpen(true);
              }
            }}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                },
                dateStyles.mainview
              ]}>
              <CustomText
                fontSize={14}
                color={
                  selectedDate
                    ? isDarkMode
                      ? Colors.white
                      : Colors.white
                    : getColorWithOpacity(Colors.white, 0.8)
                }
                styling={{
                  ...CommonStyles.regularFont400Style
                }}>
                {valueSection()}
              </CustomText>
              <CustomImage
                image={Images.calendarGrey}
                imageWidth={14}
                imageHeight={16}
                tintColor={Colors.white}
                imageResizeMode={'contain'}
                displayLoader={false}
                containerStyling={{}}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <DatePicker
        modal
        mode={'date'}
        open={open}
        date={date}
        locale={selectedLanguage || ''}
        title={localize('form.selectDate')}
        confirmText={localize('common.confirm')}
        onConfirm={(date) => {
          setDate(date);
          setOpen(false);
          onPressDate('' + date);
        }}
        cancelText={localize('common.cancel')}
        onCancel={() => {
          setOpen(false);
        }}
        {...restProps}
      />
    </>
  );
};

export default CustomDatePicker;
const dateStyles = StyleSheet.create({
  mainview: {
    height: 40,
    borderBottomWidth: 1,

    borderColor: Colors.grayLight
  },
  dropdownCard: {
    marginTop: 5,
    height: 64,
    backgroundColor: 'white',
    borderRadius: BorderRadius.BR0,
    padding: 12,
    shadowColor: Colors.hexBlack,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16
  },
  placeholderStyle: {
    fontSize: 14,
    color: Colors.grayTwo
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.app_black
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});
