import { createSelector } from "reselect";
import { initialState } from "./reducer";
import REDUCER_KEY from "../../../store/reducerKeys";

const selectGlobalSubStore = (store: { [x: string]: any }) =>
  store[REDUCER_KEY.HOME_REDUCER] || initialState;

const getCorporateCommunicationSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.corporateCommunicationData;
  }
);

const getCorporateCommunicationDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.corporateCommunicationDetails;
  }
);

const getApprovalFeatureModulesSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.approvalFeatureModulesData;
  }
);

const getOfferCategoriesSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.offerCategoriesData;
  }
);
const getOffersSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.offersData;
  }
);

const getOffersDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.offersDetails;
  }
);

const getServiceRequestSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.serviceRequestData;
  }
);

const getUsefulAppsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.usefullAppsData;
  }
);

const getknowledgeHubCategoriesSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.knowledgeHubCategoriesData;
  }
);

const getFeatureModuleDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.featureModuleData;
  }
);

const getQoutesSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.qouteList;
  }
);

const getSurveySelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.surveyList;
  }
);

const getEventsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.eventsList;
  }
);

const getEventsDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.eventsDetails;
  }
);

const getDocumentsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.documentsList;
  }
);

const getDocumentsDetailsSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.documentsDetails;
  }
);

const getAcknowledgeDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.acknowledgeData;
  }
);

const getCancelledAcknowledgeDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.cancelledAcknowledgeData;
  }
);

const getOrganizationStructureDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.organizationStructureData;
  }
);

const getPendingAcknowledgementDataSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.pendingAcknowledgementData;
  }
);

const getUnreadNotificationCountSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => {
    return globalState.unreadNotificationCount;
  }
);

const getServiceRequestListSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.serviceRequestList
);

const getMeterReadingListSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.meterServiceRequestList
);

const getMeterReadingListErrorSelector = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.meterServiceRequestError
);

export {
  getCorporateCommunicationSelector,
  getCorporateCommunicationDetailsSelector,
  getApprovalFeatureModulesSelector,
  getOfferCategoriesSelector,
  getOffersSelector,
  getOffersDetailsSelector,
  getServiceRequestSelector,
  getUsefulAppsSelector,
  getknowledgeHubCategoriesSelector,
  getFeatureModuleDataSelector,
  getQoutesSelector,
  getSurveySelector,
  getEventsSelector,
  getEventsDetailsSelector,
  getDocumentsSelector,
  getDocumentsDetailsSelector,
  getAcknowledgeDataSelector,
  getCancelledAcknowledgeDataSelector,
  getOrganizationStructureDataSelector,
  getPendingAcknowledgementDataSelector,
  getUnreadNotificationCountSelector,
  getServiceRequestListSelector,
  getMeterReadingListSelector,
  getMeterReadingListErrorSelector,
};
