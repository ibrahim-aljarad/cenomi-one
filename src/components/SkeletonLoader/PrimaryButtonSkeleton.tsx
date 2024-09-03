import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const PrimaryButtonSkeleton = (props: any) => {
  const { isDarkMode, containerStyle = {} } = props || {};

  return (
    <View style={{ ...containerStyle }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={RfH(48)}
          marginTop={RfH(6)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default PrimaryButtonSkeleton;
