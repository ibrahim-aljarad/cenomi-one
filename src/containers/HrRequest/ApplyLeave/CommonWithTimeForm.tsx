import { useFormik } from 'formik';
import { isEmpty, times } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';
import { CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomAttachmentDocument from '../../../components/CustomAttachmentDocument';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomEditComment from '../../../components/CustomEditComment';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { RfH, RfW } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';
import LeaveBalanceCard from '../components/LeaveBalanceCard';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';
import { localize } from '../../../locale/utils';

const CommonWithTimeForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPLY_LEAVE_FORM);
    commonWithTimeFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required(localize('form.startDateCannotBeEmpty')),
    startTime: Yup.string().required(localize('form.startTimeCannotBeEmpty')),
    endDate: Yup.string().required(localize('form.endDateCannotBeEmpty')),
    endTime: Yup.string().required(localize('form.endTimeCannotBeEmpty'))
    // comments: Yup.string().required('Comment cannot be empty'),
  });

  const commonWithTimeFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      comments: '',
      attachments: []
    },
    validationSchema,
    onSubmit: () => {
      trackEvent(EVENT_NAME.PRESSED_LEAVE_SUBMIT);
      handleSubmit({
        absenceStatusCd: 'SUBMITTED',
        ...commonWithTimeFormData?.values,
        absenceType,
        startTime: commonWithTimeFormData?.values?.startTime
          ? moment(commonWithTimeFormData?.values?.startTime)?.format('H:mm')
          : '',
        endTime: commonWithTimeFormData?.values?.endTime
          ? moment(commonWithTimeFormData?.values?.endTime)?.format('H:mm')
          : '',
        // startDateDuration: 1,
        // endDateDuration: 1,
        attachments: commonWithTimeFormData?.values?.attachments
      });
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(commonWithTimeFormData.errors)) {
        const errorText = Object.keys(commonWithTimeFormData.errors)[0];
        alertBox(localize('common.warning'), commonWithTimeFormData.errors[errorText]);
      } else {
        commonWithTimeFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    commonWithTimeFormData?.setFieldValue('attachments', data);
  };

  const leaveDurationSection = () => {
    const diffTime = Math.abs(
      new Date(commonWithTimeFormData?.values?.endDate) -
        new Date(commonWithTimeFormData?.values?.startDate)
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
          commonWithTimeFormData?.values?.endDate
            ? new Date(commonWithTimeFormData?.values?.endDate)
            : ''
        }
        selectedDate={
          commonWithTimeFormData?.values?.startDate
            ? new Date(commonWithTimeFormData?.values?.startDate)
            : ''
        }
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) > new Date(commonWithTimeFormData?.values?.endDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.startDateSholdNotBeGrterEndDate')
            );
            return;
          }
          commonWithTimeFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));
        }}
      />
      <CustomDatePicker
        mode={'time'}
        maximumDate={
          commonWithTimeFormData?.values?.endTime
            ? new Date(commonWithTimeFormData?.values?.endTime)
            : ''
        }
        selectedDate={
          commonWithTimeFormData?.values?.startTime
            ? moment(new Date(commonWithTimeFormData?.values?.startTime)).format('h:mm A')
            : ''
        }
        label={localize('form.startTime')}
        placeholder={localize('form.selectTime')}
        onPressDate={(date) => {
          commonWithTimeFormData.setFieldValue('startTime', date);
        }}
      />
      <CustomDatePicker
        minimumDate={
          commonWithTimeFormData?.values?.startDate
            ? new Date(commonWithTimeFormData?.values?.startDate)
            : undefined
        }
        selectedDate={
          commonWithTimeFormData?.values?.endDate
            ? new Date(commonWithTimeFormData?.values?.endDate)
            : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) < new Date(commonWithTimeFormData?.values?.startDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.endDateSholdNotBeLessStartDate')
            );
            return;
          }
          commonWithTimeFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
        }}
      />

      <CustomDatePicker
        mode={'time'}
        minimumDate={
          commonWithTimeFormData?.values?.startTime
            ? new Date(commonWithTimeFormData?.values?.startTime)
            : undefined
        }
        selectedDate={
          commonWithTimeFormData?.values?.endTime
            ? moment(new Date(commonWithTimeFormData?.values?.endTime)).format('h:mm A')
            : ''
        }
        label={localize('form.endTime')}
        placeholder={localize('form.selectTime')}
        onPressDate={(date) => {
          commonWithTimeFormData.setFieldValue('endTime', date);
        }}
      />

      {/* It should be implemente in future */}
      {/* {commonWithTimeFormData?.values?.startDate &&
      commonWithTimeFormData?.values?.endDate ? (
        leaveDurationSection()
      ) : (
        <></>
      )} */}

      <CommentComponent
        onCommentChange={(text) => {
          commonWithTimeFormData.setFieldValue('comments', text);
        }}
        absenceType={absenceType}
      />

      <AttachmentComponent handleDocuments={handleDocuments} absenceType={absenceType} />

      <View style={{ paddingHorizontal: RfW(32), marginTop: RfH(10) }}>
        <AppPrimaryButton buttonText={localize('common.apply')} onPress={() => handleOnSubmit()} />
      </View>
    </View>
  );
};

export default CommonWithTimeForm;
