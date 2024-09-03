import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { deviceWidth } from '../../utils/helpers';
import AppPrimaryButton from '../AppPrimaryButton';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomModal = (props: any) => {
  const {
    modalVisible,
    onRequestClose,
    onRequestActionButton,
    title = '',
    subTitle = '',
    children,
    modalStyle,
    customContainer = {}
  } = props || {};

  const { isDarkMode } = useSelector(stateSelector);

  const onPressButton = () => {
    onRequestClose();
    onRequestActionButton && onRequestActionButton();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={{ ...styles.centeredView, ...customContainer, flex: 1 }}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: isDarkMode
                  ? Colors.darkModeBackground
                  : Colors.modalForegroundColor,
                ...modalStyle
              }
            ]}>
            {children ? (
              children
            ) : (
              <View
                style={{
                  paddingTop: RfH(15),
                  ...styles.modalView
                }}>
                <CustomImage
                  image={Images.icCheckTick}
                  imageWidth={RfW(23)}
                  imageHeight={RfH(14)}
                  imageResizeMode={'contain'}
                  displayLoader={false}
                  containerStyling={{
                    backgroundColor: Colors.white,
                    height: RfW(60),
                    width: RfW(60),
                    borderRadius: RfW(30),
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  tintColor={Colors.darkPurple}
                />
                <CustomText
                  fontSize={20}
                  color={Colors.white}
                  styling={{
                    ...CommonStyles.regularFont500Style,
                    lineHeight: RfH(22),
                    paddingTop: RfH(15),
                    textAlign: 'center'
                  }}>
                  {title || ''}
                </CustomText>
                {subTitle ? (
                  <CustomText
                    fontSize={14}
                    color={Colors.white}
                    styling={{
                      ...CommonStyles.regularFont400Style,
                      lineHeight: RfH(22),
                      paddingTop: RfH(15),
                      paddingHorizontal: RfW(40),
                      textAlign: 'center'
                    }}>
                    {subTitle || ''}
                  </CustomText>
                ) : null}

                <View style={{ marginTop: RfH(35), width: '100%' }}>
                  <AppPrimaryButton buttonText={localize('common.doneC')} onPress={onPressButton} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalLayoutColor
  },
  modalView: {
    width: deviceWidth() - RfW(46),
    // backgroundColor: 'white',
    borderRadius: BorderRadius.BR10,
    paddingHorizontal: RfH(9),
    paddingBottom: RfH(9),
    alignItems: 'center'
  }
});

export default CustomModal;
