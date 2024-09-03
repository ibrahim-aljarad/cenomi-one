import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText } from '../../../../components';
import AppPrimaryOutLineButton from '../../../../components/AppPrimaryOutLineButton';
import CustomModal from '../../../../components/CustomModal';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../../utils/analytics';
import { LEAVE_STATUS } from '../../../../utils/constants';
import { RfH, RfW } from '../../../../utils/helpers';
import { getAbsenseBalance, getAbsenseData, putCancelAbsense } from '../../redux/actions';
import { cancelledAbsenseDataSelector } from '../../redux/selectors';
import CancelRequestModal from '../CancelRequestModal';
import styles from './styles';
import RequestStatusBadge from '../../../../components/RequestStatusBadge';
import { isDarkModeSelector } from '../../../redux/selectors';
import { localize } from '../../../../locale/utils';
import { getColorWithOpacity } from '../../../../utils/helper';

const stateStructure = createStructuredSelector({
  cancelledAbsenseData: cancelledAbsenseDataSelector,
  isDarkMode: isDarkModeSelector
});

const RecentlyAppliedListItems = (props: any) => {
  const { leaveItem, onPress, isCompleted } = props;
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const [cancelApiTrigger, setCancelApiTrigger] = useState(false);

  const { cancelledAbsenseData, isDarkMode } = useSelector(stateStructure);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cancelledAbsenseData && cancelApiTrigger) {
      setCancelApiTrigger(false);
      setIsShowSuccessModal(true);
    }
  }, [cancelledAbsenseData]);

  const onPressCancel = () => {
    trackEvent(EVENT_NAME.PRESSED_LEAVE_CANCEL);
    setIsVisibleCancelModal(true);
  };

  let duration =
    leaveItem?.absenceDispStatus !== LEAVE_STATUS.ORA_WDRWL_PEND
      ? leaveItem?.formattedDuration
      : '';

  const cancelButtonSection = (status) => {
    if (
      status === LEAVE_STATUS.REJECTED ||
      status === LEAVE_STATUS.CANCELED ||
      status === LEAVE_STATUS.DENIED ||
      status === LEAVE_STATUS.ORA_WDRWL_PEND
    ) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          marginTop: RfH(14),
          justifyContent: 'flex-end',
          alignContent: 'flex-end'
        }}>
        <View
          style={{
            alignItems: 'flex-end'
          }}>
          <AppPrimaryOutLineButton
            width={RfW(111)}
            height={RfH(32)}
            borderRadius={BorderRadius.BR0}
            buttonText={localize('common.cancelC')}
            onPress={onPressCancel}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => onPress(leaveItem)}
        style={[
          styles.requestCellView,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeButton
              : getColorWithOpacity(Colors.midnightExpress, 0.24)
          }
        ]}>
        <View style={[styles.topHeader, { borderColor: Colors.grayLine }]}>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(22),
              width: '40%'
            }}>
            {duration || ''}
          </CustomText>

          <RequestStatusBadge status={leaveItem.absenceDispStatus} />
        </View>

        <View style={styles.cellContainerView}>
          {/* <CustomText
            fontSize={12}
            color={Colors.app_black}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              paddingBottom: RfH(4),
            }}
            numberOfLines={2}>
            {'CENOMI Unpaid Leave'}
          </CustomText> */}
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(22)
            }}
            numberOfLines={2}>
            {leaveItem?.absenceType || localize('leave.businessRequirements')}
          </CustomText>

          <View
            style={{
              marginTop: RfH(10),
              flex: 1,
              flexDirection: 'row'
            }}>
            <View style={{ flex: 1 }}>
              <CustomText
                fontSize={12}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {localize('form.startDate')}
              </CustomText>
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {leaveItem.startDate ? moment(leaveItem.startDate).format('DD-MMM-YYYY') : ''}
              </CustomText>
            </View>
            <View style={{ flex: 1 }}>
              <CustomText
                fontSize={12}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {localize('form.endDate')}
              </CustomText>
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(22)
                }}>
                {leaveItem.endDate ? moment(leaveItem.endDate).format('DD-MMM-YYYY') : ''}
              </CustomText>
            </View>
          </View>

          {cancelButtonSection(leaveItem.absenceDispStatus)}
        </View>
      </TouchableOpacity>
      <CancelRequestModal
        isDarkMode={isDarkMode}
        item={leaveItem}
        isVisible={isVisibleCancelModal}
        handleClose={() => setIsVisibleCancelModal(false)}
        onPressCancelSubmitButton={({ data }) => {
          setIsVisibleCancelModal(false);
          setCancelApiTrigger(true);
          dispatch(putCancelAbsense.trigger({ data }));
        }}
      />
      <CustomModal
        title={localize('leave.cancelSuccessMsg')}
        modalVisible={isShowSuccessModal}
        onRequestClose={() => setIsShowSuccessModal(false)}
        onRequestActionButton={() => {
          dispatch(getAbsenseBalance.trigger({ isSilentCall: false }));
          dispatch(getAbsenseData.trigger({ isSilentCall: false }));
        }}
      />
    </>
  );
};

RecentlyAppliedListItems.propTypes = {
  leaveItem: PropTypes.object,
  onPress: PropTypes.func,
  isCompleted: PropTypes.bool,
  cancelledSuccessful: PropTypes.func
};
RecentlyAppliedListItems.defaultProps = {
  onPress: null,
  leaveItem: {},
  isCompleted: false,
  cancelledSuccessful: null
};
export default RecentlyAppliedListItems;
