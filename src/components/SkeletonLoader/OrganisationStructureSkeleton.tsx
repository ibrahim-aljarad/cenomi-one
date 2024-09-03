import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';

const OrganisationStructureSkeleton = (props: any) => {
  const { isDarkMode, listHeight = RfH(76), listWidth = deviceWidth() - RfW(40) } = props || {};
  const list = ['', '', '', '', '', '', '', ''];

  return (
    <View style={{ marginTop: RfH(14) }}>
      <View style={{ maxHeight: RfH(218) }}>
        <FlatList
          data={['', '']}
          keyExtractor={(_, index) => index?.toString()}
          renderItem={() => {
            return (
              <View style={{ paddingHorizontal: RfW(20) }}>
                <SkeletonPlaceholder
                  speed={1000}
                  backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={listWidth}
                    height={listHeight}
                    alignItems="center"
                    justifyContent="center"
                  />
                </SkeletonPlaceholder>
                <View style={styles.verticalGapContainer} />
              </View>
            );
          }}
          contentContainerStyle={{ paddingTop: RfH(28) }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          borderTopColor: `rgba(29, 18, 55, 0.2)`,
          borderTopWidth: RfH(1),
          paddingTop: RfH(22),
          paddingHorizontal: RfW(20)
        }}>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={listWidth}
            height={listHeight}
            alignItems="center"
            justifyContent="center"
          />
        </SkeletonPlaceholder>
      </View>

      <View
        style={{
          paddingHorizontal: RfW(20),
          marginTop: RfH(30),
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={RfW(150)}
            height={RfH(20)}
            alignItems="center"
            justifyContent="center"
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={RfW(60)}
            height={RfH(20)}
            alignItems="center"
            justifyContent="center"
          />
        </SkeletonPlaceholder>
      </View>

      <View
        style={{
          marginTop: RfH(30),
          flexDirection: 'row',
          paddingLeft: RfW(20)
        }}>
        <View>
          <SkeletonPlaceholder
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(268)}
              height={listHeight}
              alignItems="center"
              justifyContent="center"
            />
          </SkeletonPlaceholder>
        </View>
        <View style={{ paddingLeft: RfW(20) }}>
          <SkeletonPlaceholder
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(268)}
              height={listHeight}
              alignItems="center"
              justifyContent="center"
            />
          </SkeletonPlaceholder>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: RfW(20),
          marginTop: RfH(30),
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={RfW(150)}
            height={RfH(20)}
            alignItems="center"
            justifyContent="center"
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={RfW(60)}
            height={RfH(20)}
            alignItems="center"
            justifyContent="center"
          />
        </SkeletonPlaceholder>
      </View>

      <View
        style={{
          marginTop: RfH(30),
          flexDirection: 'row',
          paddingLeft: RfW(20)
        }}>
        <View>
          <SkeletonPlaceholder
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(268)}
              height={listHeight}
              alignItems="center"
              justifyContent="center"
            />
          </SkeletonPlaceholder>
        </View>
        <View style={{ paddingLeft: RfW(20) }}>
          <SkeletonPlaceholder
            speed={1000}
            backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfW(268)}
              height={listHeight}
              alignItems="center"
              justifyContent="center"
            />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  verticalGapContainer: {
    height: RfH(15),
    width: RfH(1.5),
    backgroundColor: `rgba(29, 18, 55, 0.2)`,
    alignSelf: 'center'
  }
});

export default OrganisationStructureSkeleton;
