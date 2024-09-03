import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const ApprovalsGridSkeleton = (props: any) => {
  const { isHideHeader = false } = props || {};
  const list = ['', '', '', ''];

  return (
    <View
      style={{
        paddingTop: RfH(32),
        marginBottom: RfH(33)
      }}>
      {!isHideHeader ? (
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={RfH(100)}
            height={RfH(25)}
            marginLeft={RfW(25)}
            marginBottom={RfH(20)}
          />
        </SkeletonPlaceholder>
      ) : null}
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row">
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={deviceWidth() / 4}
                height={RfH(64)}
                alignItems="center"
                justifyContent="center">
                <SkeletonPlaceholder.Item width={RfH(64)} height={RfH(64)} alignSelf="center" />
              </SkeletonPlaceholder.Item>
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row">
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={deviceWidth() / 4}
                height={RfH(20)}
                marginTop={RfH(5)}
                alignItems="center"
                justifyContent="center">
                <SkeletonPlaceholder.Item width={RfH(75)} height={RfH(12)} alignSelf="center" />
              </SkeletonPlaceholder.Item>
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ApprovalsGridSkeleton;
