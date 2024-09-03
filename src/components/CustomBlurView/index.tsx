import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { getColorWithOpacity } from '../../utils/helper';
import { Colors } from '../../theme';

const CustomBlurView = ({
  children,
  style = {},
  disabled = false,
  activeOpacity = 1,
  onPress = () => {}
}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress} disabled={disabled}>
      <BlurView
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor={getColorWithOpacity(Colors.midnightExpress, 0.24)}
        style={style}>
        {children}
      </BlurView>
    </TouchableOpacity>
  );
};

export default CustomBlurView;
