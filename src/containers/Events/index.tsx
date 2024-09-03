import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { CustomImage, CustomText, HeaderSVG, SearchComponent } from '../../components';
import styles from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isLoadingSelector } from '../../appContainer/redux/selectors';
import EmptyListComponent from '../../components/EmptyListComponent';
import { BenefitListSkeleton } from '../../components/SkeletonLoader';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors, CommonStyles, HEIGHT, Images, WIDTH } from '../../theme';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { getEvents } from '../Home/redux/actions';
import { getEventsSelector } from '../Home/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import EventItem from './EventItem';
import { localize } from '../../locale/utils';
import WrapperContainer from '../../components/WrapperContainer';
import SearchIcon from '../../components/SearchIcon';
import { BorderRadius } from '../../theme/sizes';

const stateSelector = createStructuredSelector({
  eventListData: getEventsSelector,
  isLoading: isLoadingSelector,
  isDarkMode: isDarkModeSelector
});

const Events = (props: any) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { isLoading, isDarkMode, eventListData } = useSelector(stateSelector);
  const [isSearchViewVisible, setSearchViewVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      trackEvent(EVENT_NAME.SCREEN_EVENTS_LIST);
      dispatch(getEvents.trigger());
    }
  }, [isFocused]);

  // console.log('eventListData======>', eventListData);

  useEffect(() => {
    if (eventListData && eventListData?.length > 0) {
      setEventList(
        eventListData?.slice()?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      );
    }
  }, [eventListData]);

  const SearchFilterFunction = (text) => {
    if (text) {
      //passing the inserted text in textinput
      const newData = eventListData?.filter((item) => {
        //applying filter for the inserted text in search bar
        const itemData = item?.title ? item?.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setEventList(newData);
    } else {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setEventList(eventListData);
  };

  const handleOnPressItem = (passedItem) => {
    trackEvent(EVENT_NAME.PRESSED_BENEFITS_ITEM, {
      item: passedItem
    });
    navigation.navigate(NavigationRouteNames.EVENT_DETAILS as never, {
      id: passedItem?.id
    });
  };

  const listSection = () => {
    if (eventListData === undefined) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} />;
    }

    return (
      <>
        {eventList?.length > 0 ? (
          <View style={styles.listView}>
            <FlatList
              data={eventList}
              contentContainerStyle={{
                paddingHorizontal: RfW(24)
                // paddingTop: RfH(8)
              }}
              renderItem={({ item }) => <EventItem item={item} onPressItem={handleOnPressItem} />}
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
        ) : (
          eventListData !== undefined &&
          eventList?.length === 0 && (
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderColor: Colors.grayBorder,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <EmptyListComponent
                errorText={localize('common.noDataFound')}
                // errorSubText={`This is a sample description for an empty instance`}
                icon={Images.benefitEmptyIcon}
              />
            </View>
          )
        )}
      </>
    );
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <HeaderSVG
          isBackButtonVisible={true}
          isRightButtonVisible={true}
          titleText={localize('event.cenomiEvents')}
          titleFont={20}
          rightIcon={
            <SearchIcon
              submitFunction={() => {
                setSearchViewVisible(true);
              }}
            />
          }
          isBorderRadius={isSearchViewVisible ? false : true}
        />
        {isSearchViewVisible && (
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: RfH(17),
              paddingTop: RfH(4),
              alignItems: 'center',
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.headerBgColor,
              borderBottomLeftRadius: BorderRadius.BR15,
              borderBottomRightRadius: BorderRadius.BR15
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <SearchComponent
                placeholder={localize('event.searchEvent')}
                value={searchText}
                onChangeText={(search) => {
                  setSearchText(search);
                  SearchFilterFunction(search);
                }}
                cancelSearch={handleClearSearch}
                styling={{
                  width: RfW(267),
                  height: RfH(43),
                  marginLeft: RfW(24),
                  marginRight: RfW(12)
                }}
                keyboardType={'default'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleClearSearch();
                setSearchViewVisible(false);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                paddingVertical: RfH(5)
                // paddingBottom: RfH(12),
              }}>
              <CustomText
                fontSize={15}
                color={Colors.white}
                styling={{
                  textAlign: 'center',
                  lineHeight: RfH(16),
                  ...CommonStyles.regularFont400Style
                }}>
                {localize('common.cancel')}
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.mainView,
            {
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
            }
          ]}>
          {listSection()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default Events;
