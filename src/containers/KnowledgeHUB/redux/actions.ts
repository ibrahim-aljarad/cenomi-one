import { createRoutine } from 'redux-saga-routines';
import { GET_KNOWLEDGE_HUB_DOCUMENTS, GET_KNOWLEDGE_HUB_TAG } from './constants';

export const getKnowledgehubDocuments = createRoutine(GET_KNOWLEDGE_HUB_DOCUMENTS);

export const getKnowledgehubTag = createRoutine(GET_KNOWLEDGE_HUB_TAG);
