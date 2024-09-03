import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomAttachmentDocument from '../../../components/CustomAttachmentDocument';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomDropDown from '../../../components/CustomDropdown';
import CustomEditComment from '../../../components/CustomEditComment';
import CustomLabelHeading from '../../../components/CustomLabelHeading';
import CustomLabelValue from '../../../components/CustomLabelValue';
import { Colors, CommonStyles } from '../../../theme';
import { RfH, RfW, diffenceBetweenDays } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';
import { localize } from '../../../locale/utils';

const MaternityLeaveForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};

  useEffect(() => {
    maternityLeaveFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    //
  });

  const maternityLeaveFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      expectedDateOfChildBirth: '',
      wouldnotReturnToWork: false,
      actualDateOfChildBirth: '',
      openEnded: false,
      plannedStartDate: '',
      plannedEndDate: '',
      actualStartDate: '',
      actualEndDate: '',
      specialCondition: '',
      lateNotificationWaived: false,
      comments: '',
      attachments: []
    },
    validationSchema,
    onSubmit: () => {
      const data = {
        absenceStatusCd: 'SUBMITTED',
        comments: maternityLeaveFormData?.values?.comments,
        absenceMaternity: [
          {
            expectedDateOfChildBirth: maternityLeaveFormData?.values?.expectedDateOfChildBirth,
            plannedStartDate: maternityLeaveFormData?.values?.plannedStartDate,
            plannedReturnDate: maternityLeaveFormData?.values?.plannedEndDate,
            actualChildBirthDate: maternityLeaveFormData?.values?.actualDateOfChildBirth,
            actualStartDate: maternityLeaveFormData?.values?.actualStartDate,
            actualReturnDate: maternityLeaveFormData?.values?.actualEndDate
          }
        ],
        attachments: maternityLeaveFormData?.values?.attachments
      };
      handleSubmit(data);
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(maternityLeaveFormData.errors)) {
        const errorText = Object.keys(maternityLeaveFormData.errors)[0];
        alertBox(localize('common.warning'), maternityLeaveFormData.errors[errorText]);
      } else {
        maternityLeaveFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    maternityLeaveFormData?.setFieldValue('attachments', data);
  };

  return (
    <View style={styles.pageContainer}>
      <CustomLabelHeading headingText={localize('form.plannedDate')} />
      <CustomDatePicker
        selectedDate={
          maternityLeaveFormData?.values?.expectedDateOfChildBirth
            ? new Date(maternityLeaveFormData?.values?.expectedDateOfChildBirth)
            : ''
        }
        label={localize('form.expectedDateOfChildbirth')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          maternityLeaveFormData.setFieldValue(
            'expectedDateOfChildBirth',
            moment(date).format('YYYY-MM-DD')
          );
        }}
        isMandatory={false}
      />

      {/* <CustomRadioButton
        labelSize={16}
        icon={
          maternityLeaveFormData?.values?.wouldnotReturnToWork
            ? Images.checkboxSelect
            : Images.checkboxDeselect
        }
        labelText={'Won’t return to work'}
        containerStyle={styles.checkboxStyle}
        onSelect={() =>
          maternityLeaveFormData.setFieldValue(
            'wouldnotReturnToWork',
            !maternityLeaveFormData?.values?.wouldnotReturnToWork,
          )
        }
      /> */}

      <CustomDatePicker
        selectedDate={
          maternityLeaveFormData?.values?.plannedStartDate
            ? new Date(maternityLeaveFormData?.values?.plannedStartDate)
            : ''
        }
        maximumDate={
          maternityLeaveFormData?.values?.plannedEndDate
            ? new Date(maternityLeaveFormData?.values?.plannedEndDate)
            : ''
        }
        label={localize('form.plannedStartDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) > new Date(maternityLeaveFormData?.values?.plannedEndDate)) {
            alertBox(localize('common.warning'), localize('form.warning.plannedStartDateMsg'));
            return;
          }
          maternityLeaveFormData.setFieldValue(
            'plannedStartDate',
            moment(date).format('YYYY-MM-DD')
          );
        }}
        isMandatory={false}
      />
      <CustomDatePicker
        selectedDate={
          maternityLeaveFormData?.values?.plannedEndDate
            ? new Date(maternityLeaveFormData?.values?.plannedEndDate)
            : ''
        }
        minimumDate={
          maternityLeaveFormData?.values?.plannedStartDate
            ? new Date(maternityLeaveFormData?.values?.plannedStartDate)
            : ''
        }
        label={localize('form.plannedEndDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) < new Date(maternityLeaveFormData?.values?.plannedStartDate)) {
            alertBox(localize('common.warning'), localize('form.warning.plannedEndDateMsg'));
            return;
          }
          maternityLeaveFormData.setFieldValue('plannedEndDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomLabelValue
        label={localize('form.plannedDuration')}
        value={`${diffenceBetweenDays(
          maternityLeaveFormData?.values?.plannedEndDate,
          maternityLeaveFormData?.values?.plannedStartDate
        )} ${localize('form.calendarDays')}`}
      />

      <CustomLabelHeading
        headingText={localize('form.actualDates')}
        containerStyle={{ paddingTop: RfH(30) }}
      />
      <CustomDatePicker
        selectedDate={
          maternityLeaveFormData?.values?.actualDateOfChildBirth
            ? new Date(maternityLeaveFormData?.values?.actualDateOfChildBirth)
            : ''
        }
        label={localize('form.actualDatesOfChildbirth')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          maternityLeaveFormData.setFieldValue(
            'actualDateOfChildBirth',
            moment(date).format('YYYY-MM-DD')
          );
        }}
        isMandatory={false}
      />
      <CustomDatePicker
        selectedDate={
          maternityLeaveFormData?.values?.actualStartDate
            ? new Date(maternityLeaveFormData?.values?.actualStartDate)
            : ''
        }
        maximumDate={
          maternityLeaveFormData?.values?.actualEndDate
            ? new Date(maternityLeaveFormData?.values?.actualEndDate)
            : null
        }
        label={localize('form.actualStartDates')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) > new Date(maternityLeaveFormData?.values?.actualEndDate)) {
            alertBox(localize('common.warning'), localize('form.warning.actualStartDateMsg'));
            return;
          }
          maternityLeaveFormData.setFieldValue(
            'actualStartDate',
            moment(date).format('YYYY-MM-DD')
          );
        }}
        isMandatory={false}
      />
      <CustomDatePicker
        selectedDate={
          maternityLeaveFormData?.values?.actualEndDate
            ? new Date(maternityLeaveFormData?.values?.actualEndDate)
            : ''
        }
        minimumDate={
          maternityLeaveFormData?.values?.actualStartDate
            ? new Date(maternityLeaveFormData?.values?.actualStartDate)
            : null
        }
        label={localize('form.actualEndDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) < new Date(maternityLeaveFormData?.values?.actualStartDate)) {
            alertBox(localize('common.warning'), localize('form.warning.actualEndDateMsg'));
            return;
          }
          maternityLeaveFormData.setFieldValue('actualEndDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomLabelValue
        label={localize('form.actualDuration')}
        value={`${diffenceBetweenDays(
          maternityLeaveFormData?.values?.actualStartDate,
          maternityLeaveFormData?.values?.actualEndDate
        )} ${localize('form.calendarDays')}`}
      />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={[
          {
            label: localize('common.allC'),
            value: 'All'
          }
        ]}
        isCard={false}
        label={localize('form.specialConditions')}
        placeholder={localize('leave.selectType')}
        onChange={(item) => {
          maternityLeaveFormData.setFieldValue('specialCondition', item?.value);
        }}
        isMandatory={false}
      />

      <CommentComponent
        onCommentChange={(text) => {
          maternityLeaveFormData.setFieldValue('comments', text);
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

export default MaternityLeaveForm;
