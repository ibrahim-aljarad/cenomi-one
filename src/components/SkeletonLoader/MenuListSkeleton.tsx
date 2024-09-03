import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const MenuListSkeleton = (props: any) => {
  const { isDarkMode, listHeight = RfH(64), listWidth = deviceWidth() - RfW(48) } = props || {};
  const list = ['', '', '', '', '', '', '', ''];

  return (
    <View style={{ marginTop: RfH(14), paddingHorizontal: RfW(24) }}>
      {list?.map((_, index) => {
        return (
          <SkeletonPlaceholder
            key={index.toString()}
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={listWidth}
              height={listHeight}
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

export default MenuListSkeleton;
