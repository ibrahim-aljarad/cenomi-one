import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const PayslipDetailsSkeleton = (props: any) => {
  const { isDarkMode } = props || {};

  return (
    <View style={{ marginTop: RfH(40), paddingHorizontal: RfW(25) }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(100)}
          height={RfH(20)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={deviceWidth() - RfW(50)}
          height={RfH(64)}
          marginTop={RfH(6)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>

      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={deviceWidth() - RfW(50)}
          height={RfH(188)}
          marginTop={RfH(17)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>

      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={deviceWidth() - RfW(50)}
          height={RfH(299)}
          marginTop={RfH(16)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default PayslipDetailsSkeleton;
