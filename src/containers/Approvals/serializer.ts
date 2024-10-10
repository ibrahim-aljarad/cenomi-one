import { isArray, isEmpty } from "lodash";
import { Colors, Images } from "../../theme";
import { localize } from "../../locale/utils";

export const searchOriginalApprovalList = (data: any) => {
  let finalArray: any[] = [];
  try {
    if (data && data !== "NULL") {
      const approvalsData = isArray(data) ? data : [data];
      const enabledApprovalList = approvalsData.filter((item) => item.enabled);
      for (let i = 0; i < enabledApprovalList.length; i++) {
        const module = enabledApprovalList[i];
        const submoduleArray = module.subModule;
        finalArray = finalArray.concat(submoduleArray);
      }
      return finalArray.sort((a, b) => b.badgeCount - a.badgeCount);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const FUSION_STATE = {
  INFO_REQUESTED: "INFO_REQUESTED",
  ASSIGNED: "ASSIGNED",
};

export const workflowDesicionLookupIdEnum = {
  reject: 2,
  approve: 4,
  request_info: 3,
};

export const getName = (item) => {
  if (!isEmpty(item?.createdBy)) {
    return item?.createdBy;
  } else if (!isEmpty(item?.fromUserDisplayName)) {
    return item?.fromUserDisplayName;
  } else if (!isEmpty(item?.ownerUser)) {
    return item?.ownerUser;
  } else if (!isEmpty(item?.displayName)) {
    return item?.displayName;
  }
};
export const getUserName = (item) => {
  if (!isEmpty(item?.fromUserName)) {
    return item?.fromUserName;
  } else if (!isEmpty(item?.username)) {
    return item?.username;
  } else {
    return "";
  }
};

export const isYardiServiceModuleCheck = (item) => {
  if (
    item?.featureModule?.toString()?.indexOf("_yardi") > -1 ||
    item?.serviceModule?.toString()?.indexOf("_yardi") > -1 ||
    item?.toString()?.indexOf("_yardi") > -1
  ) {
    return true;
  }
  return false;
};
export const isProcurementServiceModuleCheck = (item) => {
  if (
    item?.featureModule?.toString()?.indexOf("_procurement") > -1 ||
    item?.serviceModule?.toString()?.indexOf("_procurement") > -1 ||
    item?.toString()?.indexOf("_procurement") > -1
  ) {
    return true;
  }
  return false;
};
export const isDealWorkflowModuleCheck = (item) => {
  if (
    item?.featureModule?.toString()?.indexOf("_it") > -1 ||
    item?.serviceModule?.toString()?.indexOf("_it") > -1 ||
    item?.toString()?.indexOf("_it") > -1
  ) {
    return true;
  }
  return false;
};
export const ACTION_TYPE_FUSION = [
  {
    label: localize("hrRequest.actionButton.requestInfo"),
    id: "request_info",
    statusId: 0,
    fwdType: 1,
    actionType: "INFO_REQUEST",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.requestSuccessMsg"),
    module: "hr",
    image: Images.requestInfo,
    darkImage: Images.requestInfoIconWhite,
    textColor: Colors.coolGrey,
    eventSuffix: "_for",
    imageDisable: Images.requestInfoGrey,
    isFwd: 0,
    showApproverSection: true,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.requestInfo"),
  },
  // {
  //   label: 'Reassign',
  //   id: 'reassign',
  //   statusId: 0,
  //   fwdType: 2,
  //   actionType: 'REASSIGN',
  //   isPasswordNeeded: false,
  //   successText: 'Reassigned Successfully',
  //   module: 'hr',
  //   image: Images.reassign,
  //   textColor: Colors.colorReassign,
  //   eventSuffix: '_rea',
  //   imageDisable: Images.reassignGrey,
  //   isFwd: 0,
  // showApproverSection: true,
  // approverSectionText:localize('hrRequest.actionButton.changeApprover'),
  // isCommentRequired: false,buttonText:'Reassign'

  // },
  {
    label: localize("hrRequest.actionButton.reject"),
    id: "reject",
    statusId: 3,
    fwdType: 0,
    actionType: "REJECT",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.rejectSuccessMsg"),
    module: "hr",
    image: Images.reject,
    darkImage: Images.rejectIconWhite,
    textColor: Colors.colorReject,
    eventSuffix: "_rej",
    imageDisable: Images.rejectGrey,
    isFwd: 0,
    showApproverSection: false,
    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.reject"),
  },
  {
    label: localize("hrRequest.actionButton.approve"),
    id: "approve",
    statusId: 2,
    fwdType: 0,
    actionType: "APPROVE",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.arroveSuccessMsg"),
    module: "hr",
    image: Images.approve,
    darkImage: Images.approveIconWhite,
    textColor: Colors.colorApprove,
    eventSuffix: "_apr",
    imageDisable: Images.approveGrey,
    isFwd: 0,
    showApproverSection: false,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: false,
    buttonText: localize("hrRequest.actionButton.approve"),
  },
];

export const ACTION_TYPE_WORKFLOW = [
  {
    label: localize("hrRequest.actionButton.requestInfo"),
    id: "request_info",
    statusId: 0,
    fwdType: 1,
    actionType: "INFO_REQUEST",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.requestSuccessMsg"),
    module: "workflow",
    image: Images.requestInfo,
    darkImage: Images.requestInfoIconWhite,
    textColor: Colors.coolGrey,
    eventSuffix: "_for",
    imageDisable: Images.requestInfoGrey,
    isFwd: 0,
    showApproverSection: true,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.requestInfo"),
  },
  // {
  //   label: 'Reassign',
  //   id: 'reassign',
  //   statusId: 0,
  //   fwdType: 2,
  //   actionType: 'REASSIGN',
  //   isPasswordNeeded: false,
  //   successText: 'Reassigned Successfully',
  //   module: 'hr',
  //   image: Images.reassign,
  //   textColor: Colors.colorReassign,
  //   eventSuffix: '_rea',
  //   imageDisable: Images.reassignGrey,
  //   isFwd: 0,
  // showApproverSection: true,
  // approverSectionText:localize('hrRequest.actionButton.changeApprover'),
  // isCommentRequired: false,buttonText:'Reassign'

  // },
  {
    label: localize("hrRequest.actionButton.reject"),
    id: "reject",
    statusId: 3,
    fwdType: 0,
    actionType: "REJECT",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.rejectSuccessMsg"),
    module: "workflow",
    image: Images.reject,
    darkImage: Images.rejectIconWhite,
    textColor: Colors.colorReject,
    eventSuffix: "_rej",
    imageDisable: Images.rejectGrey,
    isFwd: 0,
    showApproverSection: false,
    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.reject"),
  },
  {
    label: localize("hrRequest.actionButton.approve"),
    id: "approve",
    statusId: 2,
    fwdType: 0,
    actionType: "APPROVE",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.arroveSuccessMsg"),
    module: "workflow",
    image: Images.approve,
    darkImage: Images.approveIconWhite,
    textColor: Colors.colorApprove,
    eventSuffix: "_apr",
    imageDisable: Images.approveGrey,
    isFwd: 0,
    showApproverSection: false,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.approve"),
  },
];
export const PROCUREMENT_ACTION_TYPE_FUSION = [
  {
    label: localize("hrRequest.actionButton.requestInfo"),
    id: "request_info",
    statusId: 0,
    fwdType: 1,
    actionType: "INFO_REQUEST",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.requestSuccessMsg"),
    module: "hr",
    image: Images.requestInfo,
    darkImage: Images.requestInfoIconWhite,
    textColor: Colors.coolGrey,
    eventSuffix: "_for",
    imageDisable: Images.requestInfoGrey,
    isFwd: 0,
    showApproverSection: true,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.requestInfo"),
  },
  {
    label: "Reassign",
    id: "reassign",
    statusId: 0,
    fwdType: 2,
    actionType: "REASSIGN",
    isPasswordNeeded: false,
    successText: "Reassigned Successfully",
    module: "hr",
    image: Images.reassign,
    textColor: Colors.colorReassign,
    eventSuffix: "_rea",
    imageDisable: Images.reassignGrey,
    isFwd: 0,
    showApproverSection: true,
    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: false,
    buttonText: "Reassign",
  },
  {
    label: localize("hrRequest.actionButton.reject"),
    id: "reject",
    statusId: 3,
    fwdType: 0,
    actionType: "REJECT",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.rejectSuccessMsg"),
    module: "hr",
    image: Images.reject,
    darkImage: Images.rejectIconWhite,
    textColor: Colors.colorReject,
    eventSuffix: "_rej",
    imageDisable: Images.rejectGrey,
    isFwd: 0,
    showApproverSection: false,
    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.reject"),
  },
  {
    label: localize("hrRequest.actionButton.approve"),
    id: "approve",
    statusId: 2,
    fwdType: 0,
    actionType: "APPROVE",
    isPasswordNeeded: false,
    successText: localize("hrRequest.actionButton.arroveSuccessMsg"),
    module: "hr",
    image: Images.approve,
    darkImage: Images.approveIconWhite,
    textColor: Colors.colorApprove,
    eventSuffix: "_apr",
    imageDisable: Images.approveGrey,
    isFwd: 0,
    showApproverSection: false,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: false,
    buttonText: localize("hrRequest.actionButton.approve"),
  },
];

export const RFI_ACTION_TYPE_FUSION = [
  {
    label: localize("hrRequest.actionButton.submitResponse"),
    id: "rfi_submit",
    statusId: 0,
    fwdType: 0,
    isPasswordNeeded: false,
    actionType: "INFO_SUBMIT",
    successText: localize("hrRequest.actionButton.submitSuccessMsg"),
    module: "hr",
    image: Images.approve,
    darkImage: Images.approveIconWhite,
    textColor: Colors.coolGrey,
    eventSuffix: "_rfi",
    imageDisable: Images.approve,
    isFwd: 1,
    showApproverSection: false,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: true,
    buttonText: localize("hrRequest.actionButton.reply"),
  },
];

export const ACTION_TYPE_YARDI = [
  {
    label: localize("hrRequest.actionButton.takeAction"),
    id: "yardi_action",
    statusId: 0,
    fwdType: 0,
    isPasswordNeeded: false,
    actionType: "",
    successText: localize("hrRequest.actionButton.successfully"),
    module: "yardi",
    image: Images.approve,
    darkImage: Images.approveIconWhite,
    textColor: Colors.coolGrey,
    eventSuffix: "yadi",
    imageDisable: Images.approve,
    isFwd: 1,
    showApproverSection: false,

    approverSectionText: localize("hrRequest.actionButton.changeApprover"),
    isCommentRequired: false,
    buttonText: localize("common.submit"),
  },
];

export const checkFusionActionsApproval = () => {
  return {
    module: "hr",
    approvalActions: ACTION_TYPE_FUSION,
    rfiAction: RFI_ACTION_TYPE_FUSION,
  };
};

export const getTaskCountByModule = (module, taskCountData) => {
  let total = 0;
  if (taskCountData?.data?.length > 0) {
    taskCountData?.data?.forEach((item) => {
      if (item?.module === module) {
        total += item.count;
      }
    });
  }
  return total;
};
