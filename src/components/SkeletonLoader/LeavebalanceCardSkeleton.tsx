import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const LeavebalanceCardSkeleton = (props: any) => {
  const { isDarkMode } = props || {};

  return (
    <View
      style={{
        paddingTop: RfH(13),
        alignItems: 'center',
        paddingHorizontal: RfW(22)
      }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(327)}
          height={RfH(270)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default LeavebalanceCardSkeleton;
