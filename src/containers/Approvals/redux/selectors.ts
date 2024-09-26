import { createSelector } from 'reselect';
import { initialState } from './reducer';
import REDUCER_KEY from '../../../store/reducerKeys';

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.APPROVALS_REDUCER] || initialState;

const getApprovalPendingTasksSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.approvalPendingTasksData;
});

const getApprovalTasksDetailsSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.approvalTasksDetailsData;
});

const getApprovalActionDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.approvalActionData;
});
const getUserSearchListSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.userSearchListData;
});
const getWorkflowUserListSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.workflowUserListData;
});
const getApprovalTasksCountSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.approvalTasksCountData;
});
const getApprovalTasksCountLoadingSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.approvalTasksCountDataLoading;
});

export {
  getApprovalPendingTasksSelector,
  getApprovalTasksDetailsSelector,
  getApprovalActionDataSelector,
  getUserSearchListSelector,
  getApprovalTasksCountSelector,
  getApprovalTasksCountLoadingSelector,
  getWorkflowUserListSelector,
};
