import React, { FC } from 'react';
import { View } from 'react-native';
import { HEIGHT } from '../../theme';
import COLORS from '../../theme/colors';
import CustomImage from '../CustomImage';

interface TabIconProps {
  focused?: boolean;
  icon: number | undefined;
  tintColor?: string;
}

const TabIcon: FC<TabIconProps> = (props) => {
  const { focused, icon, tintColor = focused ? COLORS.primary : COLORS.inactiveDotColor } = props;
  return (
    <View>
      <CustomImage
        image={icon}
        tintColor={tintColor}
        imageHeight={HEIGHT.H30}
        imageWidth={HEIGHT.H30}
      />
      {focused && <View />}
    </View>
  );
};

export default TabIcon;
