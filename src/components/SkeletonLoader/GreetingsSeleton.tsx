import React from 'react';
import { FlatList, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const GreetingsSeleton = (props) => {
  const list = ['', '', '', '', '', '', '', ''];

  const renderItemSkeleton = () => {
    return (
      <SkeletonPlaceholder
        // borderRadius={4}
        speed={1000}
        backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(156)}
          height={RfW(156)}
          marginRight={RfW(15)}
          marginBottom={RfW(15)}
        />
      </SkeletonPlaceholder>
    );
  };

  return (
    <View
      style={{
        paddingLeft: RfW(25)
        // backgroundColor: props?.isDarkMode ? Colors.darkModeButton : Colors.white
      }}>
      <FlatList
        numColumns={2}
        data={list}
        renderItem={renderItemSkeleton}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: RfH(15) }}
      />
    </View>
  );
};

export default GreetingsSeleton;
