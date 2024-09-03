import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, HeaderSVG } from '../../components';
import { Colors, CommonStyles, HEIGHT, Images, WIDTH } from '../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { isDarkModeSelector } from '../redux/selectors';
import UserListComponent from './UserListComponent';
import UserSearchModal from './UserSearchModal';
import { organizationStructure } from '../Home/redux/actions';
import { getOrganizationStructureDataSelector } from '../Home/redux/selectors';
import { getMyProfileDetailsSelector } from '../LoginHome/redux/selectors';
import { SCREEN_WIDTH } from '../../constant';
import { isEmpty } from 'lodash';
import OrganisationStructureSkeleton from '../../components/SkeletonLoader/OrganisationStructureSkeleton';
import { getSaveData } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserListModal from './UserListModal';
import { localize } from '../../locale/utils';
import WrapperContainer from '../../components/WrapperContainer';
import SearchIcon from '../../components/SearchIcon';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  organizationStructureData: getOrganizationStructureDataSelector,
  myProfileDetails: getMyProfileDetailsSelector
});

const Organisation = () => {
  const navigation = useNavigation();
  const disptach = useDispatch();
  const isFocused = useIsFocused();

  const flatListRef = useRef(null);

  const { isDarkMode, organizationStructureData, myProfileDetails } = useSelector(stateSelector);

  const [isVisibleSearchModal, setIsVisibleSearchModal] = useState(false);
  const [selfInfo, setSelfInfo] = useState({});
  const [managerList, setManagerList] = useState([]);
  const [colleaguesList, setColleaguesList] = useState([]);
  const [reporteeList, setReporteeListList] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [moduleInfo, setModuleInfo] = useState({
    isVisible: false,
    listFor: '',
    title: '',
    list: []
  });

  useEffect(() => {
    if (isFocused) {
      getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN).then((token) => setUserToken(token || ''));
      const id = myProfileDetails?.id;
      disptach(organizationStructure.trigger({ id }));
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isEmpty(organizationStructureData)) {
      const { user, managers, colleagues, reportees } = organizationStructureData || {};
      setSelfInfo(user || {});
      setManagerList(managers || []);
      setColleaguesList(colleagues || []);
      setReporteeListList(reportees || []);
    }
  }, [organizationStructureData]);

  const handleOnSelectUser = (selectedItem) => {
    setIsVisibleSearchModal(false);
    disptach(organizationStructure.trigger({ id: selectedItem?.id }));
  };

  const onPressSeeAll = (isFor: string) => {
    if (isFor === 'reportees') {
      //
      setModuleInfo({
        isVisible: true,
        listFor: 'reportees',
        title: localize('organisation.reporteesList'),
        list: reporteeList
      });
    } else if (isFor === 'colleagues') {
      //
      setModuleInfo({
        isVisible: true,
        listFor: 'colleagues',
        title: localize('organisation.colleaguesList'),
        list: colleaguesList
      });
    }
  };

  const renderManagerItem = ({ item }) => {
    const itemInfo = {
      ...item,
      username: item?.workEmail
    };
    return (
      <>
        <UserListComponent
          userToken={userToken}
          item={itemInfo}
          containerStyle={{ marginHorizontal: RfW(20) }}
          onPressItem={() => handleOnSelectUser({ id: item?.userId })}
        />
        <View style={styles.verticalGapContainer} />
      </>
    );
  };

  const renderReportiesItem = ({ item }) => {
    const isSingleList = reporteeList?.length === 1;
    return (
      <UserListComponent
        userToken={userToken}
        item={item}
        containerStyle={{
          marginRight: RfW(20),
          width: isSingleList ? SCREEN_WIDTH - RfW(40) : RfW(268)
        }}
        onPressItem={() => handleOnSelectUser({ id: item?.userId })}
      />
    );
  };

  const renderColleaguesItem = ({ item }) => {
    const isSingleList = colleaguesList?.length === 1;

    return (
      <UserListComponent
        userToken={userToken}
        item={item}
        containerStyle={{
          marginRight: RfW(20),
          width: isSingleList ? SCREEN_WIDTH - RfW(40) : RfW(268)
        }}
        onPressItem={() => handleOnSelectUser({ id: item?.userId })}
      />
    );
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const mainSection = () => {
    if (organizationStructureData === undefined) {
      return <OrganisationStructureSkeleton />;
    } else if (!isEmpty(organizationStructureData)) {
      return (
        <>
          {managerList?.length > 0 ? (
            <View style={styles.managersDivider}>
              <FlatList
                ref={flatListRef}
                data={managerList || []}
                keyExtractor={(_, index) => index?.toString()}
                renderItem={renderManagerItem}
                contentContainerStyle={{ paddingTop: RfH(28) }}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={scrollToBottom}
                onLayout={scrollToBottom}
              />
            </View>
          ) : null}
          <View style={{ paddingTop: RfH(22) }}>
            <UserListComponent
              userToken={userToken}
              item={selfInfo || {}}
              imageSize={RfH(72)}
              nameFontSize={18}
              isBorderDisable={true}
              isShowDepartmentName={true}
              containerStyle={{ marginHorizontal: RfW(20) }}
            />
            {reporteeList?.length > 0 ? (
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <CustomText
                    fontSize={16}
                    color={Colors.white}
                    styling={{
                      ...CommonStyles.regularFont500Style,
                      ...styles.headerTextStyle
                    }}>{`${selfInfo?.displayName}${localize('organisation.sReportees')} (${
                    reporteeList?.length
                  })`}</CustomText>
                  {reporteeList?.length > 4 ? (
                    <Pressable onPress={() => onPressSeeAll('reportees')}>
                      <CustomText
                        fontSize={12}
                        color={Colors.white}
                        styling={{
                          ...CommonStyles.regularFont500Style,
                          ...styles.seeAllTextStyle
                        }}>{`See All`}</CustomText>
                    </Pressable>
                  ) : null}
                </View>
                <FlatList
                  horizontal
                  data={reporteeList?.slice(0, 4) || []}
                  keyExtractor={(_, index) => index?.toString()}
                  renderItem={renderReportiesItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: RfW(20), marginTop: RfH(15) }}
                />
              </>
            ) : null}

            {colleaguesList?.length > 0 ? (
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <CustomText
                    fontSize={16}
                    color={Colors.white}
                    styling={{
                      ...CommonStyles.regularFont500Style,
                      ...styles.headerTextStyle
                    }}>{`${selfInfo?.displayName}${localize('organisation.sColleagues')} (${
                    colleaguesList?.length
                  })`}</CustomText>
                  {colleaguesList?.length > 4 ? (
                    <Pressable onPress={() => onPressSeeAll('colleagues')}>
                      <CustomText
                        fontSize={12}
                        color={Colors.white}
                        styling={{
                          ...CommonStyles.regularFont500Style,
                          ...styles.seeAllTextStyle
                        }}>
                        {localize('common.seeAll')}
                      </CustomText>
                    </Pressable>
                  ) : null}
                </View>
                <FlatList
                  horizontal
                  data={colleaguesList?.slice(0, 4) || []}
                  keyExtractor={(_, index) => index?.toString()}
                  renderItem={renderColleaguesItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: RfW(20), marginTop: RfH(15) }}
                />
              </>
            ) : null}
          </View>
        </>
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
            isBackButtonVisible={true}
            titleText={localize('organisation.organisation')}
            titleFont={20}
            onBackPressHandler={() => navigation.goBack()}
            isRightButtonVisible={true}
            rightIcon={
              // <TouchableOpacity
              //   style={{ alignItems: 'flex-end' }}
              //   onPress={() => setIsVisibleSearchModal(true)}>
              //   <CustomImage
              //     image={Images.search}
              //     imageWidth={WIDTH.W16}
              //     imageHeight={HEIGHT.H16}
              //     tintColor={isDarkMode ? Colors.white : Colors.app_black}
              //   />
              // </TouchableOpacity>
              <SearchIcon submitFunction={() => setIsVisibleSearchModal(true)} />
            }
          />
          {mainSection()}
        </View>
        <UserSearchModal
          isVisible={isVisibleSearchModal}
          onClose={() => setIsVisibleSearchModal(false)}
          onSelectUser={handleOnSelectUser}
        />
        <UserListModal
          isVisible={moduleInfo?.isVisible}
          module={moduleInfo}
          token={userToken}
          onRequestClose={() =>
            setModuleInfo({ isVisible: false, listFor: '', title: '', list: [] })
          }
          onPressItem={(userId) => {
            setModuleInfo({ isVisible: false, listFor: '', title: '', list: [] });
            handleOnSelectUser({ id: userId });
          }}
        />
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  verticalGapContainer: {
    height: RfH(15),
    width: RfH(1.5),
    backgroundColor: getColorWithOpacity(Colors.white, 0.5),
    alignSelf: 'center'
  },
  managersDivider: {
    maxHeight: RfH(218),
    borderBottomColor: Colors.white,
    borderBottomWidth: RfH(1)
  },
  headerTextStyle: {
    lineHeight: RfH(21),
    marginTop: RfH(30),
    paddingHorizontal: RfW(20),
    paddingBottom: RfH(7),
    width: RfW(300)
  },
  seeAllTextStyle: {
    lineHeight: RfH(21),
    marginTop: RfH(30),
    paddingHorizontal: RfW(20),
    paddingBottom: RfH(7)
  }
});

export default Organisation;
