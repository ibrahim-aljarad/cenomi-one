import React from 'react';
import CustomModal from '../CustomModal';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import AppPrimaryButton from '../AppPrimaryButton';
import { StyleSheet, View } from 'react-native';
import { localize } from '../../locale/utils';

type PopupProps = {
  isVisible: boolean;
  messageInfo: any;
  closePopup?: () => void;
  pressedPopupButton: () => void;
  icon?: string;
  buttonText?: string;
};

function CustomPopupModal(props: PopupProps): JSX.Element {
  const {
    isVisible,
    closePopup,
    messageInfo,
    pressedPopupButton,
    icon = null,
    buttonText = null
  } = props;
  return (
    <CustomModal modalVisible={isVisible} onRequestClose={() => closePopup && closePopup()}>
      <>
        <CustomImage
          image={icon || Images.infoIcon}
          imageWidth={60}
          imageHeight={60}
          imageResizeMode={'contain'}
          displayLoader={false}
          containerStyling={{ paddingVertical: RfH(25) }}
        />
        <CustomText
          fontSize={20}
          color={Colors.white}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(22),
            top: -RfH(10)
          }}>
          {messageInfo?.title}
        </CustomText>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(22),
            paddingHorizontal: RfW(40),
            textAlign: 'center'
          }}>
          {messageInfo?.description}
        </CustomText>

        <View style={styles.buttonContainerView}>
          <AppPrimaryButton
            buttonText={localize(buttonText || 'common.tryAgainC')}
            onPress={pressedPopupButton}
          />
        </View>
      </>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  buttonContainerView: { marginTop: RfH(22), width: '100%' }
});

export default CustomPopupModal;
