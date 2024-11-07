import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import CustomText from '../CustomText';
import { APPROVER_STATUS_COLORS, formatRole, formatStatus, getApproverStatusStyle } from '../../containers/DiscrepancyList/util';
import { Colors, CommonStyles } from '../../theme';
import styles from './styles';

type ApproverModalProps = {
  visible: boolean;
  onClose: () => void;
  operation: any;
}

const ApproverModal = ({visible, onClose, operation }: ApproverModalProps) => {
    if (!visible) return null;

    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={onClose}
        animationType="fade"
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={onClose}
        >
          <View style={styles.popoverContent}>
            <CustomText
              fontSize={16}
              color={Colors.black}
              styling={CommonStyles.boldFontStyle}
            >
              {formatRole(operation?.assigned_role)}
            </CustomText>

            <View style={[
              styles.statusContainer,
              getApproverStatusStyle(operation?.status)
            ]}>
              <CustomText
                fontSize={14}
                color={APPROVER_STATUS_COLORS[operation?.status]?.border || '#757575'}
                styling={CommonStyles.regularFont500Style}
              >
                {formatStatus(operation?.status)}
              </CustomText>
            </View>
          </View>
        </Pressable>
      </Modal>
    );
}

export default ApproverModal
