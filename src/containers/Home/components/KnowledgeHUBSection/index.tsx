import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';

import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../../components';
import NavigationRouteNames from '../../../../routes/ScreenNames';
import { Colors, CommonStyles } from '../../../../theme';
import { RfH, RfW, getColorWithOpacity, getImageUrl } from '../../../../utils/helper';
import {
  getFeatureModuleDataSelector,
  getknowledgeHubCategoriesSelector
} from '../../redux/selectors';

import LinearGradient from 'react-native-linear-gradient';
import { KnowledgeHubSkeleton } from '../../../../components/SkeletonLoader';
import { localize } from '../../../../locale/utils';
import { BorderRadius } from '../../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../../utils/analytics';
import { isDarkModeSelector } from '../../../redux/selectors';
import { getknowledgeHubCategories } from '../../redux/actions';
import HeaderCateRow from '../HeaderCateRow';
import { getUserConfigData } from '../../../../utils/helpers';
import { CONFIG_CONSTANT } from '../../../../utils/constants';
import { getMyProfileDetailsSelector } from '../../../LoginHome/redux/selectors';

const stateSelector = createStructuredSelector({
  knowledgeHubCategoriesData: getknowledgeHubCategoriesSelector,
  isDarkMode: isDarkModeSelector,
  myProfileData: getMyProfileDetailsSelector,
  featureModuleData: getFeatureModuleDataSelector
});

const KnowledgeHUBSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { knowledgeHubCategoriesData, isDarkMode, myProfileData, featureModuleData } =
    useSelector(stateSelector);

  useEffect(() => {
    if (isFocused) {
      dispatch(getknowledgeHubCategories.trigger());
    }
  }, [isFocused]);
  const handleItemClick = (item) => {
    trackEvent(EVENT_NAME.PRESSED_KNOWLEDGE_HUB_FROM_HOME);
    navigation.navigate(NavigationRouteNames.KNOWLEDGEHUB_SUBCATEGORYLIST, {
      KnowledgeHubItem: item,
      redirectFrom: 'home'
    });
  };

  const renderKnowledgeHubItem = (item, index) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.75}
      key={index.toString()}
      onPress={() => {
        handleItemClick(item);
      }}>
      <CustomImage
        imageHeight={RfH(36)}
        imageWidth={RfH(36)}
        image={getImageUrl(item?.logo?.url)}
        imageResizeMode={'contain'}
        tintColor={Colors.white}
      />
      <View
        style={{
          alignItems: 'center'
        }}>
        <CustomText
          color={isDarkMode ? Colors.white : Colors.white}
          fontSize={14}
          styling={{
            letterSpacing: RfW(0.3),
            paddingLeft: RfW(2),
            ...CommonStyles.regularFont500Style
          }}
          numberOfLines={1}>
          {item.name}
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  if (knowledgeHubCategoriesData === undefined) {
    return <KnowledgeHubSkeleton isDarkMode={isDarkMode} />;
  }

  const mainSection = () => {
    return (
      <>
        {knowledgeHubCategoriesData && (
          <View style={{ paddingTop: RfH(22) }}>
            <HeaderCateRow
              categoryName={localize('home.knowledgeHUB')}
              showSeeAll={knowledgeHubCategoriesData?.length > 1 ? true : false}
              onClickSeeAll={() => {
                trackEvent(EVENT_NAME.PRESSED_KNOWLEDGE_HUB_SEEALL_FROM_HOME);
                navigation.navigate(NavigationRouteNames.KNOWLEDGEHUBLIST as never);
              }}
            />
            <View
              style={{
                marginHorizontal: RfW(24)
              }}>
              <CustomText
                fontSize={14}
                color={getColorWithOpacity(Colors.white, 0.8)}
                styling={{
                  marginTop: RfH(4),
                  ...CommonStyles.regularFont400Style
                }}>
                {localize('home.quickGuidanceToQuery')}
              </CustomText>
            </View>
          </View>
        )}

        <FlatList
          data={knowledgeHubCategoriesData}
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: RfW(18) }}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: RfH(12) }}
          renderItem={({ item, index }) => renderKnowledgeHubItem(item, index)}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          overScrollMode={'never'}
        />
      </>
    );
  };

  if (
    getUserConfigData(
      myProfileData?.config?.config,
      CONFIG_CONSTANT?.KNOWLEDGE_HUB,
      featureModuleData
    )
  ) {
    return <View>{mainSection()}</View>;
  }

  return null;
};

const styles = StyleSheet.create({
  itemContainer: {
    minWidth: RfW(158),
    borderRadius: BorderRadius.BR10,
    overflow: 'hidden',
    backgroundColor: getColorWithOpacity(Colors.blueBayoux, 0.37),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RfW(6),
    marginBottom: RfH(50),
    marginTop: RfH(RfH(12)),
    flexDirection: 'row',
    paddingVertical: RfH(16),
    paddingHorizontal: RfW(10)
  }
});

export default memo(KnowledgeHUBSection);
