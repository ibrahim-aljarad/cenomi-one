import React from 'react';
import { Switch } from 'react-native';
import { Colors } from '../../theme';

const CustomSwitch = (props: any) => {
  const {
    disabled,
    trackColor,
    thumbColor,
    ios_backgroundColor,
    onValueChange,
    value,
    ...restProps
  } = props || {};

  return (
    <Switch
      disabled={disabled}
      trackColor={
        trackColor || {
          false: Colors.voiletLight,
          true: Colors.primary
        }
      }
      thumbColor={thumbColor || Colors.white}
      ios_backgroundColor={ios_backgroundColor || Colors.voiletLight}
      onValueChange={onValueChange}
      value={value}
      {...restProps}
    />
  );
};

export default CustomSwitch;
