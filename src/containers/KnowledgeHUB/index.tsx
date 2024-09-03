import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isLoadingSelector } from '../../appContainer/redux/selectors';
import { HeaderSVG } from '../../components';
import EmptyListComponent from '../../components/EmptyListComponent';
import { localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors, Images } from '../../theme';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH, RfW } from '../../utils/helper';
import { getknowledgeHubCategoriesSelector } from '../Home/redux/selectors';
import KnowledgeHUBItems from './knowledgeHubListItems';
import styles from './styles';
import { isDarkModeSelector } from '../redux/selectors';
import WrapperContainer from '../../components/WrapperContainer';
import MenuListComponent from '../Profile/MenuListComponent';
import { IMAGE_BASE_URL } from '../../utils/constants';

const stateSelector = createStructuredSelector({
  knowledgeHubCategoriesData: getknowledgeHubCategoriesSelector,
  isLoading: isLoadingSelector,
  isDarkMode: isDarkModeSelector
});

const KnowledgeHUB = () => {
  const navigation = useNavigation();
  const { knowledgeHubCategoriesData, isLoading, isDarkMode } = useSelector(stateSelector);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_KNOWLEDGE_HUB_LIST);
  }, []);

  const handleItemClick = (item) => {
    trackEvent(EVENT_NAME.PRESSED_KNOWLEDGE_HUB_ITEM, { item });
    navigation.navigate(NavigationRouteNames.KNOWLEDGEHUB_SUBCATEGORYLIST, {
      KnowledgeHubItem: item
    });
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
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText={localize('home.knowledgeHUB')}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => navigation.navigate(NavigationRouteNames.HOME as never)}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
          />
          {knowledgeHubCategoriesData ? (
            <View
              style={{
                flex: 1
              }}>
              <FlatList
                data={knowledgeHubCategoriesData}
                contentContainerStyle={{
                  paddingHorizontal: RfW(24),
                  marginTop: RfH(22)
                }}
                renderItem={({ item }) => (
                  <MenuListComponent
                    element={{
                      ...item,
                      routeName: 'dummy',
                      icon: `${IMAGE_BASE_URL}${item?.logo?.url}`
                    }}
                    onClickItems={() => {
                      handleItemClick(item);
                    }}
                  />
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
            !isLoading && (
              <View
                style={{
                  flex: 1,
                  borderTopWidth: 1,
                  borderColor: Colors.grayBorder,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <EmptyListComponent
                  errorText={localize('common.ComingSoon')}
                  errorSubText={''}
                  icon={Images.ComingSoon}
                />
              </View>
            )
          )}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default KnowledgeHUB;
