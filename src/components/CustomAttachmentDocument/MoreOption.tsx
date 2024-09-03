import PropTypes from 'prop-types';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helper';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import IconButtonWrapper from '../IconButtonWrapper';
import { isRTL, localize } from '../../locale/utils';

const MoreOption = (props: any) => {
  const { isVisible, handleClose, clickOnDelete, clickOnViewDoc, isDarkMode } = props || {};

  const onPressDelete = () => (clickOnDelete ? clickOnDelete() : null);
  const onPressViewDoc = () => (clickOnViewDoc ? clickOnViewDoc() : null);

  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
        }
      ]}>
      <View
        style={{
          width: RfW(50),
          height: RfH(5),
          backgroundColor: Colors.silverColor,
          alignSelf: 'center',
          borderRadius: RfW(3)
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: RfH(25)
        }}>
        <CustomText color={Colors.app_black} fontSize={20} styling={CommonStyles.mediumFontStyle}>
          {''}
        </CustomText>
        <TouchableOpacity activeOpacity={0.5} onPress={handleClose}>
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={isDarkMode ? Images.crossWhite : Images.crossBlack}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const mainView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={handleClose} />
        <View
          style={[
            styles.innerView,
            {
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
            }
          ]}>
          {modalHeader()}
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: RfW(24),
                alignItems: 'center'
              }}
              activeOpacity={0.4}
              onPress={onPressViewDoc}>
              <CustomText
                fontSize={18}
                styling={styles.labelStyle}
                color={isDarkMode ? Colors.white : Colors.app_black}>
                {localize('components.viewDocument')}
              </CustomText>
              <CustomImage
                image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                imageWidth={RfH(16)}
                imageHeight={RfH(16)}
                imageResizeMode={'contain'}
                displayLoader={false}
                styling={{
                  overflow: 'hidden'
                }}
                tintColor={isDarkMode ? Colors.white : Colors.black}
              />
            </TouchableOpacity>
            <View
              style={{
                height: RfH(1),
                backgroundColor: Colors.platiniumOne,
                marginVertical: RfH(10),
                marginHorizontal: RfW(24)
              }}
            />

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: RfW(24),
                alignItems: 'center'
              }}
              activeOpacity={0.4}
              onPress={onPressDelete}>
              <CustomText
                fontSize={18}
                styling={styles.labelStyle}
                color={isDarkMode ? Colors.white : Colors.app_black}>
                {localize('common.delete')}
              </CustomText>
              <CustomImage
                image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                imageWidth={RfH(16)}
                imageHeight={RfH(16)}
                imageResizeMode={'contain'}
                displayLoader={false}
                styling={{
                  overflow: 'hidden'
                }}
                tintColor={isDarkMode ? Colors.white : Colors.black}
              />
            </TouchableOpacity>
          </>
        </View>
      </View>
    );
  };
  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={handleClose}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

MoreOption.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
  clickOnDelete: PropTypes.func,
  clickOnViewDoc: PropTypes.func
};

MoreOption.defaultProps = {
  isVisible: false,
  handleClose: null,
  clickOnDelete: null,
  clickOnViewDoc: null
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0,
    paddingBottom: RfH(30)
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  },
  labelStyle: {
    ...CommonStyles.regularFont400Style,
    lineHeight: RfH(16),
    paddingVertical: RfH(5)
  }
});

export default MoreOption;
