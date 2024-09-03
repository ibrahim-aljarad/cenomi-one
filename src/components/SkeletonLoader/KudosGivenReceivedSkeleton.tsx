import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SCREEN_WIDTH } from '../../constant';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helper';

const KudosGivenReceivedSkeleton = (props: any) => {
  const { isMultiItem = true, isDarkMode } = props || {};
  const list = ['', ''];

  return (
    <FlatList
      data={list || []}
      horizontal
      keyExtractor={(_, index) => index?.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={(_) => {
        return (
          <View
            style={[
              styles.container,
              { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.kudosCardBg },
              isMultiItem
                ? {
                    width: SCREEN_WIDTH - RfW(88),
                    marginRight: RfW(16)
                  }
                : {}
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: RfW(12),
                marginRight: RfW(17),
                marginTop: RfH(12),
                marginBottom: RfH(30)
              }}>
              {/* Status loader */}
              <SkeletonPlaceholder
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={RfH(110)} height={RfH(30)} />
              </SkeletonPlaceholder>

              {/* date loader */}
              <SkeletonPlaceholder
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={RfH(90)} height={RfH(15)} />
              </SkeletonPlaceholder>
            </View>

            {/* icon loader */}
            <SkeletonPlaceholder
              speed={1000}
              borderRadius={RfH(50)}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item
                width={RfH(100)}
                height={RfH(100)}
                style={{ alignSelf: 'center' }}
              />
            </SkeletonPlaceholder>

            {/* title loader */}
            <SkeletonPlaceholder
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item
                width={RfH(120)}
                height={RfH(15)}
                style={{ alignSelf: 'center', marginTop: RfH(15) }}
              />
            </SkeletonPlaceholder>

            {/* subtitle loader */}
            <SkeletonPlaceholder
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item
                width={RfH(140)}
                height={RfH(11)}
                style={{ alignSelf: 'center', marginTop: RfH(8) }}
              />
            </SkeletonPlaceholder>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: RfH(9)
              }}>
              {/* description loader */}
              <SkeletonPlaceholder
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item
                  width={RfH(270)}
                  height={RfH(11)}
                  style={{ alignSelf: 'center', marginTop: RfH(8) }}
                />
              </SkeletonPlaceholder>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(23, 37, 69, 0.1)',
                height: RfH(0.8),
                marginTop: RfH(28)
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: RfW(16),
                paddingVertical: RfH(12),
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <View style={{ flexDirection: 'row', width: '75%' }}>
                {/* profile icon loader */}
                <SkeletonPlaceholder
                  speed={1000}
                  borderRadius={RfH(25)}
                  backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfH(50)}
                    height={RfH(50)}
                    style={{ alignSelf: 'center' }}
                  />
                </SkeletonPlaceholder>

                {/* user name loader */}
                <SkeletonPlaceholder
                  speed={1000}
                  backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfH(140)}
                    height={RfH(11)}
                    style={{ alignSelf: 'center', marginTop: RfH(8), marginLeft: RfW(10) }}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
          </View>
        );
      }}
      contentContainerStyle={{ paddingLeft: RfW(24) }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - RfW(48),
    minHeight: RfH(335),
    backgroundColor: Colors.kudosCardBg
  }
});

export default KudosGivenReceivedSkeleton;
