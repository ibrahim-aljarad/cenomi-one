import React from 'react';
import CustomModal from '../../../components/CustomModal';
import { CustomText } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { RfH } from '../../../utils/helper';
import { localize } from '../../../locale/utils';
import { View } from 'react-native';
import AppPrimaryButton from '../../../components/AppPrimaryButton';

const YouDontHaveAccessModal = (props: any) => {
  const { isVisible, onRequestClose } = props || {};
  return (
    <CustomModal modalVisible={isVisible} onRequestClose={onRequestClose}>
      <CustomText
        fontSize={14}
        color={Colors.white}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(22),
          top: RfH(10),
          textAlign: 'center'
        }}>
        {localize('common.youdontHaveAccess')}
      </CustomText>

      <View style={{ marginTop: RfH(22), width: '100%' }}>
        <AppPrimaryButton buttonText={localize('common.okay')} onPress={onRequestClose} />
      </View>
    </CustomModal>
  );
};

export default YouDontHaveAccessModal;
