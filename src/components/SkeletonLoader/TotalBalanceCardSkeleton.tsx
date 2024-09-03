import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const TotalBalanceCardSkeleton = (props: any) => {
  const { isHideHeader = false, isDarkMode } = props || {};
  const list = [''];

  return (
    <View
      style={{
        paddingTop: RfH(27),
        alignItems: 'center',
        paddingHorizontal: RfW(22)
      }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item flexDirection="row">
          {list?.map((_, index) => {
            return (
              <SkeletonPlaceholder.Item
                // width={RfW(156)}
                width={RfW(328)}
                height={RfH(84)}
                // marginRight={RfH(index === 0 ? 16 : 0)}
                alignItems="center"
                justifyContent="center"
              />
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      {/* <View
        style={{
          flex: 1,
          marginVertical: RfH(30),
          width: RfW(319)
        }}> */}
      {/* <SkeletonPlaceholder.Item
          width={RfW(319)}
          height={RfH(84)}
          alignItems="center"
          justifyContent="center"
        /> */}
      {/* </View> */}
    </View>
  );
};

export default TotalBalanceCardSkeleton;
