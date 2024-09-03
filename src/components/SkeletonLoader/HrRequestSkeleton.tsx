import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme';
import { View } from 'react-native';

const HrRequestSkeleton = (props) => {
  const list = ['', ''];

  return (
    <View
      style={{
        paddingTop: RfH(15),
        paddingBottom: RfH(13)
      }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfH(120)}
          height={RfH(25)}
          marginLeft={RfW(25)}
          marginBottom={RfH(20)}
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row" alignSelf="center" marginLeft={RfH(5)}>
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={RfW(154)}
                height={RfH(64)}
                marginRight={RfH(10)}
                // marginTop={RfH(12)}
                alignSelf="center"
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder.Item marginTop={RfH(12)} />
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row" alignSelf="center" marginLeft={RfH(5)}>
          {list?.map((_) => {
            return (
              <SkeletonPlaceholder.Item
                width={RfW(154)}
                height={RfH(64)}
                marginRight={RfH(10)}
                // marginTop={RfH(12)}
                alignSelf="center"
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default HrRequestSkeleton;
