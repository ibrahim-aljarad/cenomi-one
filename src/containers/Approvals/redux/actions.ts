import { createRoutine } from 'redux-saga-routines';

import {
  APPROVAL_ACTION_DONE,
  GET_APPROVAL_PENDINGTASKS,
  GET_APPROVAL_TASKS_COUNT,
  GET_APPROVAL_TASKS_DETAILS,
  GET_LEASING_PENDINGTASKS,
  GET_LEASING_TASKS_DETAILS,
  GET_USER_SEARCH_LIST,
  PUT_APPROVAL_ACTION,
  PUT_LEASING_TAKE_ACTION,
  GET_PROCUREMENT_PENDINGTASK,
  GET_PROCUREMENT_TASK_DETAILS,
  PUT_PROCUREMENT_ACTION,
  GET_WORKFLOW_PENDINGTASKS,
  GET_WORKFLOW_TASKS_DETAILS
} from './constants';

export const getApprovalPendingTasks = createRoutine(GET_APPROVAL_PENDINGTASKS);
export const getApprovalTasksDetails = createRoutine(GET_APPROVAL_TASKS_DETAILS);

export const getApprovalTasksCount = createRoutine(GET_APPROVAL_TASKS_COUNT);

export const DoApprovalActionDone = createRoutine(APPROVAL_ACTION_DONE);
export const doApprovalAction = createRoutine(PUT_APPROVAL_ACTION);

export const getLeasingPendingTasks = createRoutine(GET_LEASING_PENDINGTASKS);
export const getWorkflowPendingTasks = createRoutine(GET_WORKFLOW_PENDINGTASKS);
export const getWorkflowTasksDetails = createRoutine(GET_WORKFLOW_TASKS_DETAILS);
export const getLeasingTasksDetails = createRoutine(GET_LEASING_TASKS_DETAILS);
export const doLeasingTakeAction = createRoutine(PUT_LEASING_TAKE_ACTION);

export const getUserSearchList = createRoutine(GET_USER_SEARCH_LIST);

export const getProcurementPendingTask = createRoutine(GET_PROCUREMENT_PENDINGTASK);
export const getProcurementTaskDetails = createRoutine(GET_PROCUREMENT_TASK_DETAILS);
export const doProucurementAction = createRoutine(PUT_PROCUREMENT_ACTION);
