import { call, put, takeLatest } from 'redux-saga/effects';
import { setGlobalError } from '../../../appContainer/redux/actions';
import { api } from '../../../utils/axios';
import Config from '../../../utils/config';
import { getKnowledgehubDocuments, getKnowledgehubTag } from './actions';

const KNOWLEDGE_HUB_DOCUMENTS_URL = 'cms/knowledge-hub-documents';
const KNOWLEDGE_HUB_TAG_URL = 'cms/tags';

const getKnowledgehubDocumentsRequestApiCall = () =>
  api({
    method: 'GET',
    url: `${KNOWLEDGE_HUB_DOCUMENTS_URL}`
  });

const getKnowledgehubTagRequestApiCall = () =>
  api({
    method: 'GET',
    url: `${KNOWLEDGE_HUB_TAG_URL}?api_key=${Config.API_KEY}`
  });
function* getKnowledgehubTagRequest(action: any) {
  try {
    yield put(getKnowledgehubTag.request({ isLoading: true }));
    const response = yield call(getKnowledgehubTagRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getKnowledgehubTag.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getKnowledgehubTag.fulfill({ isLoading: false }));
  }
}

function* getKnowledgehubDocumentsRequest(action: any) {
  try {
    yield put(getKnowledgehubDocuments.request({ isLoading: true }));
    const response = yield call(getKnowledgehubDocumentsRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getKnowledgehubDocuments.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getKnowledgehubDocuments.fulfill({ isLoading: false }));
  }
}
export default function* KnowledgehubSaga() {
  yield takeLatest(getKnowledgehubDocuments.TRIGGER, getKnowledgehubDocumentsRequest);
  yield takeLatest(getKnowledgehubTag.TRIGGER, getKnowledgehubTagRequest);
}
