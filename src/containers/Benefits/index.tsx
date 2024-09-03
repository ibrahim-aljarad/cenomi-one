import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomImage, CustomText, HeaderSVG, SearchComponent } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HorizontalTabItems from '../../components/HorizontalTabItems';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, HEIGHT, Images, WIDTH } from '../../theme';
import { CATEGORYTYPEALL } from '../../utils/constants';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { getOffers } from '../Home/redux/actions';
import { getOfferCategoriesSelector, getOffersSelector } from '../Home/redux/selectors';
import BenefitItem from './BenefitItem';
import COLORS from '../../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EmptyListComponent from '../../components/EmptyListComponent';
import { isLoadingSelector } from '../../appContainer/redux/selectors';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { BenefitListSkeleton } from '../../components/SkeletonLoader';
import NavigationRouteNames from '../../routes/ScreenNames';
import { isDarkModeSelector } from '../redux/selectors';
import { isEmpty } from 'lodash';
import WrapperContainer from '../../components/WrapperContainer';
import { BorderRadius } from '../../theme/sizes';
import { isDisplayWithNotch } from '../../utils/helpers';
import SearchIcon from '../../components/SearchIcon';

const stateSelector = createStructuredSelector({
  offerCategoriesData: getOfferCategoriesSelector,
  isLoading: isLoadingSelector,
  offersData: getOffersSelector,
  isDarkMode: isDarkModeSelector
});

const ClientBenefits = (props: any) => {
  const { categoryId } = props?.route?.params || {};

  const navigation = useNavigation();
  const categoryRef = useRef(0);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { offersData, offerCategoriesData, isLoading, isDarkMode } = useSelector(stateSelector);
  const allItem = [{ name: localize('common.all'), isSelect: true, id: CATEGORYTYPEALL }];
  const [isSearchViewVisible, setSearchViewVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [offerCatList, setOfferCatList] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(undefined);
  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  useEffect(() => {
    if (isFocused) {
      trackEvent(EVENT_NAME.SCREEN_BENEFITS_LIST);
      dispatch(getOffers.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (offerCategoriesData) {
      setOfferCatList([...allItem, ...offerCategoriesData]);
    }
  }, [offerCategoriesData]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
  }, [categoryId, offerCategoriesData]);

  useEffect(() => {
    if (offersData?.data && selectedCategoryId && offerCatList?.length > 1) {
      setSelectedoffersCategory(selectedCategoryId);
      if (!isEmpty(offerCategoriesData)) {
        const selectedIndex =
          offerCategoriesData?.findIndex((element) => element?.id === selectedCategoryId) || 0;
        setTimeout(() => {
          categoryRef.current.scrollToIndex({
            animated: true,
            index: selectedIndex >= 0 ? selectedIndex : 0
          });
        }, 300);
      }
    } else {
      setOffersList(offersData?.data);
    }
  }, [offersData?.data, selectedCategoryId]);

  const setSelectedoffersCategory = (categoryId) => {
    const localcateList = offerCatList?.map((element) => {
      return { ...element, isSelect: element?.id === categoryId ? true : false };
    });
    setOfferCatList(localcateList);
    if (categoryId === CATEGORYTYPEALL) {
      setOffersList(offersData?.data);
    } else {
      getFilterOfferList(categoryId);
    }

    setTimeout(() => {
      setIsShowSkeleton(false);
    }, 200);
  };

  const getFilterOfferList = (categoryId) => {
    const filterList = offersData?.data?.filter((item) => {
      return isCategoryAvailable(categoryId, item?.categories);
    });
    setOffersList(filterList);
  };

  const isCategoryAvailable = (categoryId, categories) => {
    const item = categories?.find((item) => {
      return categoryId === item?.id;
    });
    return item ? true : false;
  };

  const SearchFilterFunction = (text) => {
    if (text) {
      //passing the inserted text in textinput
      const newData = offersData?.data?.filter((item) => {
        //applying filter for the inserted text in search bar
        const itemData = item?.title ? item?.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setOffersList(newData);
    } else {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setOffersList(offersData?.data);
    setSelectedCategoryId(CATEGORYTYPEALL);
  };

  const handleOnPressItem = (passedItem) => {
    trackEvent(EVENT_NAME.PRESSED_BENEFITS_ITEM, {
      item: passedItem
    });
    navigation.navigate(NavigationRouteNames.CLIENTBENEFITSDETAILS, {
      id: passedItem?.id,
      offersDetails: passedItem
    });
  };

  const listSection = () => {
    if (offersData === undefined || isShowSkeleton) {
      return <BenefitListSkeleton isDarkMode={isDarkMode} />;
    }

    return (
      <>
        {offersList?.length > 0 ? (
          <View style={styles.flexOne}>
            <FlatList
              data={offersList}
              contentContainerStyle={{
                paddingHorizontal: RfW(24)
              }}
              renderItem={({ item }) => (
                <BenefitItem clientBenefitsItem={item} onPressItem={handleOnPressItem} />
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
        ) : (
          offersData !== undefined &&
          offersList?.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <EmptyListComponent
                errorText={localize('common.noDataFound')}
                // errorSubText={localize(
                //   'common.This_sample_description_empty_instance',
                // )}
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
          titleText={localize('home.cenomiBenefits')}
          titleFont={20}
          isBorderRadius={false}
          rightIcon={
            <SearchIcon
              submitFunction={() => {
                setSearchViewVisible(true);
              }}
            />
          }
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
                placeholder={localize('benefits.search_benefits')}
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
        <View style={[styles.flexOne]}>
          {!isSearchViewVisible && (
            <View
              style={{
                paddingTop: RfH(5),
                paddingBottom: RfH(20),
                backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.headerBgColor,
                alignItems: 'flex-start',
                borderBottomLeftRadius: BorderRadius.BR15,
                borderBottomRightRadius: BorderRadius.BR15
              }}>
              <FlatList
                ref={categoryRef}
                data={offerCatList}
                horizontal={true}
                overScrollMode={'never'}
                contentContainerStyle={{
                  paddingRight: RfW(24),
                  height: RfH(31),
                  backgroundColor: isDarkMode ? Colors.darkModeBackground : null,
                  alignItems: 'flex-start'
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <HorizontalTabItems
                    isDarkMode={isDarkMode}
                    item={item}
                    onPress={(item) => {
                      if (item?.id !== selectedCategoryId) {
                        trackEvent(EVENT_NAME.PRESSED_BENEFITS_CAT, { item });
                        setIsShowSkeleton(true);
                        setOffersList([]);
                        setSelectedCategoryId(item?.id);
                      }
                    }}
                    containerStyle={{ marginLeft: RfW(index === 0 ? 24 : 0) }}
                  />
                )}
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {listSection()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  flexOne: {
    flex: 1
  }
});

export default ClientBenefits;
