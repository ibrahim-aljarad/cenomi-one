import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CustomText } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { RfH, RfW } from '../../../utils/helpers';
import styles from '../styles';
import moment from 'moment';
import { currencyFormat } from '../../../utils/helper';
import { BorderRadius } from '../../../theme/sizes';
import { isEmpty } from 'lodash';
import { deductionsCategoryName, earningsCategoryName, absencesCategoryName } from '../serializer';
import { localize } from '../../../locale/utils';

const PayslipAdvice = (props: any) => {
  const {
    startDate,
    endDate,
    selectedPayslipData,
    list,
    isDarkMode,
    currencyCode,
    containerStyle = {}
  } = props;
  const [modifiedPayslipDetailsData, setModifiedPayslipDetailsData] = useState([]);
  const [deducationsPayslipDetailsData, setDeducationsPayslipDetailsData] = useState([]);
  const [earningsPayslipDetailsData, setEarningsPayslipDetailsData] = useState([]);

  // const [deductionList, setDe]
  useEffect(() => {
    if (!isEmpty(list)) {
      let deductionList = [];
      let earningList = [];
      // ley absencesList=[];
      const sortedData = list
        ?.slice()
        ?.sort((a, b) => a.ReportingName.localeCompare(b.ReportingName));

      sortedData.map((item) => {
        if (item?.Context === 'ORA_PAYSLIP_DEDN_BAL_CAT') {
          // if (deductionsCategoryName.includes(item?.BaseCategoryName)) {

          // if (
          //   (item?.BaseCategoryName === 'Absences' && item?.ReportingName.includes('Deduction')) ||
          //   item?.BaseCategoryName !== 'Absences'
          // )

          deductionList.push(item);
        }
        if (item?.Context === 'ORA_PAYSLIP_EARN_BAL_CAT' && item?.BaseCategoryName !== 'Absences') {
          // if (earningsCategoryName.includes(item?.BaseCategoryName)) {

          // if (
          //   (item?.BaseCategoryName === 'Absences' && !item?.ReportingName.includes('Deduction')) ||
          //   item?.BaseCategoryName !== 'Absences'
          // )

          earningList.push(item);
        }
        // if (absencesCategoryName.includes(item?.BaseCategoryName)) {
        //   absencesList.push(item);
        // }
      });
      setEarningsPayslipDetailsData(earningList);
      setDeducationsPayslipDetailsData(deductionList);

      // setModifiedPayslipDetailsData(newdata);
    } else {
      // setModifiedPayslipDetailsData([]);
      setEarningsPayslipDetailsData([]);
      setDeducationsPayslipDetailsData([]);
    }
  }, [list]);

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
        marginHorizontal: RfW(24),
        borderRadius: BorderRadius.BR0,
        paddingTop: RfH(14),
        marginTop: RfH(16),
        minHeight: RfH(250),
        marginBottom: RfH(40),
        ...containerStyle
      }}>
      <CustomText
        fontSize={20}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={{
          marginLeft: RfW(21),
          lineHeight: RfH(22),
          ...CommonStyles.regularFont500Style
        }}>
        {localize('hrRequest.payAdvice')}
      </CustomText>
      <CustomText
        fontSize={12}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={{
          marginLeft: RfW(21),
          lineHeight: RfH(22),
          paddingTop: RfH(5),
          ...CommonStyles.regularFont400Style
        }}>
        {`${moment(startDate).format('DD-MMM-YYYY')} to ${moment(endDate).format('DD-MMM-YYYY')}`}
      </CustomText>
      {!isEmpty(deducationsPayslipDetailsData) || !isEmpty(earningsPayslipDetailsData) ? (
        <>
          <View
            style={{
              borderColor: Colors.grayBorder,
              borderWidth: 1,
              borderRadius: BorderRadius.BR0,
              marginHorizontal: RfW(11),
              marginVertical: RfH(19)
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
                  {localize('hrRequest.types')}
                </CustomText>
              </View>
              <View style={styles.leaveBalRightView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    ...CommonStyles.mediumFontStyle,
                    lineHeight: RfH(22)
                  }}>
                  {localize('hrRequest.amount')} ({currencyCode})
                </CustomText>
              </View>
            </View>
            {/* earnings */}
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
                    ...CommonStyles.regularFont400Style
                  }}>
                  {localize('hrRequest.earnings')}
                </CustomText>
              </View>
              <View style={styles.leaveBalRightView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    lineHeight: RfH(22),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {currencyFormat(
                    earningsPayslipDetailsData.reduce((a, v) => (a = a + v.Amount), 0)
                  )}
                </CustomText>
              </View>
            </View>
            {/* {earningsPayslipDetailsData.map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={
                    earningsPayslipDetailsData?.length - 1 !== index
                      ? {
                          flexDirection: 'row',
                          borderBottomColor: Colors.grayBorder,
                          borderBottomWidth: 1
                        }
                      : { flexDirection: 'row' }
                  }
                  key={index}>
                  <View style={styles.leaveBalLeftView}>
                    <CustomText
                      fontSize={14}
                      color={isDarkMode ? Colors.white : Colors.grayTwo}
                      styling={{
                        ...CommonStyles.regularFont400Style
                      }}>
                      {item?.ReportingName}
                    </CustomText>
                  </View>
                  <View style={styles.leaveBalRightView}>
                    <CustomText
                      fontSize={14}
                      color={isDarkMode ? Colors.white : Colors.white}
                      styling={{
                        lineHeight: RfH(22),
                        ...CommonStyles.regularFont400Style
                      }}>
                      {currencyFormat(item?.Amount)}
                    </CustomText>
                  </View>
                </View>
              );
            })} */}

            {/* deducations */}
            <View
              style={{
                flexDirection: 'row',
                borderColor: Colors.grayBorder,
                borderBottomWidth: 1,
                borderTopWidth: 1
              }}>
              <View style={styles.leaveBalLeftView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    ...CommonStyles.regularFont400Style
                  }}>
                  {localize('hrRequest.deductions')}
                </CustomText>
              </View>
              <View style={styles.leaveBalRightView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    lineHeight: RfH(22),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {currencyFormat(
                    deducationsPayslipDetailsData.reduce((a, v) => (a = a + v.Amount), 0)
                  )}
                </CustomText>
              </View>
            </View>
            {/* {deducationsPayslipDetailsData.map((item, index) => {
              return (
                <View
                  style={
                    deducationsPayslipDetailsData?.length - 1 !== index
                      ? {
                          flexDirection: 'row',
                          borderBottomColor: Colors.grayBorder,
                          borderBottomWidth: 1
                        }
                      : { flexDirection: 'row' }
                  }
                  key={index}>
                  <View style={styles.leaveBalLeftView}>
                    <CustomText
                      fontSize={14}
                      color={isDarkMode ? Colors.white : Colors.grayTwo}
                      styling={{
                        ...CommonStyles.regularFont400Style
                      }}>
                      {item?.ReportingName}
                    </CustomText>
                  </View>
                  <View style={styles.leaveBalRightView}>
                    <CustomText
                      fontSize={14}
                      color={isDarkMode ? Colors.white : Colors.white}
                      styling={{
                        lineHeight: RfH(22),
                        ...CommonStyles.regularFont400Style
                      }}>
                      {currencyFormat(item?.Amount)}
                    </CustomText>
                  </View>
                </View>
              );
            })} */}

            {/* absences */}
            {/* {!isEmpty(list) && totalAbsences() !== undefined && (
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.grayBorder,
                  borderBottomWidth: 1,
                  borderTopWidth: 1
                }}>
                <View style={styles.leaveBalLeftView}>
                  <CustomText
                    fontSize={14}
                    color={isDarkMode ? Colors.white : Colors.white}
                    styling={{
                      ...CommonStyles.regularFont400Style
                    }}>
                    Absences
                  </CustomText>
                </View>
                <View style={styles.leaveBalRightView}>
                  <CustomText
                    fontSize={14}
                    color={isDarkMode ? Colors.white : Colors.white}
                    styling={{
                      lineHeight: RfH(22),
                      ...CommonStyles.regularFont400Style
                    }}>
                    {currencyFormat(totalAbsences()?.Amount, 0)}
                  </CustomText>
                </View>
              </View>
            )} */}

            {/* net pay */}
            {/* get from paylsip api or from netpay child of payslip detail api */}
            <View
              style={{
                flexDirection: 'row',
                borderColor: Colors.grayBorder,
                borderBottomWidth: 1,
                borderTopWidth: 1
              }}>
              <View style={styles.leaveBalLeftView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    ...CommonStyles.regularFont500Style
                  }}>
                  {localize('hrRequest.netPay')}
                </CustomText>
              </View>
              <View style={styles.leaveBalRightView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    lineHeight: RfH(22),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {/* scenario to handle CR to get Net Pay-  ORA_TOTAL_ABSENCES */}
                  {currencyFormat(
                    list?.find((i) => i.BaseCategoryName === 'Total Payments')?.Amount -
                      list?.find((i) => i.BaseCategoryName === 'ORA_TOTAL_ABSENCES')?.Amount ||
                      selectedPayslipData?.Amount
                  )}
                </CustomText>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                borderBottomColor: Colors.grayBorder,
                borderBottomWidth: 1
              }}>
              <View style={styles.leaveBalLeftView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.grayTwo}
                  styling={{
                    ...CommonStyles.regularFont400Style
                  }}>
                  Amount
                </CustomText>
              </View>
              <View style={styles.leaveBalRightView}>
                <CustomText
                  fontSize={14}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{
                    lineHeight: RfH(22),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {currencyFormat(selectedPayslipData?.Amount)}
                </CustomText>
              </View>
            </View> */}

            {/* end */}
          </View>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              marginLeft: RfW(16),
              paddingBottom: RfW(16),
              ...CommonStyles.regularFont400Style
            }}>
            {localize('hrRequest.theAboveAmtAddedToYorAcc')}
          </CustomText>
        </>
      ) : null}
    </View>
  );
};

export default PayslipAdvice;
