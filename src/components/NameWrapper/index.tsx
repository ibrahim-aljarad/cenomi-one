import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { isEmpty } from 'lodash';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';
import { Colors } from '../../theme';

function NameWrapper(props) {
  const {
    height,
    width,
    fontSize,
    name,
    clickHandler,
    backgroundColor,
    styling,
    textStyle,
    isDarkMode
  } = props;

  const getName = () => {
    let nameInitials = '';
    if (!isEmpty(name)) {
      const nameArray = name.replace(/\s\s+/g, ' ').split(' ');
      if (nameArray.length > 1) {
        nameInitials = `${!isEmpty(nameArray[0]) ? nameArray[0].charAt(0) : ''}${
          !isEmpty(nameArray[1]) ? nameArray[1].charAt(0) : ''
        }`;
      } else {
        nameInitials = `${!isEmpty(nameArray[0]) ? nameArray[0].charAt(0) : ''}`;
      }
    }
    return nameInitials.toUpperCase();
  };

  return (
    <TouchableOpacity
      style={[
        styles.headerContainer,
        {
          height: height,
          width: height,
          borderRadius: height / 2,
          backgroundColor: isDarkMode ? Colors.darkModeButton : backgroundColor
        },
        styling
      ]}
      activeOpacity={0.9}
      onPress={clickHandler}>
      <Text
        style={[
          styles.headerText,
          {
            fontSize: RFValue(fontSize, STANDARD_SCREEN_SIZE),
            color: isDarkMode ? Colors.white : Colors.primaryBlack
          },
          textStyle
        ]}>
        {getName()}
      </Text>
    </TouchableOpacity>
  );
}

NameWrapper.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.number,
  name: PropTypes.string,
  backgroundColor: PropTypes.string,
  styling: PropTypes.any,
  textStyle: PropTypes.any,
  isDarkMode: PropTypes.bool
};

NameWrapper.defaultProps = {
  fontSize: 10,
  height: 20,
  width: 20,
  name: '',
  clickHandler: null,
  backgroundColor: Colors.white,
  styling: {},
  textStyle: {},
  isDarkMode: false
};

export default NameWrapper;
