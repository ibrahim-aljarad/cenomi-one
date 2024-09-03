import { useFormik } from 'formik';
import { isEmpty, times } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
import LeaveBalanceCard from '../components/LeaveBalanceCard';
import { holidays, isAttachmentCompulsory, isHolidaySkip } from '../serializer';
import { localize } from '../../../locale/utils';
import CustomDropDown from '../../../components/CustomDropdown';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';

const KSAAFRSickLeave = (props: any) => {
  const { absenceType, absenseReason, handleSubmit } = props || {};
  const [reasonList, setReasonList] = useState([]);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPLY_LEAVE_FORM);
    ksaAFRSickLeaveFormData.validateForm();
  }, []);

  useEffect(() => {
    if (absenseReason && absenseReason?.length > 0) {
      const modifiedData = absenseReason?.map((item) => ({
        label: item?.Name,
        value: item?.Name
      }));
      setReasonList(modifiedData?.length > 0 ? modifiedData : []);
    }
  }, [absenseReason]);

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required(localize('form.startDateCannotBeEmpty')),
    endDate: Yup.string().required(localize('form.endDateCannotBeEmpty')),
    reason: Yup.string().required(localize('form.warning.reasonCannotBeEmpty'))

    // comments: Yup.string().required('Comment cannot be empty'),
  });

  const ksaAFRSickLeaveFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      startDate: '',
      endDate: '',
      comments: '',
      attachments: [],
      reason: ''
    },
    validationSchema,
    onSubmit: () => {
      trackEvent(EVENT_NAME.PRESSED_LEAVE_SUBMIT);
      handleSubmit({
        absenceStatusCd: 'SUBMITTED',
        absenceType,
        startDate: ksaAFRSickLeaveFormData?.values?.startDate,
        endDate: ksaAFRSickLeaveFormData?.values?.endDate,
        comments: ksaAFRSickLeaveFormData?.values?.comments,
        startTime: '00:00',
        endTime: '00:00',
        startDateDuration: 1,
        endDateDuration: 1,
        attachments: ksaAFRSickLeaveFormData?.values?.attachments,
        absenceReason: ksaAFRSickLeaveFormData?.values?.reason
      });
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(ksaAFRSickLeaveFormData.errors)) {
        const errorText = Object.keys(ksaAFRSickLeaveFormData.errors)[0];
        alertBox(localize('common.warning'), ksaAFRSickLeaveFormData.errors[errorText]);
      } else {
        ksaAFRSickLeaveFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    ksaAFRSickLeaveFormData?.setFieldValue('attachments', data);
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

    if (new Date(date) < new Date(ksaAFRSickLeaveFormData?.values?.startDate)) {
      alertBox(localize('common.warning'), localize('warning.endDateSholdNotBeLessStartDate'));
      return;
    }

    ksaAFRSickLeaveFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
  };

  const leaveDurationSection = () => {
    const diffTime = Math.abs(
      new Date(ksaAFRSickLeaveFormData?.values?.endDate) -
        new Date(ksaAFRSickLeaveFormData?.values?.startDate)
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
    <View style={styles.pageContainer}>
      <CustomDropDown
        data={reasonList || []}
        isCard={false}
        label={localize('leave.reason')}
        placeholder={localize('leave.selectReason')}
        onChange={(item) => {
          ksaAFRSickLeaveFormData.setFieldValue('reason', item?.value);
        }}
      />

      <CustomDatePicker
        maximumDate={
          ksaAFRSickLeaveFormData?.values?.endDate
            ? new Date(ksaAFRSickLeaveFormData?.values?.endDate)
            : ''
        }
        selectedDate={
          ksaAFRSickLeaveFormData?.values?.startDate
            ? new Date(ksaAFRSickLeaveFormData?.values?.startDate)
            : ''
        }
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) > new Date(ksaAFRSickLeaveFormData?.values?.endDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.startDateSholdNotBeGrterEndDate')
            );
            return;
          }
          ksaAFRSickLeaveFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));
        }}
      />
      <CustomDatePicker
        minimumDate={
          ksaAFRSickLeaveFormData?.values?.startDate
            ? new Date(ksaAFRSickLeaveFormData?.values?.startDate)
            : undefined
        }
        selectedDate={
          ksaAFRSickLeaveFormData?.values?.endDate
            ? new Date(ksaAFRSickLeaveFormData?.values?.endDate)
            : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => onPressEndDate(date)}
      />
      {/* It should be implemente in future */}
      {/* {ksaAFRSickLeaveFormData?.values?.startDate && ksaAFRSickLeaveFormData?.values?.endDate ? (
        leaveDurationSection()
      ) : (
        <></>
      )} */}

      <CommentComponent
        onCommentChange={(text) => {
          ksaAFRSickLeaveFormData.setFieldValue('comments', text);
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
  pageContainer: {
    marginTop: RfH(40)
  },
  textInputSty: {
    fontSize: 14,
    color: Colors.app_black,
    ...CommonStyles.regularFont400Style,
    paddingBottom: -10
  },
  fieldSeperatorStyle: {
    paddingTop: RfH(20)
  },
  buttonContainer: {
    paddingHorizontal: RfW(32),
    marginTop: RfH(31)
  },
  checkboxStyle: {
    paddingHorizontal: RfW(24),
    paddingTop: RfH(20)
  }
});

export default KSAAFRSickLeave;
