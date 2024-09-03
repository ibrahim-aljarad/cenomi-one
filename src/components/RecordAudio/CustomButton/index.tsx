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
          style={[
            styles.buttonContainer,
            btnContainerStyle,
            isOutline && { backgroundColor: Colors.transparent, borderWidth: 1 }
          ]}
          onPress={handleOnSubmit}>
          <Text style={[styles.buttonLabel, isOutline && { color: Colors.black }]}>
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
