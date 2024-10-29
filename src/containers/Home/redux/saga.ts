import { call, put, takeLatest } from "redux-saga/effects";
import { setGlobalError } from "../../../appContainer/redux/actions";
import { api, tenantCentralApi } from "../../../utils/axios";

import { setCookie, storeData, urlSlugify } from "../../../utils/helpers";
import {
  cancelAcknowledge,
  getApprovalFeatureModules,
  getCorporateCommunication,
  getCorporateCommunicationDetails,
  getDiscrepancyList,
  getDocuments,
  getDocumentsDetail,
  getEvents,
  getEventsDetails,
  getOfferCategories,
  getOffers,
  getOffersDetails,
  getPendingAcknowledgement,
  getQoutes,
  getSurvey,
  getTenantLogin,
  getUsefulApps,
  getknowledgeHubCategories,
  organizationStructure,
  submitAcknowledge,
} from "./actions";
import { LOCAL_STORAGE_DATA_KEY } from "../../../utils/constants";
import Config from "../../../utils/config";

const CORPORATE_COMMUNICATION_URL = "cms/corporate-communication";

const GET_APPROVAL_FEATURE_MODULES_URL = "organization/feature-modules";
const USEFUL_APPPS_URL = "cms/useful-apps";
const KNOWLEDGE_HUB_CATEGORIES_URL = "cms/knowledge-hub-topics";
const OFFER_CATEGORIES_URL = "cms/offer-categories";
const OFFERS_URL = "cms/offers";

const QOUTES_URL = "cms/daily-quote";
const SURVEY_URL = "cms/surveys";
const EVENTS_URL = "cms/events";
const DOCUMENTS_URL = "cms/documents";
const CREATE_ACKNOWLEDGE_URL = "acknowledgement/create";
const ACKNOWLEDGE_URL = "acknowledgement";
const ORGANIZATION_STRUCTURE_URL = "user/organization-structure";
const PENDING_ACKNOWLEDGEMENT_URL = "acknowledgement/pending-items";
const LOGIN_END = "tp/tenant-platform/login";
const SERVICE_REQUEST_URL = "service-requests";

const getCorporateCommunicationRequestApiCall = () =>
  api({
    method: "GET",
    url: `${CORPORATE_COMMUNICATION_URL}`,
  });
const getCorporateCommunicationDetailsApiCall = (id: any) =>
  api({
    method: "GET",
    url: `${CORPORATE_COMMUNICATION_URL}/${id}`,
  });

const getApprovalFeatureModulesRequestApiCall = () =>
  api({
    method: "GET",
    url: `${GET_APPROVAL_FEATURE_MODULES_URL}`,
  });

const getOfferCategoriesRequestApiCall = (org_name) =>
  api({
    method: "GET",
    url: `${OFFER_CATEGORIES_URL}?org=${org_name}`,
  });

const getOffersRequestApiCall = () =>
  api({
    method: "GET",
    url: `${OFFERS_URL}`,
  });

const getOffersDetailsApiCall = (id: any) =>
  api({
    method: "GET",
    url: `${OFFERS_URL}/${id}`,
  });

const getUsefulAppsRequestApiCall = () =>
  api({
    method: "GET",
    url: `${USEFUL_APPPS_URL}`,
  });

const getknowledgeHubCategoriesRequestApiCall = () =>
  api({
    method: "GET",
    url: `${KNOWLEDGE_HUB_CATEGORIES_URL}`,
  });

const getQoutesApiCall = () =>
  api({
    method: "GET",
    url: `${QOUTES_URL}`,
  });

const getSurveyApiCall = () =>
  api({
    method: "GET",
    url: `${SURVEY_URL}`,
  });

const getEventsApiCall = () =>
  api({
    method: "GET",
    url: `${EVENTS_URL}`,
  });

const getEventsDetailsApiCall = (id: string) =>
  api({
    method: "GET",
    url: `${EVENTS_URL}/${id}`,
  });

const getDocumentsApiCall = () =>
  api({
    method: "GET",
    url: `${DOCUMENTS_URL}`,
  });

const getDocumentsDetailApiCall = (id: string) =>
  api({
    method: "GET",
    url: `${DOCUMENTS_URL}/${id}`,
  });

const submitAcknowledgeApiCall = (data: any) =>
  api({
    method: "POST",
    url: `${CREATE_ACKNOWLEDGE_URL}`,
    data,
  });

const cancelAcknowledgeApiCall = (id: any) =>
  api({
    method: "DELETE",
    url: `${ACKNOWLEDGE_URL}/${id}`,
  });

const organizationStructureApiCall = (id: any) =>
  api({
    method: "GET",
    url: `${ORGANIZATION_STRUCTURE_URL}?userId=${id}`,
  });

const getPendingAcknowledgementApiCall = () =>
  api({
    method: "GET",
    url: `${PENDING_ACKNOWLEDGEMENT_URL}`,
  });

const getTenantLoginApiCall = (data: any) =>
  api({
    method: "POST",
    url: `${LOGIN_END}`,
    data,
  });

const getDiscrepancyListApiCall = (data: any) =>
  tenantCentralApi({
    method: "GET",
    url: `${SERVICE_REQUEST_URL}?service_category=OPERATIONS&sub_category=DISCREPANCY&page=${data?.page}&limit=${data?.limit}`,
  });

function* getCorporateCommunicationRequest(action: any) {
  try {
    // change for skeleton loader
    yield put(getCorporateCommunication.request({ isLoading: false }));
    const response = yield call(getCorporateCommunicationRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getCorporateCommunication.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getCorporateCommunication.fulfill({ isLoading: false }));
  }
}

function* getCorporateCommunicationDetailsRequest(action: any) {
  try {
    yield put(getCorporateCommunicationDetails.request({ isLoading: true }));
    const { id } = action?.payload || {};
    const response = yield call(getCorporateCommunicationDetailsApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(getCorporateCommunicationDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getCorporateCommunicationDetails.fulfill({ isLoading: false }));
  }
}

function* getApprovalFeatureModulesRequest(action: any) {
  try {
    // change for skeleton loader
    yield put(getApprovalFeatureModules.request({ isLoading: false }));
    const response = yield call(getApprovalFeatureModulesRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getApprovalFeatureModules.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getApprovalFeatureModules.fulfill({ isLoading: false }));
  }
}

function* getOfferCategoriesRequest(action: any) {
  try {
    const { payload } = action;

    // change for skeleton loader
    yield put(getOfferCategories.request({ isLoading: false }));

    const response = yield call(
      getOfferCategoriesRequestApiCall,
      urlSlugify(payload?.organization?.name)
    );

    if (response.success) {
      const { data } = response;
      yield put(getOfferCategories.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getOfferCategories.fulfill({ isLoading: false }));
  }
}

function* getOffersRequest(action: any) {
  try {
    yield put(getOffers.request({ isLoading: false }));
    const response = yield call(getOffersRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getOffers.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getOffers.fulfill({ isLoading: false }));
  }
}

function* getOffersDetailsRequest(action: any) {
  try {
    yield put(getOffersDetails.request({ isLoading: true }));
    const { id } = action?.payload || {};
    const response = yield call(getOffersDetailsApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(getOffersDetails.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getOffersDetails.fulfill({ isLoading: false }));
  }
}

function* getUsefulAppsRequest(action: any) {
  try {
    // change for skeleton loader
    yield put(getUsefulApps.request({ isLoading: false }));
    const response = yield call(getUsefulAppsRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getUsefulApps.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getUsefulApps.fulfill({ isLoading: false }));
  }
}

function* getknowledgeHubCategoriesRequest(action: any) {
  try {
    // change for skeleton loader
    yield put(getknowledgeHubCategories.request({ isLoading: false }));
    const response = yield call(getknowledgeHubCategoriesRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getknowledgeHubCategories.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getknowledgeHubCategories.fulfill({ isLoading: false }));
  }
}

function* getQoutesRequest() {
  try {
    yield put(getQoutes.request({ isLoading: true }));
    const response = yield call(getQoutesApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getQoutes.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getQoutes.fulfill({ isLoading: false }));
  }
}

function* getSurveyRequest() {
  try {
    yield put(getSurvey.request({ isLoading: false }));
    const response = yield call(getSurveyApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getSurvey.success({ data }));
    } else {
      yield put(getSurvey.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getSurvey.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getSurvey.fulfill({ isLoading: false }));
  }
}

function* getEventsRequest() {
  try {
    yield put(getEvents.request({ isLoading: false }));
    const response = yield call(getEventsApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getEvents.success({ data }));
    } else {
      yield put(getEvents.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getEvents.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getEvents.fulfill({ isLoading: false }));
  }
}

function* getEventsDetailsRequest(action: any) {
  try {
    yield put(getEventsDetails.request({ isLoading: false }));
    const { id } = action?.payload || {};
    const response = yield call(getEventsDetailsApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(getEventsDetails.success({ data }));
    } else {
      yield put(getEventsDetails.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getEventsDetails.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getEventsDetails.fulfill({ isLoading: false }));
  }
}

function* getDocumentsRequest() {
  try {
    yield put(getDocuments.request({ isLoading: false }));
    const response = yield call(getDocumentsApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getDocuments.success({ data }));
    } else {
      yield put(getDocuments.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getDocuments.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getDocuments.fulfill({ isLoading: false }));
  }
}

function* getDocumentsDetailRequest(action: any) {
  try {
    yield put(getDocumentsDetail.request({ isAPIExecuting: true }));
    const { id } = action?.payload || {};
    const response = yield call(getDocumentsDetailApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(getDocumentsDetail.success({ data }));
    } else {
      yield put(getDocumentsDetail.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getDocumentsDetail.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getDocumentsDetail.fulfill({ isAPIExecuting: false }));
  }
}

function* submitAcknowledgeRequest(action: any) {
  try {
    yield put(submitAcknowledge.request({ isLoading: true }));
    const { data } = action?.payload || {};
    const response = yield call(submitAcknowledgeApiCall, data);
    if (response.success) {
      const { data } = response;
      yield put(submitAcknowledge.success({ data }));
    } else {
      yield put(submitAcknowledge.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(submitAcknowledge.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(submitAcknowledge.fulfill({ isLoading: false }));
  }
}

function* cancelAcknowledgeRequest(action: any) {
  try {
    yield put(cancelAcknowledge.request({ isLoading: true }));
    const { id } = action?.payload || {};
    const response = yield call(cancelAcknowledgeApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(cancelAcknowledge.success({ data }));
    } else {
      yield put(cancelAcknowledge.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(cancelAcknowledge.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(cancelAcknowledge.fulfill({ isLoading: false }));
  }
}

function* organizationStructureRequest(action: any) {
  try {
    yield put(organizationStructure.request({ isLoading: false }));
    const { id } = action?.payload || {};
    const response = yield call(organizationStructureApiCall, id);
    if (response.success) {
      const { data } = response;
      yield put(organizationStructure.success({ data }));
    } else {
      yield put(organizationStructure.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(organizationStructure.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(organizationStructure.fulfill({ isLoading: false }));
  }
}

function* getPendingAcknowledgementRequest(action: any) {
  try {
    yield put(getPendingAcknowledgement.request({ isLoading: true }));
    const response = yield call(getPendingAcknowledgementApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getPendingAcknowledgement.success({ data }));
    } else {
      yield put(getPendingAcknowledgement.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getPendingAcknowledgement.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getPendingAcknowledgement.fulfill({ isLoading: false }));
  }
}
function* getTenantLoginRequest(action: any) {
  try {
    yield put(getTenantLogin.request({ isLoading: true }));
    const { email } = action?.payload || {};
    const response = yield call(getTenantLoginApiCall, { email });
    if (response.success) {
      const { data } = response;
      if (data?.data?.access_token) {
        setCookie(
          Config.TENANT_CENTRAL_URL||'',
          'access_token',
          data?.data?.access_token
        );
      }
      yield put(getTenantLogin.success({ data }));
    } else {
      yield put(getTenantLogin.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getTenantLogin.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getTenantLogin.fulfill({ isLoading: false }));
  }
}

function* getDiscrepancyListRequest(action: any) {
  try {
    yield put(getDiscrepancyList.request({ isLoading: true }));
    const { page, limit } = action?.payload || {};
    const response = yield call(getDiscrepancyListApiCall, { page, limit });
    if (response.success) {
      const { data } = response;
      yield put(getDiscrepancyList.success({ data: data?.data }));
    } else {
      yield put(getDiscrepancyList.failure());
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(getTenantLogin.failure());
    yield put(setGlobalError.success());
  } finally {
    yield put(getTenantLogin.fulfill({ isLoading: false }));
  }
}

export default function* homeSaga() {
  yield takeLatest(
    getCorporateCommunication.TRIGGER,
    getCorporateCommunicationRequest
  );
  yield takeLatest(
    getCorporateCommunicationDetails.TRIGGER,
    getCorporateCommunicationDetailsRequest
  );
  yield takeLatest(
    getApprovalFeatureModules.TRIGGER,
    getApprovalFeatureModulesRequest
  );
  yield takeLatest(getOfferCategories.TRIGGER, getOfferCategoriesRequest);
  yield takeLatest(getUsefulApps.TRIGGER, getUsefulAppsRequest);
  yield takeLatest(
    getknowledgeHubCategories.TRIGGER,
    getknowledgeHubCategoriesRequest
  );
  yield takeLatest(getOffers.TRIGGER, getOffersRequest);
  yield takeLatest(getOffersDetails.TRIGGER, getOffersDetailsRequest);
  yield takeLatest(getQoutes.TRIGGER, getQoutesRequest);
  yield takeLatest(getSurvey.TRIGGER, getSurveyRequest);
  yield takeLatest(getEvents.TRIGGER, getEventsRequest);
  yield takeLatest(getEventsDetails.TRIGGER, getEventsDetailsRequest);
  yield takeLatest(getDocuments.TRIGGER, getDocumentsRequest);
  yield takeLatest(getDocumentsDetail.TRIGGER, getDocumentsDetailRequest);
  yield takeLatest(submitAcknowledge.TRIGGER, submitAcknowledgeRequest);
  yield takeLatest(cancelAcknowledge.TRIGGER, cancelAcknowledgeRequest);
  yield takeLatest(organizationStructure.TRIGGER, organizationStructureRequest);
  yield takeLatest(
    getPendingAcknowledgement.TRIGGER,
    getPendingAcknowledgementRequest
  );
  yield takeLatest(getTenantLogin.TRIGGER, getTenantLoginRequest);
  yield takeLatest(getDiscrepancyList.TRIGGER, getDiscrepancyListRequest);
}
