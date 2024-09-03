import { TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, HEIGHT, WIDTH } from '../../theme';
import Modal from 'react-native-modal';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import { BorderRadius } from '../../theme/sizes';
import { localize } from '../../locale/utils';

function AppModal(props) {
  const { isVisible, handleCancelClick, childContainer, isShowTopBar, isLoading } = props;

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      onSwipeComplete={handleCancelClick}
      swipeDirection="down"
      propagateSwipe={true}
      onRequestClose={handleCancelClick}>
      <Loader isLoading={isLoading} text={localize('components.pleaseWait')} />
      <TouchableWithoutFeedback style={styles.inrContainer} onPress={handleCancelClick}>
        <View style={styles.childContainer}>
          <View style={styles.innerContainer}>
            {isShowTopBar && (
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelClick}>
                <View style={styles.slashText} />
              </TouchableOpacity>
            )}
            {childContainer}
            <View style={{ height: HEIGHT.H50 }} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inrContainer: {
    flex: 1
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end'
    // marginTop: -HEIGHT.H180,
  },
  innerContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0,
    width: '100%'
  },
  cancelButton: {
    paddingTop: HEIGHT.H20,
    alignItems: 'center'
  },
  slashText: {
    height: HEIGHT.H5,
    backgroundColor: Colors.lightGrey219,
    width: HEIGHT.H50,
    borderRadius: BorderRadius.BR0
  }
});

AppModal.propTypes = {
  isVisible: PropTypes.bool,
  handleClick: PropTypes.func,
  handleCancelClick: PropTypes.func,
  childContainer: PropTypes.any,
  isShowTopBar: PropTypes.bool
};
AppModal.defaultProps = {
  isVisible: false,
  handleClick: null,
  childContainer: null,
  handleCancelClick: null,
  isShowTopBar: true
};
export default AppModal;
