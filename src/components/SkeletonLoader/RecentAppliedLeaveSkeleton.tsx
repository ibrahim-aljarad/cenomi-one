import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const RecentAppliedLeaveSkeleton = (props: any) => {
  const { isDarkMode } = props || {};
  const list = ['', '', ''];

  return (
    <View
      style={{
        paddingTop: RfH(13),
        alignItems: 'center',
        paddingHorizontal: RfW(22)
      }}>
      {list?.map((_, index) => {
        return (
          <SkeletonPlaceholder
            key={index.toString()}
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(327)}
              height={RfH(175)}
              marginBottom={RfH(16)}
              alignItems="center"
              justifyContent="center"
            />
          </SkeletonPlaceholder>
        );
      })}
    </View>
  );
};

export default RecentAppliedLeaveSkeleton;
