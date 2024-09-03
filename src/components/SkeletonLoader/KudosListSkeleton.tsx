import React from 'react';
import { FlatList, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW } from '../../utils/helpers';
import { Colors, CommonStyles } from '../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { SCREEN_WIDTH } from '../../constant';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const KudosListSkeleton = (props) => {
  const { isDarkMode } = useSelector(stateSelector);

  const list = ['', '', '', '', '', '', '', ''];

  return (
    <View>
      <FlatList
        data={list || []}
        keyExtractor={(_, index) => index?.toString()}
        numColumns={2}
        renderItem={(_) => {
          return (
            <View style={{ marginBottom: RfH(25), marginRight: RfH(15) }}>
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
                  width: (SCREEN_WIDTH - RfW(63)) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RfH(22),
                  ...CommonStyles.card_elevation_t
                }}>
                {/* icon loader */}
                <SkeletonPlaceholder
                  speed={1000}
                  borderRadius={RfH(50)}
                  backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfH(60)}
                    height={RfH(60)}
                    style={{ alignSelf: 'center' }}
                  />
                </SkeletonPlaceholder>
              </View>

              {/* subtitle loader */}
              <SkeletonPlaceholder
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item
                  width={RfH(140)}
                  height={RfH(13)}
                  style={{ marginTop: RfH(15) }}
                />
              </SkeletonPlaceholder>
            </View>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <SkeletonPlaceholder
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item
                width={RfH(140)}
                height={RfH(13)}
                style={{ marginTop: RfH(32), marginBottom: RfH(24) }}
              />
            </SkeletonPlaceholder>
          );
        }}
      />
    </View>
  );
};

export default KudosListSkeleton;
