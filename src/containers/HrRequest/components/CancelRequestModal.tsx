import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { CustomText, IconButtonWrapper } from '../../../components';
import CustomEditComment from '../../../components/CustomEditComment';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import moment from 'moment';
import { alertBox } from '../../../utils/helpers';
import { BorderRadius } from '../../../theme/sizes';
import { localize } from '../../../locale/utils';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import { Shadow } from 'react-native-shadow-2';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const CancelRequestModal = (props: any) => {
  const { item, isDarkMode, isVisible, handleClose, onPressCancelSubmitButton } = props || {};
  const [comments, setComments] = useState('');
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);

  const insets = useSafeAreaInsets();

  const onPressClose = () => {
    setComments('');
    handleClose && handleClose();
  };

  const onPressSubmit = () => {
    if (comments) {
      const data = {
        absenceId: item?.personAbsenceEntryId,
        comments
      };
      onPressCancelSubmitButton({ data });
    } else {
      alertBox(localize('common.warning'), localize('form.warning.commentCannotBeEmpty'));
    }
  };

  const mainView = () => {
    return (
      <View
        style={[
          styles.innerView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }
        ]}>
        <View
          style={{
            paddingTop: RfH(20),
            paddingBottom: RfH(34),
            backgroundColor: getColorWithOpacity(Colors.midnightExpress, 0.4)
          }}>
          <CustomText
            fontSize={12}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(16),
              paddingHorizontal: RfW(24)
            }}>
            {item?.absenceType}
          </CustomText>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(22),
              paddingTop: RfH(6),
              paddingHorizontal: RfW(24)
            }}>
            {`${item?.startDate ? moment(item?.startDate).format('DD-MMM-YYYY') : ''} to ${
              item?.endDate ? moment(item?.endDate).format('DD-MMM-YYYY') : ''
            }`}
          </CustomText>

          <CustomEditComment
            value={comments}
            label={localize('common.comments')}
            placeholder={localize('leave.typeYourComments')}
            onCommentChange={(text) => {
              setComments(text);
            }}
            // backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.white}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingBottom: insets.bottom || RfH(30),
            paddingHorizontal: RfW(32),
            backgroundColor: getColorWithOpacity(Colors.midnightExpress, 0.4)
          }}>
          <AppPrimaryButton buttonText={localize('common.submit')} onPress={onPressSubmit} />
        </View>
      </View>
    );
  };
  return (
    <CustomBottomSheet
      title={localize('leave.leaveCancellation')}
      isVisible={isVisible}
      onRequestClose={onPressClose}>
      <KeyboardAvoidingView
        behavior={Platform.select({ android: 'height', ios: 'padding' })}
        enabled>
        <View style={styles.container}>{mainView()}</View>
      </KeyboardAvoidingView>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end'
    // backgroundColor: Colors.primaryContainerColor // Colors.blueTen,
  },
  innerView: {
    width: '100%',
    backgroundColor: Colors.transparent,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // paddingBottom: RfH(30)
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  }
});

export default CancelRequestModal;
