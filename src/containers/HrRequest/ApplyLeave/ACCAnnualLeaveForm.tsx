import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
import CustomDropDown from '../../../components/CustomDropdown';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';
import { localize } from '../../../locale/utils';

const ACCAnnualLeaveForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};

  const durationList = [
    {
      label: localize('leave.fullDay'),
      value: 1
    },
    {
      label: localize('leave.halfDay'),
      value: 0.5
    }
  ];

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPLY_LEAVE_FORM);
    accAnnualLeaveFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required(localize('form.startDateCannotBeEmpty')),
    endDate: Yup.string().required(localize('form.endDateCannotBeEmpty'))
    // comments: Yup.string().required('Comment cannot be empty'),
  });

  const accAnnualLeaveFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      startDate: '',
      endDate: '',
      comments: '',
      attachments: [],
      startDateDuration: 1,
      endDateDuration: 0.5
    },
    validationSchema,
    onSubmit: () => {
      trackEvent(EVENT_NAME.PRESSED_LEAVE_SUBMIT);
      handleSubmit({
        absenceStatusCd: 'SUBMITTED',
        ...accAnnualLeaveFormData?.values,
        absenceType,
        startTime: '00:00',
        endTime: '00:00',
        startDateDuration: accAnnualLeaveFormData?.values?.startDateDuration,
        endDateDuration: accAnnualLeaveFormData?.values?.endDateDuration,
        attachments: accAnnualLeaveFormData?.values?.attachments
      });
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(accAnnualLeaveFormData.errors)) {
        const errorText = Object.keys(accAnnualLeaveFormData.errors)[0];
        alertBox(localize('common.warning'), accAnnualLeaveFormData.errors[errorText]);
      } else {
        accAnnualLeaveFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    accAnnualLeaveFormData?.setFieldValue('attachments', data);
  };

  const leaveDurationSection = () => {
    const diffTime = Math.abs(
      new Date(accAnnualLeaveFormData?.values?.endDate) -
        new Date(accAnnualLeaveFormData?.values?.startDate)
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
          }}>{`Leave Duration : ${diffDays}`}</CustomText>
      </View>
    );
  };

  return (
    <View>
      <CustomDatePicker
        maximumDate={
          accAnnualLeaveFormData?.values?.endDate
            ? new Date(accAnnualLeaveFormData?.values?.endDate)
            : ''
        }
        selectedDate={
          accAnnualLeaveFormData?.values?.startDate
            ? new Date(accAnnualLeaveFormData?.values?.startDate)
            : ''
        }
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) > new Date(accAnnualLeaveFormData?.values?.endDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.startDateSholdNotBeGrterEndDate')
            );
            return;
          }
          accAnnualLeaveFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));
        }}
      />
      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={durationList}
        isCard={false}
        label={localize('form.startDateDuration')}
        placeholder={localize('form.selectDuration')}
        vlaue={accAnnualLeaveFormData?.values.startDateDuration}
        onChange={(item) => {
          accAnnualLeaveFormData.setFieldValue('startDateDuration', item?.value);
        }}
      />
      <CustomDatePicker
        minimumDate={
          accAnnualLeaveFormData?.values?.startDate
            ? new Date(accAnnualLeaveFormData?.values?.startDate)
            : undefined
        }
        selectedDate={
          accAnnualLeaveFormData?.values?.endDate
            ? new Date(accAnnualLeaveFormData?.values?.endDate)
            : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) < new Date(accAnnualLeaveFormData?.values?.startDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.endDateSholdNotBeLessStartDate')
            );
            return;
          }
          accAnnualLeaveFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
        }}
      />
      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={durationList}
        isCard={false}
        label={localize('form.endDateDuration')}
        placeholder={localize('form.selectDuration')}
        vlaue={accAnnualLeaveFormData?.values.endDateDuration}
        onChange={(item) => {
          accAnnualLeaveFormData.setFieldValue('endDateDuration', item?.value);
        }}
      />

      <CommentComponent
        onCommentChange={(text) => {
          accAnnualLeaveFormData.setFieldValue('comments', text);
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

const styles = StyleSheet.create({
  fieldSeperatorStyle: {
    paddingTop: RfH(20)
  }
});

export default ACCAnnualLeaveForm;
