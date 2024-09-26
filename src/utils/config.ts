import env from 'react-native-config';

const Config = {
  API_BASE_URL: env.API_BASE_URL,
  FB_DB_META_DATA_REF: env.FB_DB_META_DATA_REF,
  API_KEY: env.API_KEY,
  PRIVACY_POLICY: env.PRIVACY_POLICY + '?ap=qelcwsx9pz818ov1gncr9uibvw50l2jq',
  TERMS_AND_CONDITION: env.TERMS_AND_CONDITION + '?ap=qelcwsx9pz818ov1gncr9uibvw50l2jq',

  DEV_MODE: env.DEV_MODE === 'true',

  WEBSITE_BASEURL: env.WEBSITE_BASEURL,
  APPIAN_URL: env.APPIAN_URL,
  APPIAN_KEY: env.APPIAN_KEY,
  APPIAN_COOKIE: env.APPIAN_COOKIE,
};

export default Config;
