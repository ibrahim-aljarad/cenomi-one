import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';

import { View, StyleSheet, Image } from 'react-native';
import CustomText from '../CustomText';
import { Colors } from '../../theme';

const CustomTooltip = (props: any) => {
  const { isDarkMode, isVisible, onClose, tooltipText = '', children } = props || {};

  return (
    <Tooltip
      isVisible={isVisible}
      content={
        <View>
          <CustomText> {tooltipText} </CustomText>
        </View>
      }
      contentStyle={{ backgroundColor: isDarkMode ? Colors.darkModeDisabledColor : Colors.white }}
      onClose={onClose}
      placement="bottom">
      {children}
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  iconTooltipContainer: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  popoverStyle: {
    fontSize: 19,
    color: '#333333'
  },
  tooltipContainerStyle: {
    left: 11,
    width: '95%',
    height: 150,
    backgroundColor: '#0ABAA6'
  },
  tooltipIcon: {
    width: 32,
    height: 32
  }
});

export default CustomTooltip;
