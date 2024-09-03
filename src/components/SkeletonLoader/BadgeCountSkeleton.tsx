import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const BadgeCountSkeleton = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeBorder : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item width={RfH(24)} height={RfH(24)} borderRadius={RfH(12)} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default BadgeCountSkeleton;
