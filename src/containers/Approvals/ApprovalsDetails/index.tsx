import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  CustomImage,
  CustomRenderHtml,
  HeaderSVG,
  Loader,
} from "../../../components";
import { Colors, HEIGHT, Images, WIDTH } from "../../../theme";
import styles from "./styles";

import { useNavigation } from "@react-navigation/native";

import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import DocumentsViewModal from "../../../components/DocumentsViewModal";
import { localize } from "../../../locale/utils";
import {
  getApprovalTasksDetails,
  getLeasingTasksDetails,
  getProcurementTaskDetails,
  getWorkflowTasksDetails,
} from "../redux/actions";
import { getApprovalTasksDetailsSelector } from "../redux/selectors";

import { isEmpty } from "lodash";
import { EVENT_NAME, trackEvent } from "../../../utils/analytics";
import Config from "../../../utils/config";
import { LOCAL_STORAGE_DATA_KEY } from "../../../utils/constants";
import { getSaveData } from "../../../utils/helpers";
import { isDarkModeSelector } from "../../redux/selectors";
import {
  isDealWorkflowModuleCheck,
  isProcurementServiceModuleCheck,
  isYardiServiceModuleCheck,
} from "../serializer";
import ApprovalsActionButtons from "./ApprovalsActionButtons";
import AttachmentModal from "./AttachmentModal";
import WrapperContainer from "../../../components/WrapperContainer";
import WorkflowDetails from "./WorkflowDetails";
import { ThemeProvider } from "../../../theme/context";
import ProcurementDetails from "./ProcurementDetails";

const approvalTasksDetailsData = {
  length: 0,
  title: "Approve Purchase Order 0008912",
  attachments: [
    {
      title: "PO_0008912_0.pdf",
      updatedBy:
        "Applications Development Framework Application Identity for Procurement",
      updatedDate: "2024-11-14 12:10:04",
      userId: "fusion_apps_prc_adf_appid",
      links: null,
      href: "https://fa-etiv-test-saasfaprod1.fa.ocs.oraclecloud.com:443/bpm/api/4.0/tasks/1691727/attachments/PO_0008912_0.pdf",
      rel: "self",
      attachmentName: null,
      attachmentScope: "PARENT_TASK",
      attachmentSize: 10,
      content: null,
      input: null,
      mimeType: "application/pdf",
      uri: {
        length: 0,
        rel: "stream",
        href: "https://fa-etiv-test-saasfaprod1.fa.ocs.oraclecloud.com:443/bpm/api/4.0/tasks/1691727/attachments/PO_0008912_0.pdf/stream",
      },
    },
  ],
  applicationContext: "fscm",
  approvalDuration: 0,
  assignedDate: "2024-11-14 12:10:27",
  category: "Purchasing",
  createdBy: "Shekar Sesham",
  createdDate: "2024-11-14 12:10:28",
  fromUserDisplayName: "Shekar Sesham",
  fromUserName: "shekar.sesham",
  hasSubTasksFlag: false,
  identificationKey: "PO_145001_300001565959162_0",
  number: 1691727,
  ownerUser:
    "Applications Development Framework Application Identity for Procurement",
  priority: 3,
  rootTaskNumber: "1691726",
  state: "ASSIGNED",
  taskDefinitionName: "DocumentApproval",
  taskId: "1f6c1c5d-8186-4160-8c61-5f8cd15ec4db",
  taskNamespace:
    "http://xmlns.oracle.com/apps/prc/po/approval/PrcPoApprovalComposite/DocumentApproval",
  titlePrefix: "Action Required",
  updatedDate: "2024-11-14 12:10:28",
  featureModule: "approvals_procurement",
  subModule: {
    name: "PO",
    externalId: "DocumentApproval",
  },
  date: "Nov-14-2024 | 05:40 pm",
  externalId: "1691727",
  taskDetailsData: [
    { name: "Purchase Order", value: null },
    { name: "Supplier", value: null },
    { name: "Total", value: "undefined undefined" },
    { name: "Description", value: "" },
    { name: "Price", value: "" },
    { name: "Quantity", value: "" },
    { name: "UnitPrice", value: "" },
    { name: "Item", value: "" },
  ],
  resultTaskHistoryData: [
    {
      actionName: "Assigned",
      attachmentUri: null,
      displayName: "App Tester",
      infoRequestedFrom: null,
      infoSubmittedTo: null,
      pattern: "SequentialParticipant",
      reason: "PreApprovalHierarchyRules_Auto",
      state: "ASSIGNED",
      updatedDate: "Nov-14-2024 | 05:40 pm",
      userId: "app.tester",
      comments: "hello",
      related: [],
      emailBase64: "YXBwLnRlc3Rlcg==",
    },
    {
      actionName: "Submitted",
      displayName: "Shekar Sesham",
      updatedDate: "Nov-14-2024 | 05:40 pm",
      userId: "shekar.sesham",
      emailBase64: "c2hla2FyLnNlc2hhbQ==",
    },
  ],
  config: {
    apiBaseUrl: "https://staging.cenomi.com/api/v2",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3MzMyMzc2MDkwMTgsInRva2VuIjoiclZjeE9vKlVSaTMlTFZjZW02Y3pDM3VsM2ROUlcjUkpmaVJvVWJGJElBdyoxVE0hZXdwRGUhdUZ2JGdMRmwzTyIsImlhdCI6MTczMzIzNzYwOSwiZXhwIjoxNzMzMjM3OTA5fQ.659AcZMXeRD5-qGqoABtqAH7XIeHVVCOH3TyjlSDxbA",
  },
};

const stateSelector = createStructuredSelector({
  //   approvalTasksDetailsData: getApprovalTasksDetailsSelector,
  isDarkMode: isDarkModeSelector,
});

const ApprovalsDetails = (props: any) => {
  const navigation = useNavigation();

  const [isModalDocumentVisible, setModalDocumentVisible] =
    useState<boolean>(false);
  const [selectedDocumentItem, setSelectedDocumentItem] = useState({});
  const { approvalItem, fromNotification, approvalType } = props.route.params;

  const [attachmentListModal, setAttachmentListModal] = useState(false);
  const [documentInfo, setDocumentInfo] = useState({
    title: "",
    url: "",
    fileType: "",
    headers: {},
  });

  const dispatch = useDispatch();

  const { isDarkMode } = useSelector(stateSelector);

  // approvalType is the servicemodule name
  const isYardiServiceModule = isYardiServiceModuleCheck(approvalItem);
  const isProcurementServiceModule =
    isProcurementServiceModuleCheck(approvalItem);
  const isDealWorkflowModule = isDealWorkflowModuleCheck(approvalItem);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPROVALS_DETAILS);

    if (isYardiServiceModule) {
      const data = {
        type: approvalItem?.additionalInfo?.type,
        workflowName: approvalItem?.additionalInfo?.workflowName,
        recordId: approvalItem?.additionalInfo?.recordId,
        recordCode: approvalItem?.additionalInfo?.recordCode,
      };
      dispatch(getLeasingTasksDetails.trigger({ data }));
    } else if (isProcurementServiceModule) {
      dispatch(
        getProcurementTaskDetails.trigger({ taskId: approvalItem?.externalId })
      );
    } else if (isDealWorkflowModule) {
      dispatch(
        getWorkflowTasksDetails.trigger({ taskId: approvalItem?.number })
      );
    } else {
      dispatch(
        getApprovalTasksDetails.trigger({ taskId: approvalItem?.externalId })
      );
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

      const splitedTitle = item?.AttachmentName?.split(".");

      title = item?.AttachmentName;
      url = `${Config.API_BASE_URL}process/leasing/tasks-attachments/${item?.AttachmentID}?download=false&token=${token}`;
      fileType =
        splitedTitle?.length > 0 ? splitedTitle[splitedTitle?.length - 1] : "";
    } else {
      const fileName = item?.title || item?.attachmentName;
      const splitedData = fileName?.split(".");
      const splitedMimeType = item?.mimeType?.split("/");

      title = fileName || splitedMimeType[1] + " file";

      url = item?.uri?.href;
      fileType =
        splitedData?.length > 0
          ? splitedData[splitedData?.length - 1]
          : splitedMimeType?.length > 0
          ? splitedMimeType[1]
          : "";
    }

    setDocumentInfo({
      title,
      url,
      fileType,
      headers: approvalTasksDetailsData?.attachmentAuthHeaders || {},
    });

    setSelectedDocumentItem(item);
    setModalDocumentVisible(true);
    setAttachmentListModal(false);
  };

  return (
    <WrapperContainer showOverlay={true}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
        }}
      >
        <View style={styles.mainContainer}>
          <ThemeProvider useNewStyles={true}>
            <HeaderSVG
              isRightButtonVisible={
                !isEmpty(approvalTasksDetailsData) &&
                approvalTasksDetailsData?.attachments?.length > 0
              }
              isBackButtonVisible={true}
              rightIcon={
                <TouchableOpacity
                  style={{ alignItems: "flex-end" }}
                  onPress={callAttachmentApi}
                >
                  <CustomImage
                    image={Images.attachment}
                    imageWidth={WIDTH.W24}
                    imageHeight={HEIGHT.H24}
                    tintColor={isDarkMode ? Colors.white : Colors.white}
                  />
                </TouchableOpacity>
              }
              titleText={
                approvalItem.externalId
                  ? approvalItem.externalId +
                    " - " +
                    (approvalItem.subModule?.name ||
                      approvalItem.subModuleName ||
                      "")
                  : approvalItem?.heading
              }
              titleFont={20}
              onRightButtonClickHandler={() => {}}
              onBackPressHandler={() => navigation.goBack()}
              isRight2BtnVisible={false}
            />
          </ThemeProvider>

          <ScrollView
            style={{
              backgroundColor: isDarkMode
                ? Colors.darkModeBackground
                : Colors.transparent,
              flex: 1,
            }}
          >
            {isDealWorkflowModule ? (
              <WorkflowDetails
                data={approvalTasksDetailsData}
                isDarkMode={isDarkMode}
                approvalType={approvalItem?.externalId}
                formName={approvalItem?.formName}
              />
            ) : (
              <ProcurementDetails
                isDarkMode={isDarkMode}
                taskDetails={approvalTasksDetailsData}
              />
            )}
          </ScrollView>

          {!isEmpty(approvalTasksDetailsData) &&
            (approvalTasksDetailsData?.actionRequired ||
              isDealWorkflowModule) && (
              <View
                style={[
                  styles.bottomButtonContainer,
                  {
                    backgroundColor: isDarkMode
                      ? Colors.darkModeBackground
                      : Colors.white,
                    borderTopColor: Colors.grayBorder,
                    zIndex: 1,
                  },
                ]}
              >
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
              headerText={localize("approvals.attachments")}
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
                setDocumentInfo({
                  title: "",
                  url: "",
                  fileType: "",
                  headers: {},
                });
                setModalDocumentVisible(false);
              }}
              onClick={(item) => {}}
            />
          )}
        </View>
        <Loader
          isLoading={
            isEmpty(approvalTasksDetailsData) ||
            (!(isDealWorkflowModule || isProcurementServiceModule) &&
              !approvalTasksDetailsData?.html)
          }
        />
      </SafeAreaView>
    </WrapperContainer>
  );
};

ApprovalsDetails.propTypes = {
  route: PropTypes.object,
  isButtonDisable: PropTypes.bool,
};
ApprovalsDetails.defaultProps = {
  route: {},
  isButtonDisable: false,
};

export default ApprovalsDetails;
