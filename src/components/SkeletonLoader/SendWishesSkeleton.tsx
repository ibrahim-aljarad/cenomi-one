import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const SendWishesSkeleton = (props) => {
  const { isDarkMode } = props || {};
  const list = ['', '', ''];

  return (
    <View style={{ paddingHorizontal: RfW(24) }}>
      <View
        style={[
          styles.birthdayItemContainer,
          { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white }
        ]}>
        <View style={{ alignItems: 'center' }}>
          <SkeletonPlaceholder
            borderRadius={4}
            speed={1000}
            backgroundColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey4}
            highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfH(64)}
              height={RfH(64)}
              borderRadius={RfH(32)}
              marginRight={RfW(12)}
            />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder
            borderRadius={4}
            speed={1000}
            backgroundColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey4}
            highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfH(30)}
              height={RfH(30)}
              borderRadius={RfH(15)}
              marginRight={RfW(12)}
              marginTop={RfH(10)}
            />
          </SkeletonPlaceholder>
        </View>
        <View style={{ paddingLeft: RfH(10), flex: 1 }}>
          <SkeletonPlaceholder
            borderRadius={4}
            speed={1000}
            backgroundColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey4}
            highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item width={RfH(210)} height={RfH(25)} borderRadius={RfH(2)} />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder
            borderRadius={4}
            speed={1000}
            backgroundColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey4}
            highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item
              width={RfH(210)}
              height={RfH(18)}
              borderRadius={RfH(2)}
              marginTop={RfH(10)}
            />
          </SkeletonPlaceholder>

          <View style={styles.wishHimContainer}>
            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item
                width={RfH(100)}
                height={RfH(30)}
                borderRadius={RfH(2)}
                marginTop={RfH(10)}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>

      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfH(150)}
          height={RfH(18)}
          borderRadius={RfH(2)}
          marginTop={RfH(20)}
        />
      </SkeletonPlaceholder>

      <FlatList
        data={list || []}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={() => {
          return (
            <View
              style={{
                width: RfW(100),
                marginTop: RfH(30),
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: RfW(10)
              }}>
              <SkeletonPlaceholder
                borderRadius={4}
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item
                  width={RfH(64)}
                  height={RfH(64)}
                  borderRadius={RfH(32)}
                  marginRight={RfW(12)}
                />
              </SkeletonPlaceholder>

              <SkeletonPlaceholder
                borderRadius={4}
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item
                  width={RfH(100)}
                  height={RfH(18)}
                  borderRadius={RfH(2)}
                  marginTop={RfH(10)}
                />
              </SkeletonPlaceholder>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  birthdayItemContainer: {
    backgroundColor: Colors.white,
    padding: RfH(18),
    marginTop: RfH(20),
    flexDirection: 'row'
    // marginHorizontal: RfW(24)
  },
  wishHimContainer: {
    alignSelf: 'flex-end',
    marginTop: RfH(10)
  }
});

export default SendWishesSkeleton;
