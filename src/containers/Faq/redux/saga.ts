import { call, put, takeLatest } from 'redux-saga/effects';
import { setGlobalError } from '../../../appContainer/redux/actions';
import { api } from '../../../utils/axios';

import { isEmpty } from 'lodash';
import { getFaq } from './actions';
import Config from '../../../utils/config';

const FAQ_URL = 'cms/app-faq';

const getFaqRequestApiCall = () =>
  api({
    method: 'GET',
    url: `${FAQ_URL}?api_key=${Config.API_KEY}`
  });

function* getFaqRequest(action: any) {
  try {
    yield put(getFaq.request({ isLoading: true }));
    const response = yield call(getFaqRequestApiCall);
    if (response.success) {
      const { data } = response;
      yield put(getFaq.success({ data }));
    } else {
      yield put(setGlobalError.success());
    }
  } catch (error) {
    yield put(setGlobalError.success());
  } finally {
    yield put(getFaq.fulfill({ isLoading: false }));
  }
}

export default function* faqSaga() {
  yield takeLatest(getFaq.TRIGGER, getFaqRequest);
}
