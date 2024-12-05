import produce from "immer";

import {
  doApprovalAction,
  DoApprovalActionDone,
  doLeasingTakeAction,
  doProucurementAction,
  doWorkflowTakeAction,
  getApprovalPendingTasks,
  getApprovalTasksCount,
  getApprovalTasksDetails,
  getLeasingPendingTasks,
  getLeasingTasksDetails,
  getProcurementPendingTask,
  getProcurementTaskDetails,
  getUserSearchList,
  getWorkflowPendingTasks,
  getWorkflowTasksDetails,
  getWorkflowUserList,
} from "./actions";

export const initialState = {
  approvalPendingTasksData: undefined,
  approvalTasksDetailsData: [],
  approvalTasksAttachmentData: [],

  approvalActionData: [],
  userSearchListData: [],
  workflowUserListData: [],
  approvalTasksCountData: [],
  approvalTasksCountDataLoading: false,
};

export default (
  state = initialState,
  action: { type: any; payload: { type: any } }
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getApprovalPendingTasks.TRIGGER: {
        draft.approvalPendingTasksData = undefined;
        break;
      }
      case getApprovalPendingTasks.SUCCESS: {
        draft.approvalPendingTasksData = action.payload?.data;
        break;
      }
      case getApprovalPendingTasks.FAILURE: {
        draft.approvalPendingTasksData = [];
        break;
      }

      case getApprovalTasksDetails.TRIGGER: {
        draft.approvalTasksDetailsData = [];
        break;
      }
      case getApprovalTasksDetails.SUCCESS: {
        draft.approvalTasksDetailsData = action.payload?.data;
        break;
      }

      case getUserSearchList.TRIGGER: {
        draft.userSearchListData = [];
        break;
      }
      case getUserSearchList.SUCCESS: {
        draft.userSearchListData = action.payload;
        break;
      }
      case getApprovalTasksCount.TRIGGER: {
        draft.approvalTasksCountData = [];
        draft.approvalTasksCountDataLoading = true;
        break;
      }
      case getApprovalTasksCount.SUCCESS: {
        draft.approvalTasksCountData = action.payload;
        break;
      }
      case getApprovalTasksCount.FULFILL: {
        draft.approvalTasksCountDataLoading = false;
        break;
      }

      case doApprovalAction.TRIGGER: {
        draft.approvalActionData = [];
        break;
      }
      case doApprovalAction.SUCCESS: {
        draft.approvalActionData = action.payload;
        break;
      }
      case DoApprovalActionDone.TRIGGER: {
        draft.approvalTasksAttachmentData = [];
        draft.approvalActionData = [];
        break;
      }

      case getLeasingPendingTasks.SUCCESS: {
        draft.approvalPendingTasksData = action.payload?.data;
        break;
      }
      case getLeasingPendingTasks.TRIGGER: {
        draft.approvalPendingTasksData = undefined;
        break;
      }
      case getLeasingPendingTasks.FAILURE: {
        draft.approvalPendingTasksData = [];
        break;
      }

      case getLeasingTasksDetails.SUCCESS: {
        draft.approvalTasksDetailsData = action.payload?.data;
        break;
      }
      case getLeasingTasksDetails.TRIGGER: {
        draft.approvalTasksDetailsData = [];

        break;
      }
      case doLeasingTakeAction.TRIGGER: {
        draft.approvalActionData = [];
        break;
      }
      case doLeasingTakeAction.SUCCESS: {
        draft.approvalActionData = action.payload;
        break;
      }

      case getProcurementPendingTask.SUCCESS: {
        draft.approvalPendingTasksData = action?.payload?.data || [];
        break;
      }
      case getProcurementPendingTask.TRIGGER: {
        draft.approvalPendingTasksData = undefined;
        break;
      }
      case getProcurementPendingTask.FAILURE: {
        draft.approvalPendingTasksData = [
          {
            href: "https://fa-etiv-test-saasfaprod1.fa.ocs.oraclecloud.com:443/bpm/api/4.0/tasks/1691727",
            length: 0,
            rel: "self",
            title: "Approve Purchase Order 0008912",
            approvalDuration: 0,
            assignedDate: "2024-11-14 12:10:27",
            assignees: {
              hasMore: false,
              items: [
                {
                  email: null,
                  firstName: null,
                  id: "app.tester",
                  identity: null,
                  lastName: null,
                  middleName: null,
                  mobile: null,
                  type: "user",
                  workPhone: null,
                },
              ],
            },
            category: "Purchasing",
            createdBy: "Shekar Sesham",
            createdDate: "2024-11-14 12:10:28",
            fromUserDisplayName: "Shekar Sesham",
            fromUserName: "shekar.sesham",
            identificationKey: "PO_145001_300001565959162_0",
            number: 1691727,
            ownerUser:
              "Applications Development Framework Application Identity for Procurement",
            priority: 3,
            state: "ASSIGNED",
            taskDefinitionName: "DocumentApproval",
            taskId: "1f6c1c5d-8186-4160-8c61-5f8cd15ec4db",
            taskNamespace:
              "http://xmlns.oracle.com/apps/prc/po/approval/PrcPoApprovalComposite/DocumentApproval",
            titlePrefix: "Action Required",
            updatedDate: "2024-11-14 12:10:28",
            notify: true,
            featureModule: "approvals_procurement",
            subModule: {
              name: "PO",
              externalId: "DocumentApproval",
            },
            date: "2024-11-14T12:10:28.000Z",
            externalId: "1691727",
          },
        ];
        break;
      }

      case getProcurementTaskDetails.TRIGGER: {
        draft.approvalTasksDetailsData = [];
        break;
      }
      case getProcurementTaskDetails.SUCCESS: {
        draft.approvalTasksDetailsData = action?.payload?.data || [];
        break;
      }

      case doProucurementAction.TRIGGER: {
        draft.approvalActionData = [];
        break;
      }
      case doProucurementAction.SUCCESS: {
        draft.approvalActionData = action.payload;
        break;
      }

      case getWorkflowPendingTasks.TRIGGER: {
        draft.approvalPendingTasksData = undefined;
        break;
      }
      case getWorkflowPendingTasks.SUCCESS: {
        draft.approvalPendingTasksData = action.payload?.data?.result;
        break;
      }
      case getWorkflowPendingTasks.FAILURE: {
        draft.approvalPendingTasksData = [];
        break;
      }

      case getWorkflowTasksDetails.TRIGGER: {
        draft.approvalTasksDetailsData = undefined;
        break;
      }
      case getWorkflowTasksDetails.SUCCESS: {
        draft.approvalTasksDetailsData = action.payload?.data?.result;
        break;
      }
      case getWorkflowTasksDetails.FAILURE: {
        draft.approvalTasksDetailsData = [];
        break;
      }

      case getWorkflowUserList.TRIGGER: {
        draft.workflowUserListData = undefined;
        break;
      }
      case getWorkflowUserList.SUCCESS: {
        draft.workflowUserListData = action.payload?.data?.result;
        break;
      }
      case getWorkflowUserList.FAILURE: {
        draft.workflowUserListData = [];
        break;
      }
      case doWorkflowTakeAction.TRIGGER: {
        draft.approvalActionData = [];
        break;
      }
      case doWorkflowTakeAction.SUCCESS: {
        draft.approvalActionData = action.payload;
        break;
      }

      default: {
        break;
      }
    }
  });
