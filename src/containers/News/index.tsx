import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { HeaderSVG } from '../../components';
import EmptyListComponent from '../../components/EmptyListComponent';
import { NewsListSkeleton } from '../../components/SkeletonLoader';
import { localize } from '../../locale/utils';
import { Colors, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW, openLinkInBrowser } from '../../utils/helper';
import { isDisplayWithNotch } from '../../utils/helpers';
import { getNewsList } from '../redux/actions';
import { getNewsListSelector, isDarkModeSelector } from '../redux/selectors';
import ListItem from './ListItem';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  newsList: getNewsListSelector
});

const News = () => {
  const { isDarkMode, newsList } = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsList.trigger());
  }, []);

  const handleOnClickItem = (item) => {
    openLinkInBrowser(item?.url);
  };

  const listSection = () => {
    if (newsList === undefined) {
      return <NewsListSkeleton isDarkMode={isDarkMode} />;
    } else if (newsList?.length > 0) {
      return (
        <View style={styles.listView}>
          <FlatList
            data={newsList}
            contentContainerStyle={{
              paddingHorizontal: RfW(16),
              paddingTop: RfH(8)
            }}
            renderItem={({ item }) => (
              <ListItem isDarkMode={isDarkMode} item={item} onPressItem={handleOnClickItem} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={null}
            ListFooterComponent={
              <View
                style={{
                  height: RfH(50)
                }}
              />
            }
          />
        </View>
      );
    } else if (newsList?.length === 0) {
      return (
        <EmptyListComponent
          errorText={localize('common.noDataFound')}
          icon={Images.benefitEmptyIcon}
        />
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        ...styles.mainContainer,
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
      }}>
      <HeaderSVG
        isBackButtonVisible={true}
        isRightButtonVisible={true}
        titleText={localize('home.news')}
        titleFont={20}
      />

      <View
        style={[
          styles.mainView,
          { backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor }
        ]}>
        {listSection()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10)
  },
  item_con: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: RfW(24),
    paddingVertical: RfH(20)
  },
  notification_Settings_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: RfW(24),
    paddingVertical: RfH(20),
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder
  },
  mainView: {
    flex: 1
  },

  categoryView: {
    height: RfH(31),
    borderRadius: RfH(15),
    marginHorizontal: RfW(5),
    paddingHorizontal: RfW(15),
    alignItems: 'center',
    justifyContent: 'center'
  },

  detailsCategoryView: {
    flexDirection: 'row',
    backgroundColor: Colors.voiletLight,

    marginTop: RfH(28),
    height: RfH(23),
    borderRadius: BorderRadius.BR0,
    paddingHorizontal: RfW(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  listView: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.grayBorder
  }
});

export default News;
