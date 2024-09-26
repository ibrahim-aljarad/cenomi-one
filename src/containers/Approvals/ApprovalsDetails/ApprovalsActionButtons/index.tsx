import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  CustomImage,
  CustomText,
  IconButtonWrapper,
} from "../../../../components";
import { Colors, CommonStyles } from "../../../../theme";
import { RfH, RfW } from "../../../../utils/helpers";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../../../components/CustomModal";
import {
  DoApprovalActionDone,
  doApprovalAction,
  doLeasingTakeAction,
  doProucurementAction,
} from "../../redux/actions";
import {
  ACTION_TYPE_FUSION,
  ACTION_TYPE_WORKFLOW,
  ACTION_TYPE_YARDI,
  FUSION_STATE,
  PROCUREMENT_ACTION_TYPE_FUSION,
  RFI_ACTION_TYPE_FUSION,
  getUserName,
  isDealWorkflowModuleCheck,
  isProcurementServiceModuleCheck,
  isYardiServiceModuleCheck,
} from "../../serializer";
import DefaultActionModal from "../DefaultActionModal";

import { isEmpty } from "lodash";
import { createStructuredSelector } from "reselect";
import { localize } from "../../../../locale/utils";
import { EVENT_NAME, trackEvent } from "../../../../utils/analytics";
import { getApprovalActionDataSelector } from "../../redux/selectors";
import YardiActionListModal from "../YardiActionListModal";
import { getNotification } from "../../../Notifications/redux/actions";
import CustomInAppReview from "../../../../components/CustomInAppReview";

const stateSelector = createStructuredSelector({
  approvalActionData: getApprovalActionDataSelector,
});
const ApprovalsActionButtons = (props) => {
  const navigation = useNavigation();
  const { approvalItem, detailData, actionSuccess, isDarkMode } = props;
  const [clickedActionItem, setClickedActionItem] = useState({});
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState("");
  const { approvalActionData } = useSelector(stateSelector);
  const [yardiActionListModal, setYardiActionListModal] = useState(false);
  const [showDefaultActionModal, setShowDefaultActionModal] = useState(false);
  const [isShowInAppReview, setIsShowInAppReview] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(approvalActionData?.data)) {
      setShowDefaultActionModal(false);
      dispatch(getNotification.trigger({ page: 1, size: 20 }));
      setIsSuccessModal(true);
    }
  }, [approvalActionData?.data]);

  const handleDoneAction = () => {
    setIsSuccessModal(false);
    dispatch(DoApprovalActionDone.trigger());

    // Show inapp review modal
    setIsShowInAppReview(true);

    actionSuccess && actionSuccess();
  };

  const onActionBtnCall = (actionItem) => {
    trackEvent(EVENT_NAME.PRESSED_APPROVALS_ACTION, {
      actionInfo: approvalItem,
    });
    try {
      if (isYardiServiceModuleCheck(approvalItem)) {
        setYardiActionListModal(true);
      } else {
        // option to change approver - isShowApproverSection
        setShowDefaultActionModal(true);
      }
      setClickedActionItem(actionItem);
    } catch (error) {
      // handleError(error);
    }
  };

  const renderActionButton = (actionItem, index) => (
    <TouchableOpacity
      disabled={false}
      activeOpacity={0.7}
      style={{ justifyContent: "center", alignItems: "center" }}
      key={index}
      onPress={() => onActionBtnCall(actionItem)}
    >
      <CustomImage
        image={actionItem?.image}
        imageWidth={RfW(20)}
        imageHeight={RfW(20)}
        imageResizeMode={"contain"}
        tintColor={isDarkMode ? Colors.white : Colors.white}
      />
      <CustomText
        fontSize={12}
        color={Colors.white}
        styling={{
          marginTop: RfH(10),
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(12),
        }}
      >
        {actionItem?.label}
      </CustomText>
    </TouchableOpacity>
  );

  const handleOnActionClick = (actionPayload) => {
    trackEvent(EVENT_NAME.PRESSED_APPROVALS_ACTION_SUBMIT, {
      type: actionPayload?.id,
    });

    setShowDefaultActionModal(false);

    if (isYardiServiceModuleCheck(approvalItem)) {
      setSuccessText(actionPayload?.label + " " + actionPayload?.successText);
      dispatch(
        doLeasingTakeAction.trigger({
          type: detailData?.Type,
          workflowName: detailData?.Workflow_Name,
          propertyName: detailData?.Property_Name,
          recordId: detailData?.RecordID,
          recordCode: detailData?.RecordCode,
          stepName: detailData?.StepName,
          nextStepName: actionPayload?.label,
          comments: actionPayload?.comment,
        })
      );
    } else if (isProcurementServiceModuleCheck(approvalItem)) {
      setSuccessText(actionPayload?.successText);
      const data = {
        action: actionPayload?.actionType,
        comments: actionPayload?.comment,
        assignTo: actionPayload?.showApproverSection
          ? getUserName(actionPayload.user)
          : actionPayload?.user?.fromUserName,
      };

      dispatch(
        doProucurementAction.trigger({ taskId: approvalItem?.externalId, data })
      );
    } else {
      setSuccessText(actionPayload.successText);
      const data = {
        taskId: approvalItem?.externalId,

        action: actionPayload?.actionType,
        comments: actionPayload?.comment,
        assignTo: actionPayload?.showApproverSection
          ? getUserName(actionPayload.user)
          : actionPayload?.user?.fromUserName,
      };

      dispatch(doApprovalAction.trigger(data));
    }
  };

  return (
    <View>
      {/* select actionListType */}
      {isYardiServiceModuleCheck(approvalItem) ? (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {ACTION_TYPE_YARDI?.map((action, index) =>
            renderActionButton(action, index)
          )}
        </View>
      ) : isProcurementServiceModuleCheck(approvalItem) ? (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {PROCUREMENT_ACTION_TYPE_FUSION?.map((action, index) =>
            renderActionButton(action, index)
          )}
        </View>
      ) : isDealWorkflowModuleCheck(approvalItem) ? (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {ACTION_TYPE_WORKFLOW?.map((action, index) =>
            renderActionButton(action, index)
          )}
        </View>
      ) : detailData?.state !== FUSION_STATE.INFO_REQUESTED ? (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {ACTION_TYPE_FUSION?.map((action, index) =>
            renderActionButton(action, index)
          )}
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {RFI_ACTION_TYPE_FUSION?.map((action, index) =>
            renderActionButton(action, index)
          )}
        </View>
      )}

      {showDefaultActionModal && (
        <DefaultActionModal
          isDarkMode={isDarkMode}
          taskItem={{ ...approvalItem, ...detailData }}
          isVisible={showDefaultActionModal}
          onClose={() => setShowDefaultActionModal(false)}
          actionModule={clickedActionItem}
          onActionClick={handleOnActionClick}
        />
      )}

      {isSuccessModal ? (
        <CustomModal
          title={successText}
          modalVisible={isSuccessModal}
          onRequestClose={() => setIsSuccessModal(false)}
          onRequestActionButton={() => {
            handleDoneAction();
          }}
        />
      ) : null}

      {yardiActionListModal && (
        <YardiActionListModal
          isDarkMode={isDarkMode}
          isVisible={yardiActionListModal}
          headerText={`Actions`}
          onClose={() => setYardiActionListModal(false)}
          actionList={detailData?.ActionList}
          onClick={(item) => {
            setClickedActionItem({
              ...clickedActionItem,
              label: item.Next_Step_Name,
            });
            setShowDefaultActionModal(true);
            setYardiActionListModal(false);
          }}
        />
      )}

      {isShowInAppReview ? (
        <CustomInAppReview
          isShow={isShowInAppReview}
          onDone={() => setIsShowInAppReview(false)}
        />
      ) : null}
    </View>
  );
};

ApprovalsActionButtons.propTypes = {
  item: PropTypes.any,
  actionSuccess: PropTypes.func,
  detailData: PropTypes.object,
};
ApprovalsActionButtons.defaultProps = {
  item: {},
  actionSuccess: null,
  detailData: {},
};
export default ApprovalsActionButtons;
