import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const LabelSkeleton = (props: any) => {
  const { isDarkMode, containerStyle = {} } = props || {};

  return (
    <View style={containerStyle}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(150)}
          height={RfH(20)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default LabelSkeleton;
