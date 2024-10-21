import { createRoutine } from 'redux-saga-routines';

import {
  CANCEL_ACKNOWLEDGE,
  GET_APPROVAL_FEATURE_MODULES,
  GET_CORPORATE_COMMUNICATION,
  GET_CORPORATE_COMMUNICATION_DETAILS,
  GET_DOCUMENTS,
  GET_DOCUMENTS_DETAILS,
  GET_EVENTS,
  GET_EVENTS_DETAILS,
  GET_KNOWLEDGE_HUB_CATEGORIES,
  GET_OFFERS,
  GET_OFFERS_DETAILS,
  GET_OFFER_CATEGORIES,
  GET_PENDING_ACKNOWLEDGEMENT,
  GET_QOUTES,
  GET_SURVEY,
  GET_USEFUL_APPS,
  ORGANIZATION_STRUCTURE,
  SET_NOTIFICATION_COUNT,
  SUBMIT_ACKNOWLEDGE,
  GET_TENANT_LOGIN,
} from './constants';

export const getCorporateCommunication = createRoutine(GET_CORPORATE_COMMUNICATION);
export const getCorporateCommunicationDetails = createRoutine(GET_CORPORATE_COMMUNICATION_DETAILS);
export const getApprovalFeatureModules = createRoutine(GET_APPROVAL_FEATURE_MODULES);
export const getOfferCategories = createRoutine(GET_OFFER_CATEGORIES);
export const getUsefulApps = createRoutine(GET_USEFUL_APPS);
export const getknowledgeHubCategories = createRoutine(GET_KNOWLEDGE_HUB_CATEGORIES);
export const getOffers = createRoutine(GET_OFFERS);
export const getOffersDetails = createRoutine(GET_OFFERS_DETAILS);
export const getQoutes = createRoutine(GET_QOUTES);
export const getSurvey = createRoutine(GET_SURVEY);
export const getEvents = createRoutine(GET_EVENTS);
export const getEventsDetails = createRoutine(GET_EVENTS_DETAILS);
export const getDocuments = createRoutine(GET_DOCUMENTS);
export const getDocumentsDetail = createRoutine(GET_DOCUMENTS_DETAILS);
export const submitAcknowledge = createRoutine(SUBMIT_ACKNOWLEDGE);
export const cancelAcknowledge = createRoutine(CANCEL_ACKNOWLEDGE);
export const organizationStructure = createRoutine(ORGANIZATION_STRUCTURE);
export const getPendingAcknowledgement = createRoutine(GET_PENDING_ACKNOWLEDGEMENT);
export const setNotificationCount = createRoutine(SET_NOTIFICATION_COUNT);
export const getTenantLogin = createRoutine(GET_TENANT_LOGIN);
