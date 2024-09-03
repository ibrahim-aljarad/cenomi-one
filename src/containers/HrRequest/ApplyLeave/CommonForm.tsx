import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';
import { CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomDatePicker from '../../../components/CustomDatePicker';
import { localize } from '../../../locale/utils';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { RfH, RfW } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';
import AttachmentComponent from '../components/AttachmentComponent';
import CommentComponent from '../components/CommentComponent';
import { getStartTimeEndTime, holidays, isHideAttachments, isHolidaySkip } from '../serializer';

const CommonForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPLY_LEAVE_FORM);
    commonFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required(localize('form.startDateCannotBeEmpty')),
    endDate: Yup.string().required(localize('form.endDateCannotBeEmpty'))
    // comments: Yup.string().required('Comment cannot be empty'),
  });

  const commonFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      startDate: '',
      endDate: '',
      comments: '',
      attachments: []
    },
    validationSchema,
    onSubmit: () => {
      trackEvent(EVENT_NAME.PRESSED_LEAVE_SUBMIT);
      handleSubmit({
        absenceStatusCd: 'SUBMITTED',
        ...commonFormData?.values,
        absenceType,
        ...getStartTimeEndTime(absenceType),
        startDateDuration: 1,
        endDateDuration: 1,
        attachments: commonFormData?.values?.attachments
      });
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(commonFormData.errors)) {
        const errorText = Object.keys(commonFormData.errors)[0];
        alertBox(localize('common.warning'), commonFormData.errors[errorText]);
      } else {
        commonFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    commonFormData?.setFieldValue('attachments', data);
  };

  const onPressStartDate = (date) => {
    if (new Date(date) > new Date(commonFormData?.values?.endDate)) {
      alertBox(localize('common.warning'), localize('warning.startDateSholdNotBeGrterEndDate'));
      return;
    }
    commonFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));
  };

  const onPressEndDate = (date) => {
    const holidayChecking = isHolidaySkip(absenceType);
    if (holidayChecking) {
      const selectedDay = moment(date).format('dddd');
      const isExist = holidays?.includes(selectedDay);
      if (isExist) {
        alertBox(localize('common.warning'), localize('form.warning.plzSelectWorkingDays'));
        return;
      }
    }

    if (new Date(date) < new Date(commonFormData?.values?.startDate)) {
      alertBox(localize('common.warning'), localize('warning.endDateSholdNotBeLessStartDate'));
      return;
    }

    commonFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
  };

  const leaveDurationSection = () => {
    const diffTime = Math.abs(
      new Date(commonFormData?.values?.endDate) - new Date(commonFormData?.values?.startDate)
    );
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    diffDays = `${diffDays < 10 ? '0' + diffDays : diffDays} ${
      diffDays > 1 ? localize('form.days') : localize('form.day')
    }`;

    return (
      <View
        style={{
          backgroundColor: Colors.voiletLight,
          paddingHorizontal: RfW(13),
          paddingVertical: RfH(4),
          marginHorizontal: RfW(24),
          borderRadius: BorderRadius.BR0,
          marginTop: RfH(19),
          alignSelf: 'flex-start'
        }}>
        <CustomText
          fontSize={12}
          color={Colors.primary}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(17)
          }}>{`${localize('form.leaveDuration')} : ${diffDays}`}</CustomText>
      </View>
    );
  };

  return (
    <View>
      <CustomDatePicker
        maximumDate={
          commonFormData?.values?.endDate ? new Date(commonFormData?.values?.endDate) : ''
        }
        selectedDate={
          commonFormData?.values?.startDate ? new Date(commonFormData?.values?.startDate) : ''
        }
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => onPressStartDate(date)}
      />
      <CustomDatePicker
        minimumDate={
          commonFormData?.values?.startDate
            ? new Date(commonFormData?.values?.startDate)
            : undefined
        }
        selectedDate={
          commonFormData?.values?.endDate ? new Date(commonFormData?.values?.endDate) : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => onPressEndDate(date)}
      />
      {/* It should be implemente in future */}
      {/* {commonFormData?.values?.startDate && commonFormData?.values?.endDate ? (
        leaveDurationSection()
      ) : (
        <></>
      )} */}

      <CommentComponent
        onCommentChange={(text) => {
          commonFormData.setFieldValue('comments', text);
        }}
        absenceType={absenceType}
      />

      <AttachmentComponent handleDocuments={handleDocuments} absenceType={absenceType} />

      <View
        style={{
          paddingHorizontal: RfW(32),
          marginTop: RfH(isHideAttachments(absenceType) ? 58 : 10)
        }}>
        <AppPrimaryButton buttonText={localize('common.apply')} onPress={() => handleOnSubmit()} />
      </View>
    </View>
  );
};

export default CommonForm;

// This validation for CC users

// // Bereavement Leave, Exam Leave, Haj Leave (4days to 15 days), marriage leave (5 days), Paternity Leave (3 days_), maternity leave (70 days), sick leave    --skip
// Attachment Compulsory   ---- P1 (Done)

// // Business leave/ uppaid Leave
// End date should be a working day (Friday and Sat as a holiday)  ---- P1 (Done)

// // businesss mission
// validation - duration should be less than 8 hrs   --skip

// // excuse leave
// validation - duration should be less than 2 hrs   --skip

// // half day/ half day leave
// validation - duration should be less than 4 hrs   --skip

// 8 am to 6 pm - 10 hrs per day   --skip

// Duration calendar days   --skip

// Duration hrs -   --skip
