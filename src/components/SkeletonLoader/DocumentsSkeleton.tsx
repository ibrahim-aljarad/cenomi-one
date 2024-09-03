import React from 'react';
import { FlatList, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const DocumentsSkeleton = (props: any) => {
  const { isDarkMode } = props || {};
  const list = ['', '', '', '', '', '', ''];

  const renderCatItem = () => {
    return (
      <View
        style={{
          paddingTop: RfH(10),
          paddingBottom: RfH(20),
          alignItems: 'flex-start'
        }}>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={RfW(71)}
            height={RfH(31)}
            marginRight={RfW(8)}
            alignItems="center"
            justifyContent="center"
          />
        </SkeletonPlaceholder>
      </View>
    );
  };

  const renderDocList = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: RfH(1),
          borderBottomColor: isDarkMode ? Colors.darkModeButton : Colors.grayBorder,
          paddingVertical: RfH(22)
        }}>
        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item width={RfW(200)} height={RfH(20)} />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder
          speed={1000}
          backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item width={RfW(20)} height={RfW(20)} />
        </SkeletonPlaceholder>
      </View>
    );
  };

  return (
    <View style={{}}>
      <FlatList
        horizontal
        data={list || []}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCatItem}
        contentContainerStyle={{
          paddingHorizontal: RfW(24),
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}
      />
      <FlatList
        data={list || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderDocList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: RfW(24) }}
      />
    </View>
  );
};

export default DocumentsSkeleton;
