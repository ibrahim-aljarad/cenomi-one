import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { HeaderSVG } from '../../../components';
import CustomDropDown from '../../../components/CustomDropdown';
import CustomModal from '../../../components/CustomModal';
import { Colors } from '../../../theme';
import { RfH } from '../../../utils/helper';
import { hrApplyLeave } from '../redux/actions';
import {
  applyLeaveSuccessDataSelector,
  getAbsenseReasonDataSelector,
  getAbsenseTypeListSelector
} from '../redux/selectors';
import BusinessLeaveForm from './BusinessLeaveForm';
import CommonForm from './CommonForm';
import MaternityLeaveForm from './MaternityLeaveForm';
import TimeCardAdjustmentForm from './TimeCardAdjustmentForm';
import TrainingLeaveForm from './TrainingLeaveForm';
import styles from './styles';
import ACCAnnualLeaveForm from './ACCAnnualLeaveForm';
import CommonWithTimeForm from './CommonWithTimeForm';
import { isAttachmentCompulsory } from '../serializer';
import { alertBox, isDisplayWithNotch } from '../../../utils/helpers';
import { getUserTypeSelector } from '../../LoginHome/redux/selectors';
import KSAAFRSickLeave from './KSAAFRSickLeaveForm';
import { isDarkModeSelector } from '../../redux/selectors';
import { localize } from '../../../locale/utils';
import CustomInAppReview from '../../../components/CustomInAppReview';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import WrapperContainer from '../../../components/WrapperContainer';

const stateSructure = createStructuredSelector({
  absenseTypeList: getAbsenseTypeListSelector,
  applyLeaveSuccessData: applyLeaveSuccessDataSelector,
  absenseReason: getAbsenseReasonDataSelector,
  isDarkMode: isDarkModeSelector
});

const ApplyLeave = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { absenseTypeList, applyLeaveSuccessData, absenseReason, isDarkMode } =
    useSelector(stateSructure);

  const [absenseTypeDataList, setAbsenseTypeDataList] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [leaveTypeId, setLeaveTypeId] = useState('');
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [applyButtonPressed, setApplyButtonPressed] = useState(false);
  const [absenseReasonListAbsenceTypeWise, setAbsenceReeasonListAbsenceTypeWise] = useState([]);
  const [isShowInAppReview, setIsShowInAppReview] = useState(false);

  useEffect(() => {
    if (absenseReason && absenseReason?.length > 0) {
      const filteredReason = absenseReason?.filter((item) => item?.AbsenceTypeId === leaveTypeId);
      setAbsenceReeasonListAbsenceTypeWise(filteredReason);
    }
  }, [leaveTypeId]);

  useEffect(() => {
    if (absenseTypeList) {
      const modifiedData = absenseTypeList?.map((item) => {
        return {
          label: item?.AbsenceTypeName,
          value: item?.AbsenceTypeName,
          AbsenceTypeId: item?.AbsenceTypeId
        };
      });

      setAbsenseTypeDataList(modifiedData);
    }
  }, [absenseTypeList]);

  useEffect(() => {
    if (!isEmpty(applyLeaveSuccessData) && applyButtonPressed) {
      // Show success modal
      setApplyButtonPressed(false);
      setIsSuccessModal(true);

      // Show inapp review modal
      setIsShowInAppReview(true);
    }
  }, [applyLeaveSuccessData]);

  const handleOnSubmit = (formData) => {
    if (
      isAttachmentCompulsory(leaveType) &&
      (!formData?.attachments || formData?.attachments?.length < 1)
    ) {
      //Through error message
      alertBox(
        localize('form.warning.attachmentMandatory'),
        localize('form.warning.attachmentMandatoryDesc')
      );
      return;
    }
    let finalData = {
      absenceType: leaveType
    };

    if (formData?.attachments) {
      if (formData?.attachments?.length > 0) {
        finalData = { ...finalData, attachments: formData?.attachments };
      }
      delete formData?.attachments;
    }

    finalData = {
      ...finalData,
      payload: formData
    };

    setApplyButtonPressed(true);
    dispatch(hrApplyLeave.trigger({ data: finalData }));
  };

  const restForm = () => {
    if (leaveType) {
      switch (leaveType) {
        case 'KSA AFR Business Travel':
          return <BusinessLeaveForm absenceType={leaveType} handleSubmit={handleOnSubmit} />;

        case 'KSA AFR Paternity Leave':
        case 'KSA AFR Maternity Leave':
          return <MaternityLeaveForm absenceType={leaveType} handleSubmit={handleOnSubmit} />;

        case 'KSA AFR Time Card Adjustment':
          return (
            <TimeCardAdjustmentForm
              absenceType={leaveType}
              absenseReason={absenseReasonListAbsenceTypeWise}
              handleSubmit={handleOnSubmit}
            />
          );
        case 'KSA AFR Training Leave':
          return <TrainingLeaveForm absenceType={leaveType} handleSubmit={handleOnSubmit} />;
        case 'KSA AFR Sick Leave':
          return (
            <KSAAFRSickLeave
              absenceType={leaveType}
              absenseReason={absenseReasonListAbsenceTypeWise}
              handleSubmit={handleOnSubmit}
            />
          );
        case 'ACC Annual Leave':
        case 'ACC Half Day Leave':
          return <ACCAnnualLeaveForm absenceType={leaveType} handleSubmit={handleOnSubmit} />;
        case 'Business Mission':
        case 'Excuse Leave':
        case 'Half Day':
        case 'Half Day Leave.':
        case 'Half Day Leave':
          return <CommonWithTimeForm absenceType={leaveType} handleSubmit={handleOnSubmit} />;

        default:
          return (
            <CommonForm absenceType={leaveType} handleSubmit={handleOnSubmit} />
            // <TimeCardAdjustmentForm
            //   absenceType={leaveType}
            //   absenceTypeId={leaveTypeId}
            //   handleSubmit={handleOnSubmit}
            // />
          );
      }
    }

    return <></>;
  };

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
          isRightButtonVisible={true}
          isBackButtonVisible={true}
          titleText={leaveType || localize('leave.leaveApply')}
          titleFont={20}
          onRightButtonClickHandler={() => {}}
          onBackPressHandler={() => navigation.goBack()}
          isRight2BtnVisible={true}
        />
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enableOnAndroid
          extraHeight={Platform.OS === 'ios' ? (isDisplayWithNotch() ? RfH(60) : RfH(100)) : 0}
          extraScrollHeight={RfH(35)}
          keyboardDismissMode="on-drag">
          <View
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent,

              paddingVertical: RfH(25)
            }}>
            <CustomDropDown
              data={absenseTypeDataList || []}
              isCard={false}
              label={localize('leave.type')}
              placeholder={localize('leave.selectType')}
              onChange={(item) => {
                setLeaveType(item?.value);
                setLeaveTypeId(item?.AbsenceTypeId);
              }}
            />
            {restForm()}
          </View>
        </KeyboardAwareScrollView>
        {isSuccessModal ? (
          <CustomModal
            title={localize('leave.successMsg')}
            modalVisible={isSuccessModal}
            onRequestClose={() => setIsSuccessModal(false)}
            onRequestActionButton={() => navigation.goBack()}
          />
        ) : null}

        {isShowInAppReview ? (
          <CustomInAppReview
            isShow={isShowInAppReview}
            onDone={() => setIsShowInAppReview(false)}
          />
        ) : null}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default ApplyLeave;
