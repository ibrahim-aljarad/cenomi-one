import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const CorporateCommunicationSkeleton = (props) => {
  const list = ['', '', ''];

  return (
    <View
      style={{
        paddingLeft: RfW(25)
        // backgroundColor: props?.isDarkMode ? Colors.darkModeButton : Colors.white
      }}>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={RfW(102)}
                height={RfH(134)}
                borderRadius={RfH(8)}
                marginRight={RfW(12)}
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CorporateCommunicationSkeleton;
