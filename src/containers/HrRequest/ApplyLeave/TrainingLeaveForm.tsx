import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { CustomText, CustomTextInput } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import { RfH, RfW } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';
import { Colors, CommonStyles, Images } from '../../../theme';
import CustomDropDown from '../../../components/CustomDropdown';
import CustomDatePicker from '../../../components/CustomDatePicker';
import moment from 'moment';
import CustomRadioButton from '../../../components/CustomRadioButton';
import CustomLabelValue from '../../../components/CustomLabelValue';
import CustomLabelHeading from '../../../components/CustomLabelHeading';
import CustomAttachmentDocument from '../../../components/CustomAttachmentDocument';
import CustomEditComment from '../../../components/CustomEditComment';
import { createStructuredSelector } from 'reselect';
import { getStaticDataSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { getOptionValues, startEndDateDuration } from '../serializer';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';
import { localize } from '../../../locale/utils';

const stateSelector = createStructuredSelector({
  staticData: getStaticDataSelector
});

const TrainingLeaveForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};

  const { staticData } = useSelector(stateSelector);

  const { lookups: { leaves } = {} } = staticData || {};
  const traiingVenueOptionLists =
    leaves?.length > 0
      ? leaves?.find((item) => item?.absenceTypeName?.toLowerCase() === absenceType?.toLowerCase())
          ?.fields
      : [];

  useEffect(() => {
    trainingLeaveFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required(localize('form.startDateCannotBeEmpty')),
    startDateDuration: Yup.string().required(localize('form.startDateDurationCannotBeEmpty')),
    trainingCourseTitle: Yup.string().required(
      localize('form.warning.trainingCourseCannotBeEmpty')
    ),
    trainingVenue: Yup.string().required(localize('form.warning.trainingVenueCannotBeEmpty'))
  });

  const trainingLeaveFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      startDate: '',
      endDate: '',
      startDateDuration: '',
      endDateDuration: '',
      comments: '',
      singleDay: false,
      trainingCourseTitle: '',
      trainingVenue: '',
      attachments: []
    },
    validationSchema,
    onSubmit: () => {
      const data = {
        startDate: trainingLeaveFormData?.values?.startDate,
        startDateDuration: trainingLeaveFormData?.values?.startDateDuration,
        endDate: trainingLeaveFormData?.values?.endDate,
        endDateDuration: trainingLeaveFormData?.values?.endDateDuration,
        absenceStatusCd: 'SUBMITTED',
        comments: trainingLeaveFormData?.values?.comments,
        absenceRecordingDFF: [
          {
            __FLEX_Context: '300001703110112',
            __FLEX_Context_DisplayValue: 'AFR Training Leave',
            trainingCourseTitle: trainingLeaveFormData?.values?.trainingCourseTitle,
            trainingVenue: trainingLeaveFormData?.values?.trainingVenue
          }
        ],
        attachments: trainingLeaveFormData?.values?.attachments
      };
      handleSubmit(data);
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(trainingLeaveFormData.errors)) {
        const errorText = Object.keys(trainingLeaveFormData.errors)[0];
        alertBox(localize('common.warning'), trainingLeaveFormData.errors[errorText]);
      } else {
        trainingLeaveFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    trainingLeaveFormData?.setFieldValue('attachments', data);
  };

  useEffect(() => {
    if (trainingLeaveFormData?.values?.singleDay) {
      trainingLeaveFormData.setFieldValue(
        'endDate',
        trainingLeaveFormData?.values?.startDate || ''
      );
    } else {
      trainingLeaveFormData.setFieldValue('endDate', '');
    }
  }, [trainingLeaveFormData?.values?.singleDay]);

  return (
    <View style={styles.pageContainer}>
      <CustomTextInput
        label={localize('leave.trainingCourseTitle')}
        inputLabelStyle={{ color: Colors.grayTwo }}
        placeholder={localize('leave.enterTitle')}
        textInputStyle={styles.textInputSty}
        value={trainingLeaveFormData.values.trainingCourseTitle}
        onChangeHandler={(value) =>
          trainingLeaveFormData.setFieldValue('trainingCourseTitle', value)
        }
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={0}
        containerStyle={{ paddingHorizontal: RfW(24) }}
      />
      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={getOptionValues('Training Venue', traiingVenueOptionLists) || []}
        isCard={false}
        label={localize('leave.trainingVenue')}
        placeholder={localize('leave.selectVenue')}
        onChange={(item) => {
          trainingLeaveFormData.setFieldValue('trainingVenue', item?.value);
        }}
      />

      <CustomLabelHeading
        headingText={localize('common.when')}
        containerStyle={{ paddingTop: RfH(30) }}
      />

      <CustomDatePicker
        selectedDate={
          trainingLeaveFormData?.values?.startDate
            ? new Date(trainingLeaveFormData?.values?.startDate)
            : ''
        }
        maximumDate={
          trainingLeaveFormData?.values?.endDate
            ? new Date(trainingLeaveFormData?.values?.endDate)
            : ''
        }
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          trainingLeaveFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));

          if (trainingLeaveFormData?.values?.singleDay) {
            trainingLeaveFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
          }
        }}
      />
      <CustomRadioButton
        labelSize={16}
        icon={
          trainingLeaveFormData?.values?.singleDay ? Images.checkboxSelect : Images.checkboxDeselect
        }
        labelText={localize('form.singleDay')}
        containerStyle={styles.checkboxStyle}
        onSelect={() =>
          trainingLeaveFormData.setFieldValue(
            'singleDay',
            !trainingLeaveFormData?.values?.singleDay
          )
        }
      />
      <CustomDatePicker
        selectedDate={
          trainingLeaveFormData?.values?.endDate
            ? new Date(trainingLeaveFormData?.values?.endDate)
            : ''
        }
        minimumDate={
          trainingLeaveFormData?.values?.startDate
            ? new Date(trainingLeaveFormData?.values?.startDate)
            : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (
            trainingLeaveFormData?.values?.singleDay &&
            trainingLeaveFormData?.values?.startDate !== date
          ) {
            trainingLeaveFormData.setFieldValue('singleDay', false);
          }

          trainingLeaveFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      {/* <CustomLabelValue label={'Duration'} value={`0 Hours`} /> */}

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={startEndDateDuration || []}
        isCard={false}
        label={localize('form.startDateDuration')}
        placeholder={localize('form.selectDate')}
        onChange={(item) => {
          trainingLeaveFormData.setFieldValue('startDateDuration', item?.value);
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

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={startEndDateDuration || []}
        isCard={false}
        label={localize('form.endDateDuration')}
        placeholder={localize('form.selectDate')}
        onChange={(item) => {
          trainingLeaveFormData.setFieldValue('endDateDuration', item?.value);
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
      />

      <CommentComponent
        onCommentChange={(text) => {
          trainingLeaveFormData.setFieldValue('comments', text);
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

export default TrainingLeaveForm;
