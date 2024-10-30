import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Loader } from "../../../../components";
import DocumentsViewModal from "../../../../components/DocumentsViewModal";
import WrapperContainer from "../../../../components/WrapperContainer";
import NavigationRouteNames from "../../../../routes/ScreenNames";
import { isValidUrl } from "../../../../utils/helpers";
import { isDarkModeSelector } from "../../../redux/selectors";
import { getKnowledgehubDocuments } from "../../redux/actions";
import {
  getKnowledgehubDocumentsSelector,
  getKnowledgeHubLoadingSelector,
} from "../../redux/selectors";

const stateSelector = createStructuredSelector({
  KnowledgehubDocumentsData: getKnowledgehubDocumentsSelector,
  isLoading: getKnowledgeHubLoadingSelector,
  isDarkMode: isDarkModeSelector,
});

const KnowledgeHubDetailsScreen = ({ route }) => {
  const { externalId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { KnowledgehubDocumentsData, isLoading, isDarkMode } =
    useSelector(stateSelector);
  const [selectedDocumentItem, setSelectedDocumentItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getKnowledgehubDocuments.trigger());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && KnowledgehubDocumentsData?.data?.length > 0) {
      const documentItem = KnowledgehubDocumentsData?.data?.find(
        (item) => item.id === externalId
      );
      if (documentItem) {
        const modifiedItem = {
          ...documentItem,
          url: isValidUrl(documentItem?.document?.url, true),
          title: documentItem?.name,
        };
        setSelectedDocumentItem(modifiedItem);
        setIsModalVisible(true);
      }
    }
  }, [KnowledgehubDocumentsData.data, isLoading, externalId]);

  const handleClose = () => {
    setIsModalVisible(false);
    navigation.navigate(NavigationRouteNames.HOME_TAB as never);
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
        }}
      >
        {isModalVisible && (
          <DocumentsViewModal
            isVisible={isModalVisible}
            onRequestClose={handleClose}
            documentInfo={selectedDocumentItem}
            onClick={() => {}}
          />
        )}

        {isLoading && <Loader isLoading={isLoading} />}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default KnowledgeHubDetailsScreen;
