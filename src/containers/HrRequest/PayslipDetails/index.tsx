import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, HeaderSVG, Loader } from '../../../components';
import CustomMonthYearPicker from '../../../components/CustomMonthYearPicker';
import { PayAdviceSkeleton } from '../../../components/SkeletonLoader';
import { Colors, CommonStyles, Images } from '../../../theme';
import Config from '../../../utils/config';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import { RfH, RfW, downloadDoc, fileViewer, getColorWithOpacity } from '../../../utils/helper';
import { getSaveData } from '../../../utils/helpers';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
import { isDarkModeSelector } from '../../redux/selectors';
import EmployeeDetails from '../components/EmployeeDetails';
import PayslipAdvice from '../components/PayslipAdvice';
import { getPayslip, getPayslipDetails } from '../redux/actions';
import { getPayslipDetailsSelector, getPayslipListSelector } from '../redux/selectors';
import styles from './styles';
import { localize } from '../../../locale/utils';
import WrapperContainer from '../../../components/WrapperContainer';
import { BorderRadius } from '../../../theme/sizes';

const stateSelector = createStructuredSelector({
  paySlipList: getPayslipListSelector,
  myProfileData: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
  payslipDetailsData: getPayslipDetailsSelector
});

const PayslipDetails = () => {
  const { paySlipList, myProfileData, isDarkMode, payslipDetailsData } = useSelector(stateSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState();
  const [minDate, setMindate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowMonthYearPicker, setIsShowMonthYearPicker] = useState(false);

  const [selectedPayslipData, setSelectedPayslipData] = useState({});

  const { profile: { workRelationships } = {} } = myProfileData || {};
  const { startDate: joiningDate } = workRelationships?.length > 0 ? workRelationships[0] : {};

  useEffect(() => {
    if (isFocused) {
      dispatch(getPayslip.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isEmpty(paySlipList) && paySlipList?.length > 0) {
      const currDate = new Date();
      const month = currDate?.getMonth();
      const year = currDate?.getFullYear();

      const previousYearFirstDate = moment(getFirstDayOfMonth(year - 1, 0))?.format('YYYY-MM-DD');
      const previousMonthLastDate = moment(getLastDayOfMonth(year, month - 1))?.format(
        'YYYY-MM-DD'
      );

      setMindate(
        new Date(
          paySlipList?.length
            ? paySlipList[paySlipList?.length - 1]?.PayslipViewDate
            : previousYearFirstDate
        )
      );
      setMaxDate(
        new Date(paySlipList?.length ? paySlipList[0]?.PayslipViewDate : previousMonthLastDate)
      );

      setSelectedDate(
        new Date(paySlipList?.length ? paySlipList[0]?.PayslipViewDate : previousMonthLastDate)
      );

      setSelectedPayslipData(paySlipList[0]);
      callDetailsAPI(paySlipList[0]?.DocumentsOfRecordId);
    }
  }, [paySlipList]);

  const callDetailsAPI = (recordId) => {
    dispatch(getPayslipDetails.trigger({ documentsOfRecordId: recordId }));
  };

  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
  }

  const handleOnPressDate = (date) => {
    const selectedDateMonth = new Date(date)?.getMonth();
    const selectedDateYear = new Date(date)?.getFullYear();
    const filteredData = paySlipList?.find((item) => {
      const itemMonth = new Date(item?.PaymentDate)?.getMonth();
      const itemYear = new Date(item?.PaymentDate)?.getFullYear();
      if (selectedDateYear === itemYear && selectedDateMonth === itemMonth) {
        return item;
      }
    });

    setSelectedDate(new Date(date));
    setSelectedPayslipData(filteredData);

    callDetailsAPI(filteredData?.DocumentsOfRecordId);
  };

  const rightButtonHandler = async () => {
    const docRecordId = selectedPayslipData?.DocumentsOfRecordId;
    if (docRecordId) {
      setIsLoading(true);
      const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
      const finalUrl = `${Config.API_BASE_URL}process/hr-request/payslips/download/${docRecordId}?token=${token}`;
      downloadDocument(finalUrl);
    }
  };

  const handleDocDownloaded = (downloadedPath: any) => {
    setIsLoading(false);
    fileViewer(downloadedPath);
  };

  const handleDownloadedError = () => {
    setIsLoading(false);
  };

  const downloadDocument = (url: any) => {
    if (url) {
      setTimeout(() => {
        const fileName = `PaySlip-${moment(selectedDate).format('MMM YYYY')}`;
        downloadDoc(url, fileName, 'pdf', handleDocDownloaded, handleDownloadedError);
      }, 500);
    }
  };

  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15
  };

  const datePickerSection = () => {
    return (
      <>
        <CustomText
          fontSize={12}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: 16,
            marginBottom: RfH(6),
            marginTop: RfH(40),
            marginLeft: RfW(24),
            color: isDarkMode ? Colors.white : Colors.white
          }}>
          {localize('hrRequest.chooseMonth')}
        </CustomText>
        {maxDate && minDate ? (
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setIsShowMonthYearPicker(true)}>
            <View style={[styles.dateBgContainer, darkCard]}>
              <CustomText
                fontSize={16}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}
                color={isDarkMode ? Colors.white : Colors.white}>
                {moment(selectedDate).format('MMM YYYY')}
              </CustomText>
              <CustomImage
                image={Images.calendarGrey}
                imageWidth={16}
                imageHeight={16}
                tintColor={isDarkMode ? Colors.white : Colors.white}
                imageResizeMode={'contain'}
                displayLoader={false}
                containerStyling={{}}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </>
    );
  };

  const payAdviceSection = () => {
    if (payslipDetailsData === undefined && selectedDate) {
      return <PayAdviceSkeleton isDarkMode={isDarkMode} />;
    } else if (selectedDate) {
      return (
        <PayslipAdvice
          isDarkMode={isDarkMode}
          list={payslipDetailsData?.summaryItems}
          selectedPayslipData={selectedPayslipData}
          startDate={selectedPayslipData?.PeriodStartDate}
          endDate={selectedPayslipData?.PeriodEndDate}
          currencyCode={selectedPayslipData?.CurrencyCode}
          containerStyle={darkCard}
        />
      );
    }

    return null;
  };

  const right2IconItem = (
    <CustomImage
      image={Images.download}
      imageWidth={RfW(16)}
      imageHeight={RfW(16)}
      tintColor={isDarkMode ? Colors.white : Colors.white}
    />
  );

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
          isRightButtonVisible={!isEmpty(selectedPayslipData) && payslipDetailsData ? true : false}
          isBackButtonVisible={true}
          titleText={localize('hrRequest.payslip')}
          titleFont={20}
          onRightButtonClickHandler={rightButtonHandler}
          onBackPressHandler={() => navigation.goBack()}
          rightIcon={right2IconItem}
        />
        <ScrollView>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
              // height: deviceHeight()
            }}>
            {datePickerSection()}
            <EmployeeDetails isDarkMode={isDarkMode} containerStyle={darkCard} />
            {payAdviceSection()}
          </View>
        </ScrollView>
        <Loader isLoading={isLoading} />
        {isShowMonthYearPicker ? (
          <CustomMonthYearPicker
            isShow={isShowMonthYearPicker}
            onPressDate={(date) => {
              setIsShowMonthYearPicker(false);

              if (date !== '') {
                handleOnPressDate(date);
              }
            }}
            date={selectedDate}
            maximumDate={maxDate}
            minimumDate={minDate}
          />
        ) : (
          <></>
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default PayslipDetails;
