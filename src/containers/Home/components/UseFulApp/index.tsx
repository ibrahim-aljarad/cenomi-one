import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UsefullSkeleton } from '../../../../components/SkeletonLoader';
import UsefulAppsItem from '../../../../components/UsefulAppsItem';
import { localize } from '../../../../locale/utils';
import { Colors } from '../../../../theme';
import { RfH, RfW, getImageUrl } from '../../../../utils/helper';
import { isDarkModeSelector } from '../../../redux/selectors';
import { getUsefulApps } from '../../redux/actions';
import { getFeatureModuleDataSelector, getUsefulAppsSelector } from '../../redux/selectors';
import HeaderCateRow from '../HeaderCateRow';
import { getUserConfigData } from '../../../../utils/helpers';
import { CONFIG_CONSTANT } from '../../../../utils/constants';
import { getMyProfileDetailsSelector } from '../../../LoginHome/redux/selectors';

const stateSelector = createStructuredSelector({
  usefullAppsData: getUsefulAppsSelector,
  isDarkMode: isDarkModeSelector,
  myProfileData: getMyProfileDetailsSelector,
  featureModuleData: getFeatureModuleDataSelector
});

const UseFulApps = (props: any) => {
  const { onClickSeeAll, source } = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { usefullAppsData, isDarkMode, myProfileData, featureModuleData } =
    useSelector(stateSelector);

  const list = usefullAppsData?.length > 4 ? usefullAppsData?.slice(0, 4) : usefullAppsData || [];

  useEffect(() => {
    if (isFocused) {
      dispatch(getUsefulApps.trigger());
    }
  }, [isFocused]);

  if (usefullAppsData === undefined) {
    return <UsefullSkeleton isDarkMode={isDarkMode} />;
  }

  const mainSection = () => {
    return (
      <>
        {list && (
          <HeaderCateRow
            categoryName={localize('home.UsefulApps')}
            showSeeAll={true}
            onClickSeeAll={() => {
              onClickSeeAll();
            }}
          />
        )}

        <FlatList
          // horizontal={true}
          numColumns={4}
          contentContainerStyle={{ paddingLeft: RfW(12), paddingRight: RfW(12) }}
          showsHorizontalScrollIndicator={false}
          overScrollMode={'never'}
          style={{ marginVertical: RfH(12), paddingHorizontal: RfW(16) }}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          data={list || []}
          renderItem={({ item }) => (
            <View style={{ width: '25%', paddingHorizontal: RfW(2) }}>
              <UsefulAppsItem
                source={source}
                website={item?.website}
                icon={getImageUrl(item?.logo?.url)}
                text={item.name}
                iconHeight={RfH(48)}
                iconWidth={RfH(48)}
                loading={false}
                isFromHome={true}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </>
    );
  };

  if (
    getUserConfigData(
      myProfileData?.config?.config,
      CONFIG_CONSTANT?.USEFUL_APPS,
      featureModuleData
    )
  ) {
    return <View style={{ width: '100%', paddingTop: RfH(20) }}>{mainSection()}</View>;
  }

  return null;
};

export default memo(UseFulApps);
