import React from 'react';
import { ScrollView, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../theme';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';

const BenefitListSkeleton = (props) => {
  const list = ['', '', '', '', ''];

  return (
    <View style={{ paddingHorizontal: RfW(16), paddingTop: RfH(15) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SkeletonPlaceholder
          borderRadius={4}
          speed={1000}
          backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item alignItems="center">
            {list?.map((_) => {
              return (
                <SkeletonPlaceholder.Item
                  width={deviceWidth() - RfW(48)}
                  height={props?.height || RfH(240)}
                  borderRadius={RfW(10)}
                  // marginRight={RfW(12)}
                  marginBottom={RfH(16)}
                />
              );
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    </View>
  );
};

export default BenefitListSkeleton;
