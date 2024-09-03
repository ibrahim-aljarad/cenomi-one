import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const HomeHeaderSkeleton = (props) => {
  const list = ['', '', ''];

  return (
    <View
      style={{
        paddingLeft: RfW(25),
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item width={RfH(50)} height={RfH(50)} borderRadius={RfH(24)} />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item width={RfH(200)} height={RfH(24)} marginLeft={RfW(12)} />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default HomeHeaderSkeleton;
