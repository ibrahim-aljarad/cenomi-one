import { combineReducers } from 'redux';
import REDUCER_KEY from './reducerKeys';
import AppReducer from '../appContainer/redux/reducer';
import LoginReducer from '../containers/LoginHome/redux/reducer';
import HomeReducer from '../containers/Home/redux/reducer';
import FaqReducer from '../containers/Faq/redux/reducer';
import ProfileReducer from '../containers/Profile/redux/reducer';
import HrRequestReducer from '../containers/HrRequest/redux/reducer';
import NotificationReducer from '../containers/Notifications/redux/reducer';
import KnowledgeHUBReducer from '../containers/KnowledgeHUB/redux/reducer';
import ApprovalsReducer from '../containers/Approvals/redux/reducer';
import CommonReducer from '../containers/redux/reducer';
// import RewardsReducer from '../containers/RewardsHome/redux/reducer';
import RewardsReducer from '../containers/RewardsHome/RewardsProfile/redux/reducer';

export default () =>
  combineReducers({
    [REDUCER_KEY.APP_REDUCER]: AppReducer,
    [REDUCER_KEY.LOGIN_REDUCER]: LoginReducer,
    [REDUCER_KEY.HOME_REDUCER]: HomeReducer,
    [REDUCER_KEY.FAQ_REDUCER]: FaqReducer,
    [REDUCER_KEY.PROFILE_REDUCER]: ProfileReducer,
    [REDUCER_KEY.HR_REQUEST_REDUCER]: HrRequestReducer,
    [REDUCER_KEY.NOTIFICATION_REDUCER]: NotificationReducer,
    [REDUCER_KEY.KNOWLEDGEHUB_REDUCER]: KnowledgeHUBReducer,
    [REDUCER_KEY.APPROVALS_REDUCER]: ApprovalsReducer,
    [REDUCER_KEY.COMMON_REDUCER]: CommonReducer,
    [REDUCER_KEY.REWARDS_PROFILE_REDUCER]: RewardsReducer
  });
