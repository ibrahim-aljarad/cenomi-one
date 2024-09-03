import { useIsFocused, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isLoadingSelector } from '../../../appContainer/redux/selectors';
import { HeaderSVG } from '../../../components';
import DocumentsViewModal from '../../../components/DocumentsViewModal';
import EmptyListComponent from '../../../components/EmptyListComponent';
import HorizontalTabItems from '../../../components/HorizontalTabItems';
import { localize } from '../../../locale/utils';
import { Colors, Images } from '../../../theme';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { CATEGORYTYPEALL } from '../../../utils/constants';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { isDarkModeSelector } from '../../redux/selectors';
import { getKnowledgehubDocuments } from '../redux/actions';
import { getKnowledgehubDocumentsSelector, getKnowledgehubTagSelector } from '../redux/selectors';
import styles from '../styles';
import KnowledgehubDocumentsItem from './KnowledgehubDocumentsItem';
import { isValidUrl } from '../../../utils/helpers';
import NavigationRouteNames from '../../../routes/ScreenNames';
import WrapperContainer from '../../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  KnowledgehubDocumentsData: getKnowledgehubDocumentsSelector,
  KnowledgehubTagsData: getKnowledgehubTagSelector,
  isLoading: isLoadingSelector,
  isDarkMode: isDarkModeSelector
});

const KnowledgehubDocumentsList = (props: any) => {
  const { KnowledgeHubItem, redirectFrom = '' } = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { KnowledgehubDocumentsData, isLoading, KnowledgehubTagsData, isDarkMode } =
    useSelector(stateSelector);

  const [isModalDocumentVisible, setModalDocumentVisible] = useState<boolean>(false);
  const [isModalWebViewVisible, setIsModalWebViewVisible] = useState<boolean>(false);
  const [selectedDocumentItem, setSelectedDocumentItem] = useState({});
  const allItem = {
    name: localize('common.all'),
    isSelect: true,
    id: CATEGORYTYPEALL
  };
  const [tagList, setTagList] = useState([allItem]);
  const [allKnowledgehubDocumentsList, setAllKnowledgehubDocumentsList] = useState([]);
  const [KnowledgehubDocumentsList, setKnowledgehubDocumentsList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      trackEvent(EVENT_NAME.SCREEN_KNOWLEDGE_HUB_DOC_LIST);

      dispatch(getKnowledgehubDocuments.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isEmpty(KnowledgehubDocumentsData?.data)) {
      const tempList = KnowledgehubDocumentsData?.data?.filter((item) => {
        return item?.topic?.id === KnowledgeHubItem?.id;
      });
      getTagsList(tempList);
      setAllKnowledgehubDocumentsList(tempList);
      setKnowledgehubDocumentsList(tempList);
    }
  }, [KnowledgehubDocumentsData?.data]);

  const showDocumentTag = (tagId) => {
    const localTagList = tagList?.map((element) => {
      return { ...element, isSelect: element?.id === tagId ? true : false };
    });

    setTagList(localTagList);
    if (tagId === CATEGORYTYPEALL) {
      setKnowledgehubDocumentsList(allKnowledgehubDocumentsList);
    } else {
      const tempList = allKnowledgehubDocumentsList?.filter((item) => {
        return isTagAvailable(tagId, item?.tags);
      });
      setKnowledgehubDocumentsList(tempList);
    }
  };

  const getTagsList = (allknowledgehubList) => {
    let tempTagList = [];
    let alltempTagList = [];
    allknowledgehubList.map((item) => {
      tempTagList = [...tempTagList, ...item.tags];
    });
    tempTagList = Array.from(new Set(tempTagList?.map((item: any) => item.id)));
    tempTagList.map((item) => {
      const tagItem = KnowledgehubTagsData.find((element) => element.id === item);
      alltempTagList.push(tagItem);
    });

    setTagList([...[allItem], ...alltempTagList]);
  };
  const isTagAvailable = (tagId, tags) => {
    const item = tags?.find((item) => {
      return tagId === item?.id;
    });

    return item ? true : false;
  };

  const handleItemClick = (item) => {
    trackEvent(EVENT_NAME.PRESSED_KNOWLEDGE_HUB_DOCUMENT, { item });
    setModalDocumentVisible(true);
    const modifiedItem = { ...item, url: isValidUrl(item?.document?.url, true), title: item?.name };
    setSelectedDocumentItem(modifiedItem);

    // switch (item?.fileType?.toLowerCase()) {
    //   case DOCUMENTS_IMAGE.toLowerCase():
    //   case DOCUMENTS_JPG.toLowerCase():
    //   case DOCUMENTS_JPEG.toLowerCase():
    //   case DOCUMENTS_PNG.toLowerCase():
    //   case DOCUMENTS_PDF.toLowerCase():
    //   case DOCUMENTS_VIDEO.toLowerCase():
    //     setModalDocumentVisible(true);
    //     break;
    //   default:
    //     setIsModalWebViewVisible(true);
    //     break;
    // }
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
            titleText={KnowledgeHubItem?.name}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() =>
              redirectFrom === 'home'
                ? navigation.navigate(NavigationRouteNames.HOME as never)
                : navigation.goBack()
            }
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
            isBorderRadius={false}
          />
          <View
            style={{
              // height: RfH(31),
              paddingTop: RfH(10),
              paddingBottom: RfH(20),
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.headerBgColor,
              alignItems: 'flex-start',
              borderBottomLeftRadius: RfW(15),
              borderBottomRightRadius: RfW(15)
            }}>
            <FlatList
              data={tagList}
              horizontal={true}
              overScrollMode={'never'}
              contentContainerStyle={{
                paddingHorizontal: RfW(24),
                height: RfH(31)
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <HorizontalTabItems
                  item={item}
                  isDarkMode={isDarkMode}
                  onPress={(item) => {
                    showDocumentTag(item.id);
                  }}
                />
              )}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {KnowledgehubDocumentsList?.length > 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
              }}>
              <FlatList
                data={
                  KnowledgehubDocumentsList?.length > 0
                    ? KnowledgehubDocumentsList?.filter((item) => item?.name)?.sort(
                        (a, b) => a?.order - b?.order
                      )
                    : []
                }
                contentContainerStyle={{
                  paddingHorizontal: RfW(24)
                }}
                renderItem={({ item }) => (
                  <KnowledgehubDocumentsItem
                    item={item}
                    isDarkMode={isDarkMode}
                    onClickItems={handleItemClick}
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

        {isModalDocumentVisible && (
          <DocumentsViewModal
            isVisible={isModalDocumentVisible}
            documentInfo={selectedDocumentItem}
            onRequestClose={() => setModalDocumentVisible(false)}
            onClick={(item) => {}}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default KnowledgehubDocumentsList;
