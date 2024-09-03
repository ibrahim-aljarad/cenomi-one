import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RfH, RfW } from '../../../../utils/helper';
import HeaderCateRow from '../HeaderCateRow';
import ImageTitleCardTwo from '../ImageTitleCardTwo';

import LinearGradient from 'react-native-linear-gradient';
import { createStructuredSelector } from 'reselect';
import { BenefitsSkeleton } from '../../../../components/SkeletonLoader';
import { localize } from '../../../../locale/utils';
import NavigationRouteNames from '../../../../routes/ScreenNames';
import { Colors, CommonStyles } from '../../../../theme';
import { EVENT_NAME, trackEvent } from '../../../../utils/analytics';
import { getMyProfileDetailsSelector } from '../../../LoginHome/redux/selectors';
import { isDarkModeSelector } from '../../../redux/selectors';
import { getOfferCategories } from '../../redux/actions';
import { getFeatureModuleDataSelector, getOfferCategoriesSelector } from '../../redux/selectors';
import { getUserConfigData } from '../../../../utils/helpers';
import { CONFIG_CONSTANT } from '../../../../utils/constants';

const stateSelector = createStructuredSelector({
  offerCategoriesData: getOfferCategoriesSelector,
  myProfile: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
  featureModuleData: getFeatureModuleDataSelector
});

const BenefitsSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { myProfile, offerCategoriesData, isDarkMode, featureModuleData } =
    useSelector(stateSelector);

  useEffect(() => {
    if (isFocused && myProfile) {
      dispatch(getOfferCategories.trigger({ organization: myProfile?.organization }));
    }
  }, [isFocused, myProfile]);

  if (offerCategoriesData === undefined) {
    return <BenefitsSkeleton isDarkMode={isDarkMode} />;
  }

  const mainSection = () => {
    return (
      <>
        {offerCategoriesData && (
          <HeaderCateRow
            categoryName={localize('home.cenomiBenefits')}
            showSeeAll={offerCategoriesData?.length > 1 ? true : false}
            onClickSeeAll={() => {
              trackEvent(EVENT_NAME.PRESSED_BENEFITS_SEEALL_FROM_HOME);
              navigation.navigate(NavigationRouteNames.CLIENTBENEFITS, {
                categoryId: 'all'
              });
            }}
          />
        )}

        <FlatList
          data={offerCategoriesData}
          horizontal={true}
          overScrollMode={'never'}
          contentContainerStyle={{ paddingRight: RfW(30) }}
          showsHorizontalScrollIndicator={false}
          style={[{ marginTop: RfH(12) }, CommonStyles.paddingHorizontal_default]}
          renderItem={({ item, index }) => (
            <ImageTitleCardTwo
              onItemClick={() => {
                trackEvent(EVENT_NAME.PRESSED_BENEFITS_FROM_HOME);
                navigation.navigate(NavigationRouteNames.CLIENTBENEFITS, {
                  categoryId: item?.id
                });
              }}
              item={item}
              index={index}
              showIcon={false}
            />
          )}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  };

  if (getUserConfigData(myProfile?.config?.config, CONFIG_CONSTANT?.OFFERS, featureModuleData)) {
    return <View style={{ width: '100%', paddingTop: RfH(12) }}>{mainSection()}</View>;
  }

  return null;
};

export default memo(BenefitsSection);
