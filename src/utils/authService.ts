import axios, { AxiosInstance } from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import perf from '@react-native-firebase/perf';
import Config from './config';
import { getSaveData, storeData } from './helpers';
import { LOCAL_STORAGE_DATA_KEY } from './constants';
import { trackPromise } from 'react-promise-tracker';

const loginEndpoint = "/cenomi-one/login";

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

class TenantAuthService {
  private static instance: TenantAuthService;
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;
  private failedQueue: QueueItem[] = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: Config.TENANT_CENTRAL_URL,
      withCredentials: true
    });
    this.setupInterceptors();
  }

  public static getInstance(): TenantAuthService {
    if (!TenantAuthService.instance) {
      TenantAuthService.instance = new TenantAuthService();
    }
    return TenantAuthService.instance;
  }

  private processQueue(error: any, token: string | null): void {
    this.failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private async setCookie(name: string, value: string): Promise<void> {
    await CookieManager.set(Config.TENANT_CENTRAL_URL as string, {
      name,
      value,
    });
  }

  private async getCookieString(): Promise<string> {
    const cookies = await CookieManager.get(Config.TENANT_CENTRAL_URL as string);
    return Object.entries(cookies)
      .map(([key, val]) => `${key}=${val.value}`)
      .join('; ');
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const httpMetric = perf().newHttpMetric(
          config.url!,
          config.method!.toUpperCase()
        );
        config.metadata = { httpMetric };
        config.metadata.requestStartTime = new Date().getTime();
        await httpMetric.start();

        const cookieString = await this.getCookieString();
        config.headers.Cookie = cookieString;

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      async (response) => {
        const { httpMetric } = response.config.metadata;
        response.config.metadata.requestEndTime = new Date().getTime();
        httpMetric.setHttpResponseCode(response.status);
        httpMetric.setResponseContentType(response.headers["content-type"]);
        await httpMetric.stop();
        return response;
      },
      async (error) => {
        const { httpMetric } = error.config.metadata;
        error.config.metadata.requestEndTime = new Date().getTime();
        httpMetric.setHttpResponseCode(error.response?.status);
        httpMetric.setResponseContentType(error.response?.headers["content-type"]);
        await httpMetric.stop();

        const originalRequest = error.config;

        if (error.response?.status === 403) {
          await storeData(
            LOCAL_STORAGE_DATA_KEY.UN_AUTORISED_ACCESS,
            JSON.stringify(true)
          );
        }

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest?.url !== "cenomi-one/login"
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Cookie"] = "access_token=" + token;
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const userInfo = await getSaveData(LOCAL_STORAGE_DATA_KEY?.USER_INFO);
            const email = JSON.parse(userInfo || '{}')?.username;

            const newToken = await this.login(email);
            if (newToken) {
              const cookieString = await this.getCookieString();
              originalRequest.headers["Cookie"] = cookieString;
              this.processQueue(null, newToken);
              return this.axiosInstance(originalRequest);
            }
            throw new Error('No access token in response');
          } catch (err) {
            this.processQueue(err, null);
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async login(email: string): Promise<string | null> {
    try {
      const response = await axios.post(
        `${Config.TENANT_CENTRAL_URL}${loginEndpoint}`,
        { email },
        {
          headers: {
            'x-cenomi-one-api-token': Config.TENANT_CENTRAL_TOKEN,
            'Content-Type': 'application/json',
            Cookie: `${Config.TENANT_CENTRAL_COOKIE}`
          }
        }
      );

      if (response.data?.data?.access_token) {
        await this.setCookie('access_token', response.data.data.access_token);
        return response.data.data.access_token;
      }
      return null;
    } catch (error: any) {
      console.error('Tenant login error:', error);
      throw error;
    }
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

const tenantCentralApiInstance =  TenantAuthService.getInstance().getAxiosInstance();

export const tenantCentralApi = async (config: any, isLoading: boolean = true) => {
     const fetchTenantCentralResponse = async (config: any) => {
        console.log("%c %s", "font-weight: bold; color: white; background-color: blue;", "🚀Tenant API Request Config 🚀 ", config);
        return tenantCentralApiInstance(config)
          .then((response) => {
            console.log(response?.config?.curl);

            const { data, config } = response;
            // console.log({ data, config });
            if (__DEV__) {
              const { requestStartTime, requestEndTime } = response.config.metadata;
              const totalTimeInMs = requestEndTime - requestStartTime;
              console.log(
                "%c %s %c %s %c %s",
                "font-weight: bold; color: white; background-color: green;",
                "✨ Tenant Response ✨",
                "font-weight: bold; color: black; background-color: yellow;",
                `Time: ${totalTimeInMs}`,
                "font-weight: bold; color: black; background-color: aqua;",
                `${config.method}: ${config.url} `
              );
            } else {
              console.log("%c ✨ Response Data ✨", "font-weight: bold; color: white; background-color: green;", data);
            }
            if (response?.status === 403 || response?.status === 401) {
              // refreshHandler(response?.status, config)
              return {
                data,
                success: false,
                error: { title: "Error", message: "Authorization Error!" },
              };
            }
            return { success: true, data };
          })
          .catch((error) => {
            console.log(
              "%c %s %c %s",
              "font-weight: bold; color: white; background-color: red;",
              "💀 Tenant API Error 💀",
               "font-weight: bold; color: black; background-color: orange;",
              `${config.method}: ${config.url} `,
            );

            const { data: errorResponse } = error.response || {};
            console.log(
              "error.response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
              errorResponse,
              error
            );

            if (
              errorResponse?.statusCode === 403 ||
              errorResponse?.statusCode === 401
            ) {
              return {
                data: errorResponse,
                success: false,
                error: { title: "Error", message: "Authorization Error!" },
              };
            }
            if (errorResponse?.statusCode === 400) {
              return {
                data: errorResponse,
                success: false,
                error: errorResponse.message,
              };
            }
            if (!errorResponse) {
              return {
                data: {},
                success: false,
                error: {
                  title: "Connectivity Error",
                  message: "Please check your internet connection.",
                },
              };
            }
            return {
              success: false,
              data: errorResponse,
              error: {
                title: "Unexpected Error",
                message: "Server error please try again later",
              },
            };
          });
      }
  if (isLoading) {
    return trackPromise(fetchTenantCentralResponse(config));
  } else {
    return fetchTenantCentralResponse(config);
  }
};

export default TenantAuthService;
