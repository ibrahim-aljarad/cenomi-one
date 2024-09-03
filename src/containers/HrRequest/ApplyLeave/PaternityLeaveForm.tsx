// TODO: This page not in use.

import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomDropDown from '../../../components/CustomDropdown';
import CustomLabelHeading from '../../../components/CustomLabelHeading';
import CustomLabelValue from '../../../components/CustomLabelValue';
import CustomRadioButton from '../../../components/CustomRadioButton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';

const PaternityLeaveForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};

  useEffect(() => {
    businessFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    //
  });

  const businessFormData = useFormik({
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
      reason: '',
      lateNotificationWaived: false
    },
    validationSchema,
    onSubmit: () => {
      handleSubmit({ ...businessFormData?.values, absenceType });
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(businessFormData.errors)) {
        const errorText = Object.keys(businessFormData.errors)[0];
        alertBox('Warning', businessFormData.errors[errorText]);
      } else {
        businessFormData.submitForm();
      }
    } else {
      alertBox('Warning', 'Type cannot be empty');
    }
  };

  return (
    <View style={styles.pageContainer}>
      <CustomLabelHeading headingText={'When'} />
      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.expectedDateOfChildBirth
            ? new Date(businessFormData?.values?.expectedDateOfChildBirth)
            : ''
        }
        label={'Expected Date of Childbirth'}
        placeholder={'Select Date'}
        onPressDate={(date) => {
          businessFormData.setFieldValue(
            'expectedDateOfChildBirth',
            moment(date).format('YYYY-MM-DD')
          );
        }}
        isMandatory={false}
      />

      <CustomRadioButton
        labelSize={16}
        icon={
          businessFormData?.values?.wouldnotReturnToWork
            ? Images.checkboxSelect
            : Images.checkboxDeselect
        }
        labelText={'Won’t return to work'}
        containerStyle={styles.checkboxStyle}
        onSelect={() =>
          businessFormData.setFieldValue(
            'wouldnotReturnToWork',
            !businessFormData?.values?.wouldnotReturnToWork
          )
        }
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.actualDateOfChildBirth
            ? new Date(businessFormData?.values?.actualDateOfChildBirth)
            : ''
        }
        label={'Actual Date of Childbirth'}
        placeholder={'Select Date'}
        onPressDate={(date) => {
          businessFormData.setFieldValue(
            'actualDateOfChildBirth',
            moment(date).format('YYYY-MM-DD')
          );
        }}
        isMandatory={false}
      />

      <CustomRadioButton
        labelSize={16}
        icon={businessFormData?.values?.openEnded ? Images.checkboxSelect : Images.checkboxDeselect}
        labelText={'Open ended'}
        containerStyle={styles.checkboxStyle}
        onSelect={() =>
          businessFormData.setFieldValue('openEnded', !businessFormData?.values?.openEnded)
        }
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.plannedStartDate
            ? new Date(businessFormData?.values?.plannedStartDate)
            : ''
        }
        label={'Planned Start Date'}
        placeholder={'Select Date'}
        onPressDate={(date) => {
          businessFormData.setFieldValue('plannedStartDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.plannedEndDate
            ? new Date(businessFormData?.values?.plannedEndDate)
            : ''
        }
        label={'Planned End Date'}
        placeholder={'Select Date'}
        onPressDate={(date) => {
          businessFormData.setFieldValue('plannedEndDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomLabelValue label={'Planned Duration'} value={`0 Calendar Days`} />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.actualStartDate
            ? new Date(businessFormData?.values?.actualStartDate)
            : ''
        }
        label={'Actual Start Date'}
        placeholder={'Select Date'}
        onPressDate={(date) => {
          businessFormData.setFieldValue('actualStartDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.actualEndDate
            ? new Date(businessFormData?.values?.actualEndDate)
            : ''
        }
        label={'Actual End Date'}
        placeholder={'Select Date'}
        onPressDate={(date) => {
          businessFormData.setFieldValue('actualEndDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomLabelValue label={'Actual Duration'} value={`0 Calendar Days`} />

      <CustomLabelHeading headingText={'Detials'} containerStyle={{ paddingTop: RfH(20) }} />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={[
          {
            label: 'Option 1',
            value: 'Option 1'
          }
        ]}
        isCard={false}
        label={'Reason'}
        placeholder={'Select Type'}
        onChange={(item) => {
          businessFormData.setFieldValue('reason', item?.value);
        }}
        isMandatory={false}
      />

      <CustomRadioButton
        labelSize={16}
        icon={
          businessFormData?.values?.lateNotificationWaived
            ? Images.checkboxSelect
            : Images.checkboxDeselect
        }
        labelText={'Late notification waived'}
        containerStyle={styles.checkboxStyle}
        onSelect={() =>
          businessFormData.setFieldValue(
            'lateNotificationWaived',
            !businessFormData?.values?.lateNotificationWaived
          )
        }
      />
      <View style={styles.buttonContainer}>
        <AppPrimaryButton buttonText={'Apply'} onPress={() => handleOnSubmit()} />
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

export default PaternityLeaveForm;
