import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helper';

const KudosLeaderboardSkeleton = (props: any) => {
  const { isDarkMode } = props || {};
  const list = ['', '', '', '', '', ''];

  const renderListView = ({ item, index }) => {
    return (
      <View style={{ marginBottom: RfH(8) }}>
        <Shadow
          containerStyle={{
            marginHorizontal: RfW(24)
          }}
          style={{
            width: '100%'
          }}
          startColor={isDarkMode ? Colors.darkModeShadow : 'rgba(212,212,220,0.5)'}
          paintInside={false}
          offset={[1, 0]}>
          <View
            style={{
              ...styles.listContainer,
              backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white
            }}>
            <View style={styles.flexRowAlignItemsCenter}>
              <SkeletonPlaceholder
                speed={1000}
                borderRadius={RfH(25)}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={RfH(50)} height={RfH(50)} />
              </SkeletonPlaceholder>
            </View>
            <View style={styles.nameAndClappingContainer}>
              <View
                style={{
                  marginLeft: RfW(20)
                }}>
                <SkeletonPlaceholder
                  speed={1000}
                  backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item width={RfH(100)} height={RfH(15)} />
                </SkeletonPlaceholder>
                <SkeletonPlaceholder
                  speed={1000}
                  backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfH(140)}
                    height={RfH(15)}
                    style={{ marginTop: RfH(5) }}
                  />
                </SkeletonPlaceholder>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <SkeletonPlaceholder
                  speed={1000}
                  borderRadius={RfH(4)}
                  backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item width={RfH(15)} height={RfH(15)} />
                </SkeletonPlaceholder>
                <SkeletonPlaceholder
                  speed={1000}
                  borderRadius={RfH(4)}
                  backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfH(25)}
                    height={RfH(15)}
                    style={{ marginLeft: RfW(4) }}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  };

  const renderListHeaderSection = (
    <>
      <Shadow
        containerStyle={{
          marginTop: RfH(32),
          marginHorizontal: RfW(24)
        }}
        style={{
          width: '100%'
        }}
        startColor={isDarkMode ? Colors.darkModeShadow : 'rgba(212,212,220,0.5)'}
        paintInside={false}
        offset={[1, 0]}>
        <View
          style={{
            borderColor: Colors.white,
            borderWidth: RfW(5),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RfW(10)
          }}>
          {/* Banner text loader */}
          <View>
            <SkeletonPlaceholder
              speed={1000}
              backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item width={RfW(110)} height={RfH(15)} />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder
              speed={1000}
              backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item
                width={RfH(100)}
                height={RfH(15)}
                style={{ marginTop: RfH(5) }}
              />
            </SkeletonPlaceholder>
          </View>

          {/* banner image loader */}
          <SkeletonPlaceholder
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(120)}
              height={RfH(80)}
              style={{ marginHorizontal: RfW(20), marginVertical: RfH(10) }}
            />
          </SkeletonPlaceholder>

          {/* banner arrow button loader */}
          <SkeletonPlaceholder
            speed={1000}
            borderRadius={RfW(10)}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(20)}
              height={RfW(20)}
              //   style={{ marginHorizontal: RfW(20) }}
            />
          </SkeletonPlaceholder>
        </View>
      </Shadow>

      {/* quarter text loader */}
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(150)}
          height={RfH(25)}
          style={{ marginTop: RfH(22), marginLeft: RfW(24), marginBottom: RfH(24) }}
        />
      </SkeletonPlaceholder>
    </>
  );

  return (
    <FlatList
      data={list || []}
      keyExtractor={(_, index) => index?.toString()}
      renderItem={renderListView}
      ListHeaderComponent={renderListHeaderSection}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: RfH(40) }}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  flexRowAlignItemsCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameAndClappingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RfH(12),
    paddingHorizontal: RfW(16)
  }
});

export default KudosLeaderboardSkeleton;
