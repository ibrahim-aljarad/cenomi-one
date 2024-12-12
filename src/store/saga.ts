import { all } from 'redux-saga/effects';
import appSaga from '../appContainer/redux/saga';
import loginSaga from '../containers/LoginHome/redux/saga';
import homeSaga from '../containers/Home/redux/saga';
import faqSaga from '../containers/Faq/redux/saga';
import profileSaga from '../containers/Profile/redux/saga';
import hrRequestSaga from '../containers/HrRequest/redux/saga';
import notificationSaga from '../containers/Notifications/redux/saga';
import KnowledgehubSaga from '../containers/KnowledgeHUB/redux/saga';
import approvalsSaga from '../containers/Approvals/redux/saga';
import commonSaga from '../containers/redux/saga';
// import rewardsProfileSaga from '../containers/RewardsHome/redux/saga';
import rewardsProfileSaga from '../containers/RewardsHome/RewardsProfile/redux/saga';
import discrepancySaga from '../containers/DiscrepancyDetails/redux/saga';
import meterReadingSaga from '../containers/MeterReading/redux/saga';

function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    homeSaga(),
    faqSaga(),
    profileSaga(),
    hrRequestSaga(),
    notificationSaga(),
    KnowledgehubSaga(),
    approvalsSaga(),
    commonSaga(),
    rewardsProfileSaga(),
    discrepancySaga(),
    meterReadingSaga()
  ]);
}

export default rootSaga;
