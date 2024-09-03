import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomRenderHtml, HeaderSVG, Loader } from '../../../components';
import { Colors, HEIGHT, Images, WIDTH } from '../../../theme';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DocumentsViewModal from '../../../components/DocumentsViewModal';
import { localize } from '../../../locale/utils';
import {
  getApprovalTasksDetails,
  getLeasingTasksDetails,
  getProcurementTaskDetails
} from '../redux/actions';
import { getApprovalTasksDetailsSelector } from '../redux/selectors';

import { isEmpty } from 'lodash';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import Config from '../../../utils/config';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import { getSaveData } from '../../../utils/helpers';
import { isDarkModeSelector } from '../../redux/selectors';
import { isProcurementServiceModuleCheck, isYardiServiceModuleCheck } from '../serializer';
import ApprovalsActionButtons from './ApprovalsActionButtons';
import AttachmentModal from './AttachmentModal';
import WrapperContainer from '../../../components/WrapperContainer';
import { getColorWithOpacity } from '../../../utils/helper';

const stateSelector = createStructuredSelector({
  approvalTasksDetailsData: getApprovalTasksDetailsSelector,
  isDarkMode: isDarkModeSelector
});

const ApprovalsDetails = (props: any) => {
  const navigation = useNavigation();

  const [isModalDocumentVisible, setModalDocumentVisible] = useState<boolean>(false);
  const [selectedDocumentItem, setSelectedDocumentItem] = useState({});
  const { approvalItem, fromNotification, approvalType } = props.route.params;

  const [attachmentListModal, setAttachmentListModal] = useState(false);
  const [documentInfo, setDocumentInfo] = useState({
    title: '',
    url: '',
    fileType: '',
    headers: {}
  });

  const dispatch = useDispatch();

  const { approvalTasksDetailsData, isDarkMode } = useSelector(stateSelector);

  // approvalType is the servicemodule name
  const isYardiServiceModule = isYardiServiceModuleCheck(approvalItem);
  const isProcurementServiceModule = isProcurementServiceModuleCheck(approvalItem);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPROVALS_DETAILS);

    if (isYardiServiceModule) {
      const data = {
        type: approvalItem?.additionalInfo?.type,
        workflowName: approvalItem?.additionalInfo?.workflowName,
        recordId: approvalItem?.additionalInfo?.recordId,
        recordCode: approvalItem?.additionalInfo?.recordCode
      };
      dispatch(getLeasingTasksDetails.trigger({ data }));
    } else if (isProcurementServiceModule) {
      dispatch(getProcurementTaskDetails.trigger({ taskId: approvalItem?.externalId }));
    } else {
      dispatch(getApprovalTasksDetails.trigger({ taskId: approvalItem?.externalId }));
    }
  }, []);

  // attachments of a task
  const callAttachmentApi = () => {
    trackEvent(EVENT_NAME.PRESSED_APPROVALS_ATTACHMENT);

    setAttachmentListModal(approvalTasksDetailsData?.attachments?.length > 0);
  };

  const handleAttechmentItemClick = async (item) => {
    let title, url, fileType;

    if (isYardiServiceModule) {
      // call api for document download
      const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);

      const splitedTitle = item?.AttachmentName?.split('.');

      title = item?.AttachmentName;
      url = `${Config.API_BASE_URL}process/leasing/tasks-attachments/${item?.AttachmentID}?download=false&token=${token}`;
      fileType = splitedTitle?.length > 0 ? splitedTitle[splitedTitle?.length - 1] : '';
    } else {
      const fileName = item?.title || item?.attachmentName;
      const splitedData = fileName?.split('.');
      const splitedMimeType = item?.mimeType?.split('/');

      title = fileName || splitedMimeType[1] + ' file';

      url = item?.uri?.href;
      fileType =
        splitedData?.length > 0
          ? splitedData[splitedData?.length - 1]
          : splitedMimeType?.length > 0
          ? splitedMimeType[1]
          : '';
    }

    setDocumentInfo({
      title,
      url,
      fileType,
      headers: approvalTasksDetailsData?.attachmentAuthHeaders || {}
    });

    setSelectedDocumentItem(item);
    setModalDocumentVisible(true);
    setAttachmentListModal(false);
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View style={styles.mainContainer}>
          <HeaderSVG
            // showing attachment even when action required is false
            // for yardi AttachmentList?.length
            // oracle hrm - approvalTasksDetailsData?.attachments?.length
            isRightButtonVisible={
              !isEmpty(approvalTasksDetailsData) &&
              approvalTasksDetailsData?.attachments?.length > 0
            }
            isBackButtonVisible={true}
            rightIcon={
              <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={callAttachmentApi}>
                <CustomImage
                  image={Images.attachment}
                  imageWidth={WIDTH.W16}
                  imageHeight={HEIGHT.H16}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />
              </TouchableOpacity>
            }
            titleText={
              approvalItem.externalId +
              ' - ' +
              (approvalItem.subModule?.name || approvalItem.subModuleName || '')
            }
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => navigation.goBack()}
            isRight2BtnVisible={false}
          />

          <ScrollView
            style={{
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent,
              flex: 1
            }}>
            <CustomRenderHtml
              source={approvalTasksDetailsData?.html}
              style={{ backgroundColor: Colors.transparent }}
            />
          </ScrollView>

          {!isEmpty(approvalTasksDetailsData) && approvalTasksDetailsData?.actionRequired && (
            <View
              style={[
                styles.bottomButtonContainer,
                {
                  backgroundColor: isDarkMode
                    ? Colors.darkModeBackground
                    : getColorWithOpacity(Colors.white, 0.2),
                  borderTopColor: Colors.grayBorder
                }
              ]}>
              <ApprovalsActionButtons
                isDarkMode={isDarkMode}
                approvalItem={approvalItem}
                detailData={approvalTasksDetailsData}
                actionSuccess={() => navigation.goBack()}
              />
            </View>
          )}
          {attachmentListModal && (
            <AttachmentModal
              isDarkMode={isDarkMode}
              isVisible={attachmentListModal}
              headerText={localize('approvals.attachments')}
              openModal={() => setAttachmentListModal(false)}
              attachments={approvalTasksDetailsData?.attachments}
              onClick={(item) => {
                handleAttechmentItemClick(item);
              }}
            />
          )}

          {isModalDocumentVisible && (
            <DocumentsViewModal
              isVisible={isModalDocumentVisible}
              documentInfo={documentInfo}
              onRequestClose={() => {
                setDocumentInfo({ title: '', url: '', fileType: '', headers: {} });
                setModalDocumentVisible(false);
              }}
              onClick={(item) => {}}
            />
          )}
        </View>
        <Loader isLoading={!approvalTasksDetailsData?.html} />
      </SafeAreaView>
    </WrapperContainer>
  );
};

ApprovalsDetails.propTypes = {
  route: PropTypes.object,
  isButtonDisable: PropTypes.bool
};
ApprovalsDetails.defaultProps = {
  route: {},
  isButtonDisable: false
};

export default ApprovalsDetails;
