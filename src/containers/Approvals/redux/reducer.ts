import produce from 'immer';

import {
  doApprovalAction,
  DoApprovalActionDone,
  doLeasingTakeAction,
  doProucurementAction,
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
  getWorkflowUserList
} from './actions';

export const initialState = {
  approvalPendingTasksData: undefined,
  approvalTasksDetailsData: [],
  approvalTasksAttachmentData: [],

  approvalActionData: [],
  userSearchListData: [],
  workflowUserListData: [],
  approvalTasksCountData: [],
  approvalTasksCountDataLoading: false
};

export default (state = initialState, action: { type: any; payload: { type: any } }) =>
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
        draft.approvalPendingTasksData = [];
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
      
      default: {
        break;
      }
    }
  });
