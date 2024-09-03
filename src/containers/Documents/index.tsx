import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, HeaderSVG } from '../../components';
import HorizontalTabItems from '../../components/HorizontalTabItems';
import DocumentsSkeleton from '../../components/SkeletonLoader/DocumentsSkeleton';
import { isRTL, localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { getDocuments } from '../Home/redux/actions';
import { getDocumentsSelector } from '../Home/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import WrapperContainer from '../../components/WrapperContainer';
import { BorderRadius } from '../../theme/sizes';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  documentsData: getDocumentsSelector
});

const Documents = (props: any) => {
  const { isHideBackButton = false } = props?.route?.params || {};
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { isDarkMode, documentsData } = useSelector(stateSelector);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [documentList, setDocumentList] = useState([]);

  const isBackButtonVisible = !isHideBackButton;

  useEffect(() => {
    if (isFocused) {
      dispatch(getDocuments.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isEmpty(documentsData) && documentsData?.length > 0) {
      const uniqueCategories = [...new Set(documentsData.map((item) => item.category))]
        .map((category) => ({
          name: category
        }))
        ?.slice()
        ?.sort((a, b) => a.name - b.name);

      if (uniqueCategories?.length > 0) {
        setSelectedCategory(uniqueCategories[0]?.name);
        setCategoryList(uniqueCategories || []);
      } else {
        setSelectedCategory('');
        setCategoryList([]);
      }
    }
  }, [documentsData]);

  useEffect(() => {
    if (selectedCategory) {
      const filteredData = documentsData?.filter((flt) => flt?.category === selectedCategory);

      setDocumentList(filteredData);
    }
  }, [selectedCategory, documentsData]);

  const renderListItem = ({ item }) => {
    const isAcknowledged = item?.isAcknowledged || false;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationRouteNames.DOCUMENT_VIEW as never, {
            id: item?.id
          });
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: RfH(22),
          borderBottomWidth: RfH(1),
          borderBottomColor: Colors.grayBorder
        }}>
        <CustomText
          fontSize={16}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont400Style, lineHeight: RfH(20) }}>
          {item?.name}
        </CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isAcknowledged ? (
            <View style={styles.tickContainer}>
              <CustomImage
                image={Images.greenTickIcon}
                imageWidth={RfW(24)}
                imageHeight={RfW(24)}
                imageResizeMode={'contain'}
                displayLoader={false}
                styling={{
                  overflow: 'hidden'
                }}
                tintColor={isDarkMode ? Colors.white : Colors.white}
              />
            </View>
          ) : null}
          <CustomImage
            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
            imageWidth={RfW(11)}
            imageHeight={RfH(17)}
            imageResizeMode={'contain'}
            displayLoader={false}
            styling={{
              overflow: 'hidden'
            }}
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const mainSection = () => {
    if (documentsData === undefined) {
      return <DocumentsSkeleton />;
    } else if (documentList?.length > 0) {
      return (
        <View style={{ flex: 1, paddingBottom: RfH(Platform.OS === 'ios' ? 80 : 100) }}>
          <View
            style={{
              paddingTop: RfH(10),
              paddingBottom: RfH(20),
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.headerBgColor,
              alignItems: 'flex-start',
              borderBottomLeftRadius: BorderRadius.BR15,
              borderBottomRightRadius: BorderRadius.BR15
            }}>
            <FlatList
              data={categoryList || []}
              horizontal={true}
              overScrollMode={'never'}
              contentContainerStyle={{
                paddingHorizontal: RfW(18),
                height: RfH(31)
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <HorizontalTabItems
                  key={index?.toString()}
                  isSelectedItem={item?.name === selectedCategory}
                  item={item}
                  isDarkMode={isDarkMode}
                  onPress={(item) => {
                    setSelectedCategory(item.name);
                  }}
                />
              )}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <FlatList
            data={documentList || []}
            keyExtractor={(_, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderListItem}
            contentContainerStyle={{ paddingHorizontal: RfW(24) }}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isBackButtonVisible={isBackButtonVisible}
            titleText={`${localize('documents.myDocuments')}`}
            titleFont={20}
            titleStyle={{ marginLeft: RfW(isBackButtonVisible ? 0 : -70) }}
            isBorderRadius={false}
          />

          {mainSection()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  tickContainer: {
    backgroundColor: Colors.darkPurple,
    justifyContent: 'center',
    alignItems: 'center',
    height: RfW(20),
    width: RfW(20),
    borderRadius: RfH(15),
    marginRight: RfH(15),
    marginLeft: RfH(5)
  }
});

export default Documents;
