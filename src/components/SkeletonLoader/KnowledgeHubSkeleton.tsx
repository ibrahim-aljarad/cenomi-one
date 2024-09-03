import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme';
import { View } from 'react-native';

const KnowledgeHubSkeleton = (props) => {
  const list = ['', '', ''];

  return (
    <View
      style={{
        width: '100%',
        paddingTop: RfH(20),
        paddingHorizontal: RfW(24)
      }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item width={RfH(120)} height={RfH(25)} />
          <SkeletonPlaceholder.Item width={RfH(60)} height={RfH(15)} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfH(190)}
          height={RfH(15)}
          marginTop={RfH(8)}
          marginBottom={RfH(20)}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={RfW(142)}
                height={RfW(130)}
                marginRight={RfW(15)}
                marginBottom={RfH(35)}
                alignSelf="center"
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default KnowledgeHubSkeleton;
