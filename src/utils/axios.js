import perf from "@react-native-firebase/perf";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import Config from "./config";
import { LOCAL_STORAGE_DATA_KEY } from "./constants";
import { getSaveData, removeData, storeData } from "./helpers";
import RNRestart from "react-native-restart";
import { clearAllExceptTutorialShowAppLanguage } from "./helper";

export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
// Placing all styling objects here outside the fetchResponse() method
const bgBlue = "font-weight: bold; color: white; background-color: blue;";
const bgAqua = "font-weight: bold; color: black; background-color: aqua;";
const bgGreen = "font-weight: bold; color: white; background-color: green;";
const bgYellow = "font-weight: bold; color: black; background-color: yellow;";
const bgRed = "font-weight: bold; color: white; background-color: red;";
const bgOrange = "font-weight: bold; color: black; background-color: orange;";

const instance = axios.create();
instance.interceptors.request.use(
  async (config) => {
    const httpMetric = perf().newHttpMetric(
      config.url,
      config.method.toUpperCase()
    );
    config.metadata = { httpMetric };
    config.metadata.requestStartTime = new Date().getTime();
    await httpMetric.start();
    const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
    if (!config?.headers?.Authorization && token) {
      config.headers.Authorization = "Bearer " + token;
    }
    // console.log("token", "Bearer " + token);
    config.baseURL = Config.API_BASE_URL;
    // config.headers['API-TOKEN'] = API_TOKEN;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//for appian apis
const appianInstance = axios.create();
appianInstance.interceptors.request.use(
  async (config) => {
    const httpMetric = perf().newHttpMetric(
      config.url,
      config.method.toUpperCase()
    );
    config.metadata = { httpMetric };
    config.metadata.requestStartTime = new Date().getTime();
    await httpMetric.start();

    config.headers['Appian-API-Key'] = Config.APPIAN_KEY;
    config.baseURL = Config.APPIAN_URL;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//for cenomi central apis
const tenantCentralInstance = axios.create();
tenantCentralInstance.interceptors.request.use(
  async (config) => {
    const httpMetric = perf().newHttpMetric(
      config.url,
      config.method.toUpperCase()
    );
    config.metadata = { httpMetric };
    config.metadata.requestStartTime = new Date().getTime();
    await httpMetric.start();

    // config.headers['Appian-API-Key'] = Config.APPIAN_KEY;
    config.baseURL = Config.TENANT_CENTRAL_URL;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// for multiple requests
// let isRefreshed = false;
// let newTokens = {};
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  console.log({ failedQueue });

  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // isRefreshed = false;
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  async function (response) {
    // record metrics
    const { httpMetric } = response.config.metadata;
    response.config.metadata.requestEndTime = new Date().getTime();
    httpMetric.setHttpResponseCode(response.status);
    httpMetric.setResponseContentType(response.headers["content-type"]);
    await httpMetric.stop();

    return response;
  },

  async function (error) {
    // record metrics
    const { httpMetric } = error.config.metadata;
    error.config.metadata.requestEndTime = new Date().getTime();
    httpMetric.setHttpResponseCode(error.response.status);
    httpMetric.setResponseContentType(error.response.headers["content-type"]);
    await httpMetric.stop();

    const originalRequest = error.config;

    if (error.response.status === 403) {
      await storeData(
        LOCAL_STORAGE_DATA_KEY.UN_AUTORISED_ACCESS,
        JSON.stringify(true)
      );
    }

    console.log({
      originalRequest,
      error,
      headers: JSON.stringify(originalRequest.headers),
    });

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest?.url !== "auth/login" &&
      originalRequest?.url !== "auth/refresh-token"
    ) {
      console.log({ isRefreshing });

      // if (isRefreshed) {
      //   originalRequest.headers['Authorization'] = 'Bearer ' + newTokens.accessToken;
      //   return axios(originalRequest);
      // }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await getSaveData(
        LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN
      );

      console.log({ refreshToken });

      return new Promise(function (resolve, reject) {
        axios
          .get(Config.API_BASE_URL + "auth/refresh-token", {
            headers: { Authorization: "Bearer " + refreshToken },
          })
          .then(async ({ data }) => {
            console.log({ tokenData: data });

            // newTokens = data;
            // isRefreshed = true;

            await storeData(
              LOCAL_STORAGE_DATA_KEY.USER_TOKEN,
              data.accessToken
            );
            await storeData(
              LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN,
              data.refreshToken
            );

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data.accessToken;
            originalRequest.headers["Authorization"] =
              "Bearer " + data.accessToken;

            processQueue(null, data.accessToken);
            resolve(axios(originalRequest));
          })
          .catch(async (err) => {
            console.log({
              err,
              config: err.config,
              headers: JSON.stringify(err.config?.headers),
            });

            // await removeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
            // await removeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN);
            // await removeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE);
            // await removeData(LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME);

            // logout user
            await clearAllExceptTutorialShowAppLanguage(false);
            RNRestart.Restart();

            processQueue(err, null);
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

appianInstance.interceptors.response.use(
  async function (response) {
    // record metrics
    const { httpMetric } = response.config.metadata;
    response.config.metadata.requestEndTime = new Date().getTime();
    httpMetric.setHttpResponseCode(response.status);
    httpMetric.setResponseContentType(response.headers["content-type"]);
    await httpMetric.stop();

    return response;
  },

  async function (error) {
    // record metrics
    const { httpMetric } = error.config.metadata;
    error.config.metadata.requestEndTime = new Date().getTime();
    httpMetric.setHttpResponseCode(error.response.status);
    httpMetric.setResponseContentType(error.response.headers["content-type"]);
    await httpMetric.stop();
    return Promise.reject(error);
  }
);


tenantCentralInstance.interceptors.response.use(
  async function (response) {
    // record metrics
    const { httpMetric } = response.config.metadata;
    response.config.metadata.requestEndTime = new Date().getTime();
    httpMetric.setHttpResponseCode(response.status);
    httpMetric.setResponseContentType(response.headers["content-type"]);
    await httpMetric.stop();

    return response;
  },

  async function (error) {
    // record metrics
    const { httpMetric } = error.config.metadata;
    error.config.metadata.requestEndTime = new Date().getTime();
    httpMetric.setHttpResponseCode(error.response.status);
    httpMetric.setResponseContentType(error.response.headers["content-type"]);
    await httpMetric.stop();

    const originalRequest = error.config;

    if (error.response.status === 403) {
      await storeData(
        LOCAL_STORAGE_DATA_KEY.UN_AUTORISED_ACCESS,
        JSON.stringify(true)
      );
    }

    console.log({
      originalRequest,
      error,
      headers: JSON.stringify(originalRequest.headers),
    });

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest?.url !== "auth/login" &&
      originalRequest?.url !== "auth/refresh-token"
    ) {
      console.log({ isRefreshing });

      // if (isRefreshed) {
      //   originalRequest.headers['Authorization'] = 'Bearer ' + newTokens.accessToken;
      //   return axios(originalRequest);
      // }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await getSaveData(
        LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN
      );

      console.log({ refreshToken });

      return new Promise(function (resolve, reject) {
        axios
          .get(Config.tenantCentralInstance + "auth/refresh-token", {
            headers: { Authorization: "Bearer " + refreshToken },
          })
          .then(async ({ data }) => {
            console.log({ tokenData: data });

            // newTokens = data;
            // isRefreshed = true;

            await storeData(
              LOCAL_STORAGE_DATA_KEY.USER_TOKEN,
              data.accessToken
            );
            await storeData(
              LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN,
              data.refreshToken
            );

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data.accessToken;
            originalRequest.headers["Authorization"] =
              "Bearer " + data.accessToken;

            processQueue(null, data.accessToken);
            resolve(axios(originalRequest));
          })
          .catch(async (err) => {
            console.log({
              err,
              config: err.config,
              headers: JSON.stringify(err.config?.headers),
            });

            // await removeData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
            // await removeData(LOCAL_STORAGE_DATA_KEY.REFRESH_TOKEN);
            // await removeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE);
            // await removeData(LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME);

            // logout user
            await clearAllExceptTutorialShowAppLanguage(false);
            RNRestart.Restart();

            processQueue(err, null);
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
/*
 * This function return the response from remote server
 * @param {Object} config
 */
// prettier-ignore
async function fetchResponse(config) {
  console.log('%c %s', bgBlue, '🚀 API Request Config 🚀 ', config);
  return instance(config)
    .then((response) => {
    
      const { data, config } = response;
        // console.log({ data, config });
      if (__DEV__) {
        const { requestStartTime, requestEndTime } = response.config.metadata;
        const totalTimeInMs = requestEndTime - requestStartTime;
        console.log('%c %s %c %s %c %s', bgGreen, '✨ Response ✨', bgYellow, `Time: ${totalTimeInMs}`, bgAqua, `${config.method}: ${config.url} `);
      } else {
        console.log('%c ✨ Response Data ✨', bgGreen, data);
      }
      if (response?.status === 403 || response?.status === 401) {
        // refreshHandler(response?.status, config)
        return { data, success: false, error: {title:'Error',message:'Authorization Error!'} };
      }
      return { success: true, data };
    })
    .catch((error) => {
      console.log('%c %s %c %s', bgRed, '💀 API Error 💀', bgOrange, `${config.method}: ${config.url} `, error, error.response);
     
      const { data: errorResponse } = error.response || {};
      console.log('error.response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', errorResponse, error);

      if (errorResponse?.statusCode === 403 || errorResponse?.statusCode === 401) {
        // refreshHandler(errorResponse?.statusCode, config);
        return { data: errorResponse, success: false, error: {title:'Error',message:'Authorization Error!'} };
      }
      if (errorResponse?.statusCode === 400) {
        return { data: errorResponse, success: false, error: errorResponse.message };
      }
      if (!errorResponse) {
        return {
          data: {},
          success: false,
          error: { title: 'Connectivity Error', message: 'Please check your internet connection.' },
        };
      }
      return {
        success: false,
        data:errorResponse,
        error: {
          title: 'Unexpected Error',
          message: 'Server error please try again later',
        },
      };
    });
}

async function fetchAppianResponse(config) {
  console.log('%c %s', bgBlue, '🚀 API Request Config 🚀 ', config);
  return appianInstance(config)
    .then((response) => {
    
      const { data, config } = response;
        // console.log({ data, config });
      if (__DEV__) {
        const { requestStartTime, requestEndTime } = response.config.metadata;
        const totalTimeInMs = requestEndTime - requestStartTime;
        console.log('%c %s %c %s %c %s', bgGreen, '✨ Response ✨', bgYellow, `Time: ${totalTimeInMs}`, bgAqua, `${config.method}: ${config.url} `);
      } else {
        console.log('%c ✨Appian Response Data ✨', bgGreen, data);
      }
      if (response?.status === 403 || response?.status === 401) {
        // refreshHandler(response?.status, config)
        return { data, success: false, error: {title:'Error',message:'Authorization Error!'} };
      }
      return { success: true, data };
    })
    .catch((error) => {
      console.log('%c %s %c %s', bgRed, '💀 API Errors 💀', bgOrange, `${config.method}: ${config.url} `, error, error.response);
     
      const { data: errorResponse } = error.response || {};
      console.log('error.response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', errorResponse, error);

      if (errorResponse?.statusCode === 403 || errorResponse?.statusCode === 401) {
        // refreshHandler(errorResponse?.statusCode, config);
        return { data: errorResponse, success: false, error: {title:'Error',message:'Authorization Error!'} };
      }
      if (errorResponse?.statusCode === 400) {
        return { data: errorResponse, success: false, error: errorResponse.message };
      }
      if (!errorResponse) {
        return {
          data: {},
          success: false,
          error: { title: 'Connectivity Error', message: 'Please check your internet connection.' },
        };
      }
      return {
        success: false,
        data:errorResponse,
        error: {
          title: 'Unexpected Error',
          message: 'Server error please try again later',
        },
      };
    });
}

async function fetchTenantCentralResponse(config) {
  console.log('%c %s', bgBlue, '🚀Tenant API Request Config 🚀 ', config);
  return tenantCentralInstance(config)
    .then((response) => {
    
      const { data, config } = response;
        // console.log({ data, config });
      if (__DEV__) {
        const { requestStartTime, requestEndTime } = response.config.metadata;
        const totalTimeInMs = requestEndTime - requestStartTime;
        console.log('%c %s %c %s %c %s', bgGreen, '✨ Tenant Response ✨', bgYellow, `Time: ${totalTimeInMs}`, bgAqua, `${config.method}: ${config.url} `);
      } else {
        console.log('%c ✨ Response Data ✨', bgGreen, data);
      }
      if (response?.status === 403 || response?.status === 401) {
        // refreshHandler(response?.status, config)
        return { data, success: false, error: {title:'Error',message:'Authorization Error!'} };
      }
      return { success: true, data };
    })
    .catch((error) => {
      console.log('%c %s %c %s', bgRed, '💀 Tenant API Error 💀', bgOrange, `${config.method}: ${config.url} `, error, error.response);
     
      const { data: errorResponse } = error.response || {};
      console.log('error.response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', errorResponse, error);

      if (errorResponse?.statusCode === 403 || errorResponse?.statusCode === 401) {
        // refreshHandler(errorResponse?.statusCode, config);
        return { data: errorResponse, success: false, error: {title:'Error',message:'Authorization Error!'} };
      }
      if (errorResponse?.statusCode === 400) {
        return { data: errorResponse, success: false, error: errorResponse.message };
      }
      if (!errorResponse) {
        return {
          data: {},
          success: false,
          error: { title: 'Connectivity Error', message: 'Please check your internet connection.' },
        };
      }
      return {
        success: false,
        data:errorResponse,
        error: {
          title: 'Unexpected Error',
          message: 'Server error please try again later',
        },
      };
    });
}

export const api = async (config, isLoading = true) => {
  if (isLoading) {
    return trackPromise(fetchResponse({ ...config }));
  } else {
    return fetchResponse({ ...config });
  }
};

// this method process the rest api multipart request
export const uploadApi = (config, isLoading = true) => {
  if (isLoading) {
    return trackPromise(fetchResponse({ ...config }));
  } else {
    return fetchResponse({ ...config });
  }
};

export const appianApi = async (config, isLoading = true) => {
  if (isLoading) {
    return trackPromise(fetchAppianResponse({ ...config }));
  } else {
    return fetchAppianResponse({ ...config });
  }
};

export const tenantCentralApi = async (config, isLoading = true) => {
  if (isLoading) {
    return trackPromise(fetchTenantCentralResponse({ ...config }));
  } else {
    return fetchTenantCentralResponse({ ...config });
  }
};