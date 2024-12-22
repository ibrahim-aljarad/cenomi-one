import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../../theme';
import styles from './styles';

type CustomButtonProps = {
  handleOnSubmit: () => void;
  isOutline?: boolean;
  btnContainerStyle: ViewStyle;
  buttonText: string;
  showSeperator?: boolean;
  bgColor?: string;
  isDisable?: boolean;
};

function CustomButton(props: CustomButtonProps) {
  const {
    handleOnSubmit,
    isOutline = false,
    btnContainerStyle = {},
    buttonText,
    showSeperator,
    bgColor = Colors.transparent,
    isDisable = false
  } = props;

  const getButtonStyle = () => {
    const baseStyle = [
      styles.buttonContainer,
      btnContainerStyle,
      isOutline && { backgroundColor: Colors.transparent, borderWidth: 1 }
    ];

    if (isDisable) {
      baseStyle.push(styles.disabledButton);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [
      styles.buttonLabel,
      isOutline && { color: Colors.black }
    ];

    if (isDisable) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };
  return (
    <View style={{ justifyContent: 'flex-end', backgroundColor: bgColor }}>
      <View
        style={
          showSeperator && {
            borderTopColor: Colors.lightGrey219,
            borderTopWidth: 1
          }
        }>
        <TouchableOpacity
          disabled={isDisable}
          style={getButtonStyle()}
          onPress={handleOnSubmit}>
          <Text style={getTextStyle()}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

CustomButton.propTypes = {
  handleOnSubmit: PropTypes.func,
  isOutline: PropTypes.bool,
  btnContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonText: PropTypes.string,
  showSeperator: PropTypes.bool,
  isDisable: PropTypes.bool,
  bgColor: PropTypes.string
};
CustomButton.defaultProps = {
  handleOnSubmit: null,
  isOutline: false,
  btnContainerStyle: {},
  buttonText: '',
  showSeperator: true,
  isDisable: false,
  bgColor: Colors.transparent
};
export default CustomButton;
