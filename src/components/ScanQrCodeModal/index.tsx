import PropTypes from 'prop-types';
import React from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { CustomText, IconButtonWrapper } from '..';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import styles from './styles';
import { localize } from '../../locale/utils';

function ScanQrCodeModal(props) {
  const { isVisible, openModal, onClick, module, title, qrCodeData, isDarkMode } = props;

  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
        }
      ]}>
      <View
        style={{
          width: RfW(50),
          height: RfH(5),
          backgroundColor: Colors.silverColor,
          alignSelf: 'center',
          borderRadius: BorderRadius.BR0
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: RfH(25)
        }}>
        <CustomText color={Colors.blackFour} fontSize={20} styling={CommonStyles.mediumFontStyle}>
          {title}
        </CustomText>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={openModal}
          style={{ marginRight: RfW(-12), padding: RfH(12) }}>
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={isDarkMode ? Images.crossWhite : Images.crossBlack}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={openModal} />
      <View style={styles.innerView}>
        {modalHeader()}
        <View
          style={{
            paddingTop: RfW(24),
            alignItems: 'center',
            paddingHorizontal: 50,
            paddingBottom: RfH(40),
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
          }}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.white : Colors.transparent,
              padding: RfH(5)
            }}>
            <QRCode
              value={qrCodeData}
              size={deviceWidth() - RfW(120)}
              // logo={Images.clientLogoCircle}
              logoSize={RfW(82)}
              logoBackgroundColor={'transparent'}
            />
          </View>
          <CustomText
            fontSize={14}
            color={Colors.app_black}
            styling={{
              marginTop: RfH(40),

              textAlign: 'center',
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {localize('profile.askYourFriendShareMsg')}
          </CustomText>
        </View>
      </View>
    </View>
  );

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={openModal}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

ScanQrCodeModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  onClick: PropTypes.func,
  qrCodeData: PropTypes.string,
  title: PropTypes.string
};
ScanQrCodeModal.defaultProps = {
  isVisible: false,
  openModal: null,
  onClick: null
};
export default ScanQrCodeModal;
