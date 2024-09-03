import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme';
import { View } from 'react-native';

const UsefullSkeleton = (props) => {
  const list = ['', '', '', ''];

  return (
    <View
      style={{
        width: '100%',
        paddingTop: RfH(20),
        paddingHorizontal: RfW(24),
        paddingBottom: RfH(15)
      }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item width={RfH(120)} height={RfH(25)} marginBottom={RfH(20)} />
          <SkeletonPlaceholder.Item width={RfH(60)} height={RfH(15)} marginBottom={RfH(20)} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
          {list?.map((_) => {
            return <SkeletonPlaceholder.Item width={RfW(64)} height={RfW(64)} alignSelf="center" />;
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginVertical={RfH(15)}
          justifyContent="space-between">
          {list?.map((_) => {
            return <SkeletonPlaceholder.Item width={RfW(64)} height={RfW(20)} alignSelf="center" />;
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default UsefullSkeleton;
