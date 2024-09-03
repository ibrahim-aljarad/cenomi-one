import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const NotificationListSkeleton = (props) => {
  const list = ['', '', '', '', ''];

  return (
    <View style={{ paddingHorizontal: RfW(25), marginTop: RfH(29) }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(141)}
          height={RfH(24)}
          marginBottom={RfH(20)}
          alignSelf="flex-end"
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item alignItems="center">
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={deviceWidth() - RfW(50)}
                height={RfH(97)}
                marginBottom={RfH(20)}
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default NotificationListSkeleton;
