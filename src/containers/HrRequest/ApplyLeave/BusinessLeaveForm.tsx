import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import { CustomText, CustomTextInput } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomDropDown from '../../../components/CustomDropdown';
import CustomRadioButton from '../../../components/CustomRadioButton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { alertBox } from '../../../utils/helpers';
import { getStaticDataSelector } from '../../redux/selectors';
import { getOptionValues } from '../serializer';
import CustomLabelHeading from '../../../components/CustomLabelHeading';
import CustomEditComment from '../../../components/CustomEditComment';
import CustomAttachmentDocument from '../../../components/CustomAttachmentDocument';
import { getNationalitySelector } from '../../LoginHome/redux/selectors';
import CommentComponent from '../components/CommentComponent';
import AttachmentComponent from '../components/AttachmentComponent';
import { localize } from '../../../locale/utils';

const stateSelector = createStructuredSelector({
  staticData: getStaticDataSelector,
  nationality: getNationalitySelector
});

const BusinessLeaveForm = (props: any) => {
  const { absenceType, handleSubmit } = props || {};
  const { staticData, nationality } = useSelector(stateSelector);

  const { lookups: { leaves } = {} } = staticData || {};
  const optionLists =
    leaves?.length > 0
      ? leaves?.find((item) => item?.absenceTypeName?.toLowerCase() === absenceType?.toLowerCase())
          ?.fields
      : [];

  useEffect(() => {
    businessFormData.validateForm();
  }, []);

  const validationSchema = Yup.object().shape({
    reasonForTravel: Yup.string().required(localize('form.warning.reasonForTravelBlank')),
    travelRequestType: Yup.string().required(localize('form.warning.travelRequestTypeBlank')),
    travelType: Yup.string().required(localize('form.warning.travelTypeBlank')),
    dateOfTravel1: Yup.string().required(localize('form.warning.dateOfTravel1Blank')),
    departFrom1: Yup.string().required(localize('form.warning.dateForm1Blank')),
    arriveAt1: Yup.string().required(localize('form.warning.arriveAt1Blank')),
    timeRecommended: Yup.string().required(localize('form.warning.timeRecommendedBlank')),
    perDiem: Yup.string().required(localize('form.warning.perDiemBlank')),
    travelCategory: Yup.string().required(localize('form.warning.travelCategoryBlank'))
  });

  const businessFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      reasonForTravel: '',
      startDate: '',
      endDate: '',
      travelRequestType: '',
      travelType: '',
      dateOfTravel1: '',
      departFrom1: '',
      arriveAt1: '',
      dateOfTravel2: '',
      departFrom2: '',
      arriveAt2: '',
      dateOfTravel3: '',
      departFrom3: '',
      arriveAt3: '',
      timeRecommended: '',
      perDiem: '',
      hotelLocation1: '',
      hotelLocation2: '',
      hotelLocation3: '',
      airlineMembershipNumber: '',
      travelCategory: '',
      comments: '',
      attachments: []
    },
    validationSchema,
    onSubmit: () => {
      const data = {
        //startDateDuration and enddateduration is not of anyuse
        startDate: businessFormData?.values?.startDate,
        startDateDuration: '1',
        endDate: businessFormData?.values?.endDate,
        endDateDuration: '1',
        absenceStatusCd: 'SUBMITTED',
        comments: businessFormData?.values?.comments || '',
        absenceRecordingDFF: [
          {
            __FLEX_Context: '300000015387301',
            __FLEX_Context_DisplayValue: 'Bussines Travel',
            reasonForTravel: businessFormData?.values?.reasonForTravel,
            travelRequestType: businessFormData?.values?.travelRequestType,
            travelType: businessFormData?.values?.travelType,
            dateOfTravel1: businessFormData?.values?.dateOfTravel1,
            departFrom1: businessFormData?.values?.departFrom1,
            arriveAt1: businessFormData?.values?.arriveAt1,
            dateOfTravel2: businessFormData?.values?.dateOfTravel2,
            departFrom2: businessFormData?.values?.departFrom2,
            arriveAt2: businessFormData?.values?.arriveAt2,
            timeRecommended: businessFormData?.values?.timeRecommended,
            perDiem: businessFormData?.values?.perDiem,
            travelCategory: businessFormData?.values?.travelCategory,
            nationality: nationality || 'SA',
            dateOfTravel3: businessFormData?.values?.dateOfTravel3,
            departFrom3: businessFormData?.values?.departFrom3,
            arriveAt3: businessFormData?.values?.arriveAt3,
            hotelLocation: businessFormData?.values?.hotelLocation1,
            hotelLocation2: businessFormData?.values?.hotelLocation2,
            hotelLocation3: businessFormData?.values?.hotelLocation3,
            airlineMembershipNumber: businessFormData?.values?.airlineMembershipNumber
          }
        ],
        attachments: businessFormData?.values?.attachments
      };
      handleSubmit(data);
    }
  });

  const handleOnSubmit = () => {
    if (absenceType) {
      if (!isEmpty(businessFormData.errors)) {
        const errorText = Object.keys(businessFormData.errors)[0];
        alertBox(localize('common.warning'), businessFormData.errors[errorText]);
      } else {
        businessFormData.submitForm();
      }
    } else {
      alertBox(localize('common.warning'), localize('form.typeCannotBeEmpty'));
    }
  };

  const handleDocuments = (data) => {
    businessFormData?.setFieldValue('attachments', data);
  };

  return (
    <View style={styles.pageContainer}>
      <CustomTextInput
        label={localize('form.reasonForTravel')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.reasonForTravel}
        onChangeHandler={(value) => businessFormData.setFieldValue('reasonForTravel', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={0}
        containerStyle={{ paddingHorizontal: RfW(24) }}
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.startDate ? new Date(businessFormData?.values?.startDate) : ''
        }
        label={localize('form.startDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) > new Date(businessFormData?.values?.endDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.startDateSholdNotBeGrterEndDate')
            );
            return;
          }
          businessFormData.setFieldValue('startDate', moment(date).format('YYYY-MM-DD'));
        }}
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.endDate ? new Date(businessFormData?.values?.endDate) : ''
        }
        label={localize('form.endDate')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          if (new Date(date) < new Date(businessFormData?.values?.startDate)) {
            alertBox(
              localize('common.warning'),
              localize('warning.endDateSholdNotBeLessStartDate')
            );
            return;
          }
          businessFormData.setFieldValue('endDate', moment(date).format('YYYY-MM-DD'));
        }}
      />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={getOptionValues('Travel Request Type', optionLists)}
        isCard={false}
        label={localize('form.travelRequestType')}
        placeholder={localize('form.selectAValue')}
        onChange={(item) => {
          businessFormData.setFieldValue('travelRequestType', item?.value);
        }}
      />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={getOptionValues('Travel Type', optionLists)}
        isCard={false}
        label={localize('form.travelType')}
        placeholder={localize('form.selectAValue')}
        onChange={(item) => {
          businessFormData.setFieldValue('travelType', item?.value);
        }}
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.dateOfTravel1
            ? new Date(businessFormData?.values?.dateOfTravel1)
            : ''
        }
        label={localize('form.dateOfTravel1')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          businessFormData.setFieldValue('dateOfTravel1', moment(date).format('YYYY-MM-DD'));
        }}
      />
      <CustomTextInput
        label={localize('form.departFrom1')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.departFrom1}
        onChangeHandler={(value) => businessFormData.setFieldValue('departFrom1', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
      />
      <CustomTextInput
        label={localize('form.arriveat1')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.arriveAt1}
        onChangeHandler={(value) => businessFormData.setFieldValue('arriveAt1', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.dateOfTravel2
            ? new Date(businessFormData?.values?.dateOfTravel2)
            : ''
        }
        label={localize('form.dateOfTravel2')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          businessFormData.setFieldValue('dateOfTravel2', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomTextInput
        label={localize('form.departFrom2')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.departFrom2}
        onChangeHandler={(value) => businessFormData.setFieldValue('departFrom2', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />
      <CustomTextInput
        label={localize('form.arriveat2')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.arriveAt2}
        onChangeHandler={(value) => businessFormData.setFieldValue('arriveAt2', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />

      <CustomDatePicker
        selectedDate={
          businessFormData?.values?.dateOfTravel3
            ? new Date(businessFormData?.values?.dateOfTravel3)
            : ''
        }
        label={localize('form.dateOfTravel3')}
        placeholder={localize('form.selectDate')}
        onPressDate={(date) => {
          businessFormData.setFieldValue('dateOfTravel3', moment(date).format('YYYY-MM-DD'));
        }}
        isMandatory={false}
      />
      <CustomTextInput
        label={localize('form.departFrom3')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.departFrom3}
        onChangeHandler={(value) => businessFormData.setFieldValue('departFrom3', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />
      <CustomTextInput
        label={localize('form.arriveat3')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.arriveAt3}
        onChangeHandler={(value) => businessFormData.setFieldValue('arriveAt3', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />

      <CustomTextInput
        label={localize('form.timeRecommended')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.timeRecommended}
        onChangeHandler={(value) => businessFormData.setFieldValue('timeRecommended', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
      />

      <View style={styles.fieldSeperatorStyle} />
      <CustomDropDown
        data={getOptionValues('Per Diem', optionLists)}
        isCard={false}
        label={localize('form.perDiem')}
        placeholder={localize('form.selectAValue')}
        onChange={(item) => {
          businessFormData.setFieldValue('perDiem', item?.value);
        }}
      />

      <CustomTextInput
        label={localize('form.hotelLocation1')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.hotelLocation1}
        onChangeHandler={(value) => businessFormData.setFieldValue('hotelLocation1', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />

      <CustomTextInput
        label={localize('form.hotelLocation2')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.hotelLocation2}
        onChangeHandler={(value) => businessFormData.setFieldValue('hotelLocation2', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />

      <CustomTextInput
        label={localize('form.hotelLocation3')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.hotelLocation3}
        onChangeHandler={(value) => businessFormData.setFieldValue('hotelLocation3', value)}
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />

      <CustomTextInput
        label={localize('form.airlineMembershipNumber')}
        placeholder={''}
        textInputStyle={styles.textInputSty}
        value={businessFormData.values.airlineMembershipNumber}
        onChangeHandler={(value) =>
          businessFormData.setFieldValue('airlineMembershipNumber', value)
        }
        returnKeyType={'next'}
        autoCapitalize={'none'}
        topMargin={20}
        containerStyle={{ paddingHorizontal: RfW(24) }}
        isMandatory={false}
      />

      <View style={{ paddingTop: RfH(20), paddingHorizontal: RfW(24) }}>
        <CustomText
          fontSize={12}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(16),
            color: getColorWithOpacity(Colors.white, 0.6)
          }}>
          {`*${localize('form.travelCategory')}`}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <FlatList
            data={getOptionValues('Travel Category', optionLists)}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              const data = item?.value;
              return (
                <CustomRadioButton
                  icon={
                    businessFormData?.values?.travelCategory === data
                      ? Images.radioButtonActive
                      : Images.radioButtonInactive
                  }
                  labelText={data || ''}
                  containerStyle={{ width: '50%', paddingTop: RfH(10) }}
                  onSelect={() => businessFormData.setFieldValue('travelCategory', data)}
                />
              );
            }}
          />
        </View>
      </View>

      <CommentComponent
        onCommentChange={(text) => {
          businessFormData.setFieldValue('comments', text);
        }}
        absenceType={absenceType}
      />

      <AttachmentComponent handleDocuments={handleDocuments} absenceType={absenceType} />

      <CustomText
        fontSize={12}
        color={Colors.white}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(16),
          paddingHorizontal: RfW(24),
          paddingTop: RfH(20),
          paddingBottom: RfH(5)
        }}>
        {localize('form.businessTravelNotes')}
      </CustomText>
      <CustomText
        fontSize={12}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(16),
          paddingHorizontal: RfW(24),
          color: Colors.grayTwo
        }}>
        {localize('form.perDiemNotes')}
      </CustomText>

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
    ...CommonStyles.regularFont400Style
    // paddingBottom: -10
  },
  fieldSeperatorStyle: {
    paddingTop: RfH(20)
  },
  buttonContainer: {
    paddingHorizontal: RfW(32),
    marginTop: RfH(21)
  }
});

export default BusinessLeaveForm;
