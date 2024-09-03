import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomDropDown from '../../../components/CustomDropdown';
import CustomEditComment from '../../../components/CustomEditComment';
import CustomLabelHeading from '../../../components/CustomLabelHeading';
import CustomLabelValue from '../../../components/CustomLabelValue';
import CustomRadioButton from '../../../components/CustomRadioButton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';
import { startEndDateDuration } from '../serializer';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';
import { localize } from '../../../locale/utils';

const TimeCardAdjustmentForm = (props: any) => {
  const { absenceType, absenseReason, handleSubmit } = props || {};
  const [reasonList, setReasonList] = useState([]);

  useEffect(() => {
    timeAndAdjustmentFormData.validateForm();
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
    startDateDuration: Yup.string().required(localize('form.startDateDurationCannotBeEmpty')),
    reason: Yup.string().required(localize('form.warning.reasonCannotBeEmpty'))
  });

  const timeAndAdjustmentFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      startDate: '',
      endDate: '',
      startDateDuration: '',
      endDateDuration: '',
      reason: '',
      comments: ''
    },
    validationSchema,
    onSubmit: () => {
      const data = {
        startDate: timeAndAdjustmentFormData?.values?.startDate,
        startDateDuration: timeAndAdjustmentFormData?.values?.startDateDuration,
        startTime: '09:00',
        endDate: timeAndAdjustmentFormData?.values?.endDate,
        endDateDuration: timeAndAdjustmentFormData?.values?.endDateDuration,
        endTime: '17:59',
        absenceReason: timeAndAdjustmentFormData?.values?.reason,
        absenceStatusCd: 'SUBMITTED',
        comments: timeAndAdjustmentFormData?.values?.comments
      };
      handleSubmit(data);
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(timeAndAdjustmentFormData.errors)) {
        const errorText = Object.keys(timeAndAdjustmentFormData.errors)[0];
        alertBox(localize('common.warning'), timeAndAdjustmentFormData.errors[errorText]);
      } else {
        timeAndAdjustmentFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  useEffect(() => {
    if (timeAndAdjustmentFormData?.values?.singleDay) {
      timeAndAdjustmentFormData.setFieldValue(
        'endDate',
        timeAndAdjustmentFormData?.values?.startDate || ''
      );
    } else {
      timeAndAdjustmentFormData.setFieldValue('endDate', '');
    }
  }, [timeAndAdjustmentFormData?.values?.singleDay]);

  const handleDocuments = (data) => {
    timeAndAdjustmentFormData?.setFieldValue('attachments', data);
  };

  return (
    <View style={styles.pageContainer}>
      {/* <CustomLabelHeading headingText={'Basic Mode'} /> */}
      <CustomDropDown
        data={reasonList || []}
        isCard={false}
        label={localize('leave.reason')}
        placeholder={localize('leave.selectReason')}
        onChange={(item) => {
          timeAndAdjustmentFormData.setFieldValue('reason', item?.value);
        }}
      />

      <CustomDatePicker
        selectedDate={
          timeAndAdjustmentFormData?.values?.startDate
            ? new Date(timeAndAdjustmentFormData?.values?.startDate)
            : ''
        }
        maximumDate={new Date()}
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          timeAndAdjustmentFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));

          timeAndAdjustmentFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
        }}
      />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={startEndDateDuration || []}
        isCard={false}
        label={localize('form.startDateDuration')}
        placeholder={localize('form.selectDate')}
        value={timeAndAdjustmentFormData?.values?.startDateDuration}
        onChange={(item) => {
          timeAndAdjustmentFormData.setFieldValue('endDateDuration', item?.value);

          timeAndAdjustmentFormData.setFieldValue('startDateDuration', item?.value);
        }}
        renderRightIcon={() => (
          <CustomText
            fontSize={13}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              textAlign: 'right',
              color: Colors.grayTwo
            }}>
            {localize('leave.hours')}
          </CustomText>
        )}
      />

      <CustomDatePicker
        selectedDate={
          timeAndAdjustmentFormData?.values?.endDate
            ? new Date(timeAndAdjustmentFormData?.values?.endDate)
            : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          timeAndAdjustmentFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
        isDisabled={true}
      />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={startEndDateDuration || []}
        isCard={false}
        label={localize('form.endDateDuration')}
        placeholder={localize('form.selectDate')}
        value={timeAndAdjustmentFormData?.values?.endDateDuration}
        onChange={(item) => {
          timeAndAdjustmentFormData.setFieldValue('endDateDuration', item?.value);
        }}
        renderRightIcon={() => (
          <CustomText
            fontSize={13}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              textAlign: 'right',
              color: Colors.grayTwo
            }}>
            {localize('leave.hours')}
          </CustomText>
        )}
        isMandatory={false}
        disable={true}
      />

      {/* <CustomLabelHeading headingText={'Detials'} containerStyle={{ paddingTop: RfH(30) }} /> */}

      <CommentComponent
        onCommentChange={(text) => {
          timeAndAdjustmentFormData.setFieldValue('comments', text);
        }}
        absenceType={absenceType}
      />

      <AttachmentComponent handleDocuments={handleDocuments} absenceType={absenceType} />

      <View style={styles.buttonContainer}>
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

export default TimeCardAdjustmentForm;
