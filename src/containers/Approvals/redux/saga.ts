import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { api, appianApi } from "../../../utils/axios";

import {
  doApprovalAction,
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

import { alertBox } from "../../../utils/helpers";
import { DEVICE_TIMEZONE } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const qs = require("qs");

const APPROVAL_PENDINGTASKS_URL = "process/hr-approval/pending-tasks";
const APPROVAL_TASKS_DETAILS_URL = "process/hr-approval/tasks-details/";
const FUSION_TAKE_ACTION_URL = "process/hr-approval/take-action/";

const APPROVAL_TASK_COUNT = "process/tasks-count";
const USER_SEARCH_URL = "user/search";
const USER_URL = "users";

const LEASING_PENDING_TASK_URL = "process/leasing/pending-tasks";
const LEASING_TASKS_DETAILS_URL = "process/leasing/tasks-details";
const LEASING_TAKE_ACTION_URL = "process/leasing/take-action";

const PROCUREMENT_PENDING_TASK_URL = "process/procurement/pending-tasks";
const PROCUREMENT_TASK_DETAILS_URL = "process/procurement/tasks-details/";
const PROCUREMENT_TAKE_ACTION_URL = "process/procurement/take-action/";

const WORKFLOW_PENDING_TASK_URL = "pendingTasks?loggedInUser=veena.sodha.ext%40cenomi.com&ss=";
const WORKFLOW_TASK_DETAIL_URL = "requestData";
const WORKFLOW_TAKE_ACTION_URL = "updateRequestStatus";

const getUserListApiCall = (data) =>
  api({
    method: "GET",
    url:
      `${USER_SEARCH_URL}` +
      "?" +
      qs.stringify(data, { arrayFormat: "repeat", encode: false }),
  });

const getWorkflowUserListApiCall = () =>
  appianApi({
    method: "GET",
    url: `${USER_URL}`,
  });

const getApprovalTasksCountApiCall = () =>
  api({
    method: "GET",
    url: `${APPROVAL_TASK_COUNT}`,
  });

const getApprovalPendingTasksApiCall = () =>
  api({
    method: "GET",
    url: `${APPROVAL_PENDINGTASKS_URL}`,
  });

const getApprovalTasksDetailsApiCall = (taskId) =>
  api({
    method: "GET",
    url: `${APPROVAL_TASKS_DETAILS_URL}${taskId}?tz=${DEVICE_TIMEZONE}`,
  });

const approvalActionApiCall = (taskId, data) =>
  api({
    method: "PUT",
    url: `${FUSION_TAKE_ACTION_URL}${taskId}`,
    data,
  });

const getLeasingPendingTasksApiCall = () =>
  api({
    method: "GET",
    url: `${LEASING_PENDING_TASK_URL}`,
  });

const getLeasingTasksDetailsApiCall = (data) =>
  api({
    method: "POST",
    url: `${LEASING_TASKS_DETAILS_URL}`,
    data,
  });

const leasingTakeActionApiCall = (data) =>
  api({
    method: "PUT",
    url: `${LEASING_TAKE_ACTION_URL}`,
    data,
  });

const getProcurementPendingTasksApiCall = () =>
  api({
    method: "GET",
    url: `${PROCUREMENT_PENDING_TASK_URL}`,
  });
const getProcurementTasksDetailsApiCall = (taskId) =>
  api({
    method: "GET",
    url: `${PROCUREMENT_TASK_DETAILS_URL}${taskId}?tz=${DEVICE_TIMEZONE}`,
  });

const procurementTakeActionApiCall = (taskId, data) =>
  api({
    method: "PUT",
    url: `${PROCUREMENT_TAKE_ACTION_URL}${taskId}`,
    data,
  });

const getWorkflowPendingTasksApiCall = (loggedInUser) =>
  appianApi({
    method: "POST",
    url: `${WORKFLOW_PENDING_TASK_URL}${loggedInUser}`,
  });

const getWorkflowTaskDetailApiCall = (taskId) =>
  appianApi({
    method: "GET",
    url: `${WORKFLOW_TASK_DETAIL_URL}?requestIdPk=${taskId}`,
  });

const workflowTakeActionApiCall = (data) =>
  appianApi({
    method: "POST",
    url: `${WORKFLOW_TAKE_ACTION_URL}?${qs.stringify(data, {
      arrayFormat: "repeat",
      encode: false,
    })}`,
  });

function* getApprovalTasksDetailsRequest(action: { payload: { taskId: any } }) {
  try {
    yield put(getApprovalTasksDetails.request({ isLoading: true }));

    const { taskId } = action.payload;

    const response = yield call(getApprovalTasksDetailsApiCall, taskId);

    if (response.success) {
      const { data } = response;
      yield put(getApprovalTasksDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getApprovalTasksDetails.fulfill({ isLoading: false }));
  }
}
function* getApprovalPendingTasksRequest() {
  try {
    yield put(getApprovalPendingTasks.request({ isLoading: false }));
    const response = yield call(getApprovalPendingTasksApiCall);
    console.log("getApprovalPendingTasks", response);

    if (response.success) {
      const { data } = response;
      yield put(getApprovalPendingTasks.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getApprovalPendingTasks.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getApprovalPendingTasks.failure({}));
  } finally {
    yield put(getApprovalPendingTasks.fulfill({ isLoading: false }));
  }
}
function* getApprovalTasksCountRequest() {
  try {
    // change for skeleton loader
    yield put(getApprovalTasksCount.request({ isLoading: false }));
    const response = yield call(getApprovalTasksCountApiCall);

    if (response.success) {
      const { data } = response;
      yield put(getApprovalTasksCount.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getApprovalTasksCount.fulfill({ isLoading: false }));
  }
}

function* approvalActionRequest(taskAction: {
  payload: { taskId: any; comments: any; assignTo: any; action: any };
}) {
  try {
    const { taskId, comments, assignTo, action } = taskAction.payload;

    const data = {
      comments,
      assignTo,
      action,
    };

    yield put(doApprovalAction.request({ isLoading: true }));

    const response = yield call(approvalActionApiCall, taskId, data);

    if (response.success) {
      const { data } = response;
      yield put(doApprovalAction.success({ data }));
    } else {
      if (response?.data?.httpStatus === "400") {
        alertBox(response?.data?.title, response?.data?.detail);
      } else {
        yield put(setGlobalError.success());
      }
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doApprovalAction.fulfill({ isLoading: false }));
  }
}

function* getUserSearchListRequest(action: {
  payload: { name: any; autoComplete: any };
}) {
  try {
    const data = action.payload;
    yield put(getUserSearchList.request({ isLoading: true }));

    const response = yield call(getUserListApiCall, data);

    if (response.success) {
      const { data } = response;
      yield put(getUserSearchList.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getUserSearchList.fulfill({ isLoading: false }));
  }
}

function* getWorkflowUserListRequest() {
  try {
    yield put(getWorkflowUserList.request({ isLoading: true }));

    const response = yield call(getWorkflowUserListApiCall);

    if (response.success) {
      const { data } = response;
      yield put(getWorkflowUserList.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getWorkflowUserList.fulfill({ isLoading: false }));
  }
}

function* getLeasingPendingTasksRequest() {
  try {
    yield put(getLeasingPendingTasks.request({ isLoading: false }));
    const response = yield call(getLeasingPendingTasksApiCall);

    if (response.success) {
      const { data } = response;
      yield put(getLeasingPendingTasks.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getLeasingPendingTasks.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getLeasingPendingTasks.failure({}));
  } finally {
    yield put(getLeasingPendingTasks.fulfill({ isLoading: false }));
  }
}

function* getLeasingTasksDetailsRequest(action: { payload: { taskId: any } }) {
  try {
    yield put(getLeasingTasksDetails.request({ isLoading: true }));

    const { data } = action.payload;

    const response = yield call(getLeasingTasksDetailsApiCall, data);

    if (response.success) {
      const { data } = response;
      yield put(getLeasingTasksDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getLeasingTasksDetails.fulfill({ isLoading: false }));
  }
}

function* getWorkflowPendingTasksRequest(action: {
  payload: { loggedInUser: any };
}) {
  try {
    yield put(getWorkflowPendingTasks.request({ isLoading: false }));

    const { loggedInUser } = action?.payload;
    const response = yield call(getWorkflowPendingTasksApiCall, loggedInUser);

    if (response.success) {
      const { data } = response;
      yield put(getWorkflowPendingTasks.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getWorkflowPendingTasks.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getWorkflowPendingTasks.failure({}));
  } finally {
    yield put(getWorkflowPendingTasks.fulfill({ isLoading: false }));
  }
}

function* getWorkflowTaskDetailRequest(action: { payload: { taskId: any } }) {
  try {
    yield put(getWorkflowTasksDetails.request({ isLoading: false }));
    const { taskId } = action?.payload;
    const response = yield call(getWorkflowTaskDetailApiCall, taskId);

    if (response.success) {
      const { data } = response;
      yield put(getWorkflowTasksDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getWorkflowTasksDetails.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getWorkflowPendingTasks.failure({}));
  } finally {
    yield put(getWorkflowPendingTasks.fulfill({ isLoading: false }));
  }
}

function* workflowTakeActionRequest(action: {
  payload: {
    type: any;
    workflowName: any;
    propertyName: any;
    recordId: any;
    recordCode: any;
    stepName: any;
    nextStepName: any;
    comments: any;
  };
}) {
  try {
    yield put(doWorkflowTakeAction.request({ isLoading: true }));
    const response = yield call(workflowTakeActionApiCall, action.payload);

    if (response.success) {
      const { data } = response;
      yield put(doWorkflowTakeAction.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doWorkflowTakeAction.fulfill({ isLoading: false }));
  }
}

function* leasingTakeActionRequest(action: {
  payload: {
    type: any;
    workflowName: any;
    propertyName: any;
    recordId: any;
    recordCode: any;
    stepName: any;
    nextStepName: any;
    comments: any;
  };
}) {
  try {
    yield put(doLeasingTakeAction.request({ isLoading: true }));
    const response = yield call(leasingTakeActionApiCall, action.payload);

    if (response.success) {
      const { data } = response;
      yield put(doLeasingTakeAction.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doLeasingTakeAction.fulfill({ isLoading: false }));
  }
}

function* getProcurementPendingTaskRequest() {
  try {
    yield put(getProcurementPendingTask.request({ isLoading: false }));
    const response = yield call(getProcurementPendingTasksApiCall);

    if (response.success) {
      const { data } = response;
      yield put(getProcurementPendingTask.success({ data }));
    } else {
      yield put(setGlobalError.success());
      yield put(getProcurementPendingTask.failure({}));
    }
  } catch (error) {
    yield put(setGlobalError.success());
    yield put(getProcurementPendingTask.failure({}));
  } finally {
    yield put(getProcurementPendingTask.fulfill({ isLoading: false }));
  }
}
function* getProcurementTaskDetailsRequest(action: any) {
  try {
    yield put(getProcurementTaskDetails.request({ isLoading: true }));

    const { taskId } = action?.payload || {};

    const response = yield call(getProcurementTasksDetailsApiCall, taskId);

    if (response.success) {
      const { data } = response;
      yield put(getProcurementTaskDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getProcurementTaskDetails.fulfill({ isLoading: false }));
  }
}

function* procurementTakeActionRequest(action: any) {
  try {
    yield put(doProucurementAction.request({ isLoading: true }));
    const { taskId, data } = action?.payload || {};
    const response = yield call(procurementTakeActionApiCall, taskId, data);

    if (response.success) {
      const { data } = response;
      yield put(doProucurementAction.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(doProucurementAction.fulfill({ isLoading: false }));
  }
}

export default function* approvalsSaga() {
  yield takeLatest(
    getApprovalPendingTasks.TRIGGER,
    getApprovalPendingTasksRequest
  );
  yield takeLatest(
    getApprovalTasksDetails.TRIGGER,
    getApprovalTasksDetailsRequest
  );

  yield takeLatest(getUserSearchList.TRIGGER, getUserSearchListRequest);
  yield takeLatest(getApprovalTasksCount.TRIGGER, getApprovalTasksCountRequest);
  yield takeLatest(doApprovalAction.TRIGGER, approvalActionRequest);

  yield takeLatest(getWorkflowUserList.TRIGGER, getWorkflowUserListRequest);

  yield takeLatest(
    getLeasingPendingTasks.TRIGGER,
    getLeasingPendingTasksRequest
  );
  yield takeLatest(
    getLeasingTasksDetails.TRIGGER,
    getLeasingTasksDetailsRequest
  );

  yield takeLatest(doLeasingTakeAction.TRIGGER, leasingTakeActionRequest);

  yield takeLatest(
    getProcurementPendingTask.TRIGGER,
    getProcurementPendingTaskRequest
  );
  yield takeLatest(
    getProcurementTaskDetails.TRIGGER,
    getProcurementTaskDetailsRequest
  );
  yield takeLatest(doProucurementAction.TRIGGER, procurementTakeActionRequest);
  yield takeLatest(
    getWorkflowPendingTasks.TRIGGER,
    getWorkflowPendingTasksRequest
  );
  yield takeLatest(
    getWorkflowTasksDetails.TRIGGER,
    getWorkflowTaskDetailRequest
  );
  yield takeLatest(doWorkflowTakeAction.TRIGGER, workflowTakeActionRequest);
}
