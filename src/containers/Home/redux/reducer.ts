import produce from "immer";
import { isEmpty } from "lodash";
import { localize } from "../../../locale/utils";
import {
  APPROVALS,
  SERVICEREQUEST,
  SERVICEREQUEST_APPROVALS,
  SERVICEREQUEST_HR,
} from "../../../utils/constants";
import { alertBox } from "../../../utils/helpers";

import {
  getApprovalFeatureModules,
  getCorporateCommunication,
  getCorporateCommunicationDetails,
  getknowledgeHubCategories,
  getOfferCategories,
  getOffers,
  getOffersDetails,
  getUsefulApps,
  getQoutes,
  getSurvey,
  getEvents,
  getDocuments,
  submitAcknowledge,
  getEventsDetails,
  cancelAcknowledge,
  getDocumentsDetail,
  organizationStructure,
  getPendingAcknowledgement,
  setNotificationCount,
  getTenantLogin,
  getDiscrepancyList,
  getMeterReadingList,
} from "./actions";

export const initialState = {
  corporateCommunicationData: undefined,
  corporateCommunicationDetails: {},
  approvalFeatureModulesData: undefined,
  serviceRequestData: undefined,
  usefullAppsData: undefined,
  knowledgeHubCategoriesData: undefined,
  offerCategoriesData: undefined,
  offersData: undefined,
  offersDetails: {},
  featureModuleData: {},
  qouteList: [],
  surveyList: undefined,
  eventsList: undefined,
  eventsDetails: undefined,
  documentsList: undefined,
  documentsDetails: {},
  acknowledgeData: {},
  cancelledAcknowledgeData: {},
  organizationStructureData: undefined,
  pendingAcknowledgementData: {},
  unreadNotificationCount: undefined,
  serviceRequestList: undefined,
  meterServiceRequestList: undefined,
  meterServiceRequestError: {},
};

export default (
  state = initialState,
  action: { type: any; payload: { type: any } }
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getCorporateCommunication.TRIGGER: {
        draft.corporateCommunicationData = undefined;
        break;
      }
      case getCorporateCommunication.SUCCESS: {
        const { data } = action?.payload || {};
        draft.corporateCommunicationData = data;
        break;
      }

      case getCorporateCommunicationDetails.TRIGGER: {
        draft.corporateCommunicationDetails = {};
        break;
      }
      case getCorporateCommunicationDetails.SUCCESS: {
        const { data } = action?.payload || {};
        draft.corporateCommunicationDetails = data;
        break;
      }

      case getApprovalFeatureModules.TRIGGER: {
        draft.approvalFeatureModulesData = undefined;
        draft.serviceRequestData = undefined;
        draft.featureModuleData = {};
        break;
      }
      case getApprovalFeatureModules.SUCCESS: {
        draft.approvalFeatureModulesData = action.payload?.data?.filter(
          // (item) => item?.feature.startWi === `${APPROVALS}`
          (item) => item?.feature.indexOf(SERVICEREQUEST_APPROVALS) === 0
        );

        draft.serviceRequestData = action.payload?.data?.filter(
          (item) => item?.feature === SERVICEREQUEST_HR
        );

        draft.featureModuleData = action?.payload?.data || {};

        break;
      }
      case getOfferCategories.TRIGGER: {
        draft.offerCategoriesData = undefined;
        break;
      }
      case getOfferCategories.SUCCESS: {
        draft.offerCategoriesData = action.payload?.data;

        draft.offerCategoriesData = draft.offerCategoriesData?.sort(
          (a, b) => a.order - b.order
        );
        break;
      }

      case getOffers.TRIGGER: {
        draft.offersData = undefined;
        break;
      }
      case getOffers.SUCCESS: {
        draft.offersData = action.payload;
        break;
      }

      case getOffersDetails.TRIGGER: {
        draft.offersDetails = [];
        break;
      }
      case getOffersDetails.SUCCESS: {
        const { data } = action?.payload || {};
        draft.offersDetails = data;
        break;
      }

      case getUsefulApps.TRIGGER: {
        draft.usefullAppsData = undefined;
        break;
      }
      case getUsefulApps.SUCCESS: {
        const { data } = action?.payload || {};
        draft.usefullAppsData = data;
        break;
      }
      case getknowledgeHubCategories.TRIGGER: {
        draft.knowledgeHubCategoriesData = undefined;
        break;
      }
      case getknowledgeHubCategories.SUCCESS: {
        draft.knowledgeHubCategoriesData = action.payload?.data;
        draft.knowledgeHubCategoriesData =
          draft.knowledgeHubCategoriesData?.sort((a, b) => a.order - b.order);
        break;
      }

      case getQoutes.TRIGGER: {
        draft.qouteList = [];
        break;
      }
      case getQoutes.SUCCESS: {
        draft.qouteList = action?.payload?.data || [];
        break;
      }

      case getSurvey.TRIGGER: {
        draft.surveyList = undefined;
        break;
      }
      case getSurvey.SUCCESS: {
        draft.surveyList = action?.payload?.data || [];
        break;
      }
      case getSurvey.FAILURE: {
        draft.surveyList = [];
        break;
      }

      case getEvents.TRIGGER: {
        draft.eventsList = undefined;
        break;
      }
      case getEvents.SUCCESS: {
        draft.eventsList = action?.payload?.data || [];
        break;
      }
      case getEvents.FAILURE: {
        draft.eventsList = [];
        break;
      }

      case getEventsDetails.TRIGGER: {
        draft.eventsDetails = undefined;
        draft.cancelledAcknowledgeData = {};
        draft.acknowledgeData = {};
        break;
      }
      case getEventsDetails.SUCCESS: {
        draft.eventsDetails = action?.payload?.data || {};
        break;
      }
      case getEventsDetails.FAILURE: {
        draft.eventsDetails = {};
        break;
      }

      case getDocuments.TRIGGER: {
        draft.documentsList = undefined;
        break;
      }
      case getDocuments.SUCCESS: {
        draft.documentsList = action?.payload?.data || [];
        break;
      }
      case getDocuments.FAILURE: {
        draft.documentsList = [];
        break;
      }

      case getDocumentsDetail.TRIGGER: {
        draft.documentsDetails = {};
        break;
      }
      case getDocumentsDetail.SUCCESS: {
        draft.documentsDetails = action?.payload?.data || [];
        break;
      }
      case getDocumentsDetail.FAILURE: {
        draft.documentsDetails = {};
        break;
      }

      case submitAcknowledge.TRIGGER: {
        draft.acknowledgeData = {};
        break;
      }
      case submitAcknowledge.SUCCESS: {
        draft.acknowledgeData = action?.payload?.data || {};
        break;
      }
      case submitAcknowledge.FAILURE: {
        draft.acknowledgeData = {};
        break;
      }

      case cancelAcknowledge.TRIGGER: {
        draft.cancelledAcknowledgeData = {};
        break;
      }
      case cancelAcknowledge.SUCCESS: {
        draft.cancelledAcknowledgeData = action?.payload?.data || {};
        break;
      }
      case cancelAcknowledge.FAILURE: {
        draft.cancelledAcknowledgeData = {};
        break;
      }

      case organizationStructure.TRIGGER: {
        draft.organizationStructureData = undefined;
        break;
      }
      case organizationStructure.SUCCESS: {
        draft.organizationStructureData = action?.payload?.data || {};
        break;
      }
      case organizationStructure.FAILURE: {
        draft.organizationStructureData = {};
        break;
      }

      case getPendingAcknowledgement.TRIGGER: {
        draft.pendingAcknowledgementData = {};
        break;
      }
      case getPendingAcknowledgement.SUCCESS: {
        draft.pendingAcknowledgementData = action?.payload?.data || {};
        break;
      }
      case getPendingAcknowledgement.FAILURE: {
        draft.pendingAcknowledgementData = {};
        break;
      }

      case getTenantLogin.TRIGGER: {
        // draft.pendingAcknowledgementData = {};
        break;
      }
      case getTenantLogin.SUCCESS: {
        // draft.pendingAcknowledgementData = action?.payload?.data || {};
        break;
      }
      case getTenantLogin.FAILURE: {
        // draft.pendingAcknowledgementData = {};
        break;
      }

      case getDiscrepancyList.TRIGGER: {
        if (action?.payload?.page === 1) {
          draft.serviceRequestList = undefined;
        }
        break;
      }

      case getDiscrepancyList.SUCCESS: {
        const newData = action?.payload?.data || {};
        const currentPage = newData?.current_page || 1;
        if (currentPage === 1) {
          draft.serviceRequestList = newData;
        } else {
          draft.serviceRequestList = {
            ...newData,
            list: [
              ...(draft.serviceRequestList?.list || []),
              ...(newData?.list || [])
            ]
          };
        }
        break;
      }

      case getDiscrepancyList.FAILURE: {
        if (action?.payload?.page === 1) {
          draft.serviceRequestList = [];
        }
        break;
      }

      case getMeterReadingList.TRIGGER: {
        if (action?.payload?.page === 1) {
            draft.meterServiceRequestList = undefined;
          }
        draft.meterServiceRequestList = undefined;
        draft.meterServiceRequestError = {}
        break;
      }

      case getMeterReadingList.SUCCESS: {
        console.log("success reducer", action?.payload?.data)
        const newData = action?.payload?.data || {};
        const currentPage = newData?.current_page || 1;
        if (currentPage === 1) {
          draft.meterServiceRequestList = newData;
        } else {
          draft.meterServiceRequestList = {
            ...newData,
            list: [
              ...(draft.meterServiceRequestList?.list || []),
              ...(newData?.list || [])
            ]
          };
        }
        draft.meterServiceRequestError = {}
        console.log("updated list", draft.meterServiceRequestList)
        break;
      }

      case getMeterReadingList.FAILURE: {
        if (isEmpty(action.payload)) {
            draft.meterServiceRequestError = {
              title: localize('common.error'),
              message: localize('common.someThingWentWrong')
            };
          } else {
            const { error } = action.payload as any;
            draft.meterServiceRequestError = error;
          }
        break;
      }


      case setNotificationCount.TRIGGER: {
        draft.unreadNotificationCount = action?.payload || 0;
        break;
      }

      default: {
        break;
      }
    }
  });
