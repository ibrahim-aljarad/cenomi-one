import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import { CustomText, IconButtonWrapper } from '..';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import { BorderRadius } from '../../theme/sizes';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { getColorWithOpacity } from '../../utils/helper';

const countStateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});
function CustomBottomSheet(props: any) {
  const {
    isVisible,
    onRequestClose,
    title,
    children,
    rightIconHeight,
    rightIconWidth,
    isShowBorderBottomHeader,
    headerColor,
    isHideCloseButton,
    innerViewContainer
  } = props;
  const { isDarkMode } = useSelector(countStateSelector);
  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode ? Colors.darkModeBackground : headerColor
        },
        isShowBorderBottomHeader
          ? { borderBottomColor: Colors.silverColor, borderBottomWidth: RfH(1) }
          : {}
      ]}>
      <TouchableOpacity
        disabled={isHideCloseButton}
        style={{
          width: RfW(50),
          height: RfH(5),
          backgroundColor: Colors.silverColor,
          alignSelf: 'center',
          borderRadius: RfW(3)
        }}
        onPress={onRequestClose}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: RfH(15)
          // backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
        }}>
        <CustomText
          color={isDarkMode ? Colors.white : Colors.white}
          fontSize={20}
          styling={CommonStyles.mediumFontStyle}>
          {title}
        </CustomText>
        {isHideCloseButton ? null : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onRequestClose}
            style={{ marginRight: RfW(-12), padding: RfH(12) }}>
            <IconButtonWrapper
              iconWidth={rightIconWidth || RfH(18)}
              iconHeight={rightIconHeight || RfH(18)}
              iconImage={isDarkMode ? Images.crossWhite : Images.crossWhite}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={onRequestClose} />
            <View
              style={[
                styles.innerView,
                innerViewContainer,
                {
                  backgroundColor: isDarkMode
                    ? Colors.darkModeBackground
                    : getColorWithOpacity(Colors.white, 0.15)
                }
              ]}>
              {modalHeader()}
              {children}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

CustomBottomSheet.propTypes = {
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  rightIconHeight: PropTypes.any,
  rightIconWidth: PropTypes.any,
  isShowBorderBottomHeader: PropTypes.bool,
  headerColor: PropTypes.string,
  isHideCloseButton: PropTypes.bool,
  innerViewContainer: PropTypes.object
};
CustomBottomSheet.defaultProps = {
  isVisible: false,
  onRequestClose: null,
  onClick: null,
  title: '',
  children: null,
  rightIconHeight: null,
  rightIconWidth: null,
  isShowBorderBottomHeader: false,
  headerColor: Colors.modalForegroundColor,
  isHideCloseButton: false,
  innerViewContainer: {}
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.modalLayoutColor // Colors.blueTen,
  },
  innerView: {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '94%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    // backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  }
});

export default CustomBottomSheet;
