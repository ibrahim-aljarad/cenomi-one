import analytics from '@react-native-firebase/analytics';
import appsFlyer from 'react-native-appsflyer';

const removeSpecialCharToLowerSnakeCase = (srcString: string) => {
  if (srcString) {
    let finalString = srcString.trim();
    finalString = finalString.replace(/[&\/\\#, +()$~%.'":*?<>{}-]/g, '').toLowerCase();
    return finalString;
  } else {
    return '';
  }
};

export const trackEvent = (eventName: string, eventData?: object) => {
  const finalEventData = eventData ? { ...eventData } : {};
  const name = removeSpecialCharToLowerSnakeCase(eventName);
  try {
    analytics().logEvent(name, finalEventData);
    appsFlyer.logEvent(name, finalEventData, null, null);
  } catch (e) {
    console.log('e', e);
  }
};

export const EVENT_NAME = {
  LOGIN: 'login',
  LOGIN_CHECK_USER: 'login_check_user',
  LOGIN_CONTINUE_BTN_TRIGGER: 'login_continue_btn_trigger',

  PRESSED_PROFILE_IOCN: 'pressed_profile_icon',
  PRESSED_DIGICARD_IOCN: 'pressed_digicard_icon',
  PRESSED_NOTIFICATION_IOCN: 'pressed_notification_icon',
  PRESSED_CORPORATE_COMMUNICATION: 'pressed_corporate_communication',
  PRESSED_APPROVALS_FROM_HOME: 'pressed_approvals_from_home',
  PRESSED_HRREQUESTS_FROM_HOME: 'pressed_hr_requests_from_home',
  PRESSED_BENEFITS_FROM_HOME: 'pressed_benefits_from_home',
  PRESSED_BENEFITS_SEEALL_FROM_HOME: 'pressed_benefits_seeall_from_home',
  PRESSED_USEFUL_APPS_FROM_HOME: 'pressed_useful_apps_from_home',
  PRESSED_USEFUL_APPS_FROM_MODAL: 'pressed_useful_apps_from_modal',
  PRESSED_USEFUL_APPS_SEEALL_FROM_HOME: 'pressed_useful_apps_seeall_from_home',
  PRESSED_KNOWLEDGE_HUB_FROM_HOME: 'pressed_knowledge_hub_from_home',
  PRESSED_KNOWLEDGE_HUB_SEEALL_FROM_HOME: 'pressed_knowledge_hub_seeall_from_home',
  PRESSED_BOTTOM_TAB: 'pressed_bottom_tab_',
  PRESSED_TERMS_AND_CONDITIONS_FROM_PROFILE: 'pressed_tnc_from_profile',
  PRESSED_PRIVACY_POLICY_FROM_PROFILE: 'pressed_privacy_policy_from_profile',
  PRESSED_FAQ_FROM_PROFILE: 'pressed_faq_from_profile',
  PRESSED_MANAGE_BIOMETRIC_FROM_PROFILE: 'pressed_manage_biometric_from_profile',
  PRESSED_APPS_SETTINGS_FROM_PROFILE: 'pressed_apps_settings_from_profile',
  PRESSED_NOTIFICATION_SETTINGS_FROM_PROFILE: 'pressed_notification_settings_from_profile',
  PRESSED_LOGOUT: 'pressed_logout',
  PRESSED_UPLOAD_ON_PROFILE_PIC: 'pressed_upload_on_profile_pic',
  PRESSED_PROFILE_SHARE_BTN: 'pressed_profile_share_btn',
  PRESSED_QRCODE_BTN: 'pressed_share_btn',
  PRESSED_HR_FROM_APPROVALS: 'pressed_hr_from_approvals',
  PRESSED_PROCUREMENT_FROM_APPROVALS: 'pressed_procurement_from_approvals',

  // from approvals page
  PRESSED_APPROVALS_: 'pressed_approvals_',
  // approvals list
  PRESSED_APPROVALS_TASK_ITEM: 'pressed_approvals_task_item',

  PRESSED_APPROVALS_ATTACHMENT: 'pressed_approvals_attachment',

  PRESSED_APPROVALS_ACTION: 'pressed_approvals_action',
  PRESSED_APPROVALS_ACTION_SUBMIT: 'pressed_approvals_action_submit',

  PRESSED_KNOWLEDGE_HUB_ITEM: 'pressed_knowledge_hub_item',
  PRESSED_KNOWLEDGE_HUB_DOCUMENT: 'pressed_knowledge_hub_doc',
  PRESSED_BENEFITS_ITEM: 'pressed_benefits_item',
  PRESSED_BENEFITS_CAT: 'pressed_benefits_category',
  PRESSED_BENEFITS_TERMSCOND: 'pressed_benefits_termsandconditon',
  PRESSED_BENEFITS_EXPLORE: 'pressed_benefits_explore',
  PRESSED_HR: 'pressed_hr_',
  PRESSED_APPLY_LEAVE: 'pressed_apply_leave',
  PRESSED_LEAVE_CANCEL: 'pressed_leave_cancel',
  PRESSED_LEAVE_SUBMIT: 'pressed_leave_submit',
  PRESSED_NEED_HELP: 'pressed_need_help',

  SCREEN_PROFILE: 'screen_profile',
  SCREEN_CORPORATE_COMM_DETAILS: 'screen_corporate_comm_details',
  SCREEN_DIGITAL_CARD: 'screen_digital_card',
  SCREEN_NOTIFICATION_LIST: 'screen_notification_list',
  SCREEN_FAQS: 'screen_faqs',

  SCREEN_APPROVALS_LISTING: 'screen_approvals_listing',
  SCREEN_APPROVALS_DETAILS: 'screen_approvals_details',

  SCREEN_APPLY_LEAVE: 'screen_apply_leave',
  SCREEN_APPLY_LEAVE_FORM: 'screen_apply_leave_form',
  SCREEN_PAYSLIP: 'screen_payslip',
  SCREEN_PAYSLIP_DOWNLOAD: 'screen_payslip_download',

  SCREEN_BENEFITS_LIST: 'screen_benefits_list',
  SCREEN_BENEFITS_DETAILS: 'screen_benefits_details',

  SCREEN_KNOWLEDGE_HUB_LIST: 'screen_knowledge_hub_list',
  SCREEN_KNOWLEDGE_HUB_DOC_LIST: 'screen_knowledge_hub_doc_list',
  CHAT_GPT: 'chat_gpt',
  CAMERA: 'camera',
  CALENDAR: 'calendar',
  VIDEO: 'video',
  PDF: 'pdf',
  AUDIO_RECORD: 'auduio_record',
  WEBVIEW: 'webview',
  HTML: 'html',

  BIRTHDAY_WISH_CALL: 'birthdaywish_call',
  BIRTHDAY_WISH_EMAIL: 'birthdaywish_email',
  BIRTHDAY_WISH_WHATSAPP: 'birthdaywish_whatsapp',
  ANNIVERSARY_WISH_CALL: 'anniversarywish_call',
  ANNIVERSARY_WISH_EMAIL: 'anniversarwish_email',
  ANNIVERSARY_WISH_WHATSAPP: 'anniversarwish_whatsapp',

  SCREEN_EVENTS_LIST: 'screen_events_list',
  SCREEN_EVENT_DETAILS: 'screen_event_details'
};

export const ANALYTICS_SCREEN_NAME = {};
