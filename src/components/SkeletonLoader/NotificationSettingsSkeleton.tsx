import React from 'react';
import { ScrollView, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const NotificationSettingsSkeleton = () => {
  const list = ['', '', '', '', '', '', '', ''];
  return (
    <View style={{ marginHorizontal: RfW(24) }}>
      {list?.map((_, index) => {
        return (
          <>
            <View
              key={index?.toString()}
              style={{
                paddingVertical: RfH(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item width={RfW(30)} height={RfH(30)} borderRadius={RfH(4)} />
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={deviceWidth() - RfW(100)}
                  height={RfH(15)}
                  borderRadius={RfH(4)}
                />
              </SkeletonPlaceholder>
            </View>

            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={deviceWidth() - RfW(130)}
                height={RfH(15)}
                borderRadius={RfH(4)}
                marginLeft={RfH(7)}
              />
            </SkeletonPlaceholder>
          </>
        );
      })}
    </View>
  );
};

export default NotificationSettingsSkeleton;
