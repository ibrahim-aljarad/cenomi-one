import axios, { AxiosInstance } from "axios";
import CookieManager from "@react-native-cookies/cookies";
import perf from "@react-native-firebase/perf";
import Config from "./config";
import { getSaveData, storeData } from "./helpers";
import { LOCAL_STORAGE_DATA_KEY } from "./constants";
import { trackPromise } from "react-promise-tracker";

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

const ENV_CONFIG = {
  PROD: {
    baseURL: Config.TENANT_CENTRAL_URL,
    token: Config.TENANT_CENTRAL_TOKEN,
    cookie: Config.TENANT_CENTRAL_COOKIE,
  },
  UAT: {
    baseURL: "https://uat.tenantsapi.cenomicenters.com/api/v1",
    token: "a4f134e3-2c09-4be7-89fb-80604fecefcb",
    cookie: 'acaAffinity="762eb4223f921a83"',
  },
};

const UAT_ENDPOINTS = {
  paths: ["/meter-reading", "/service-request"],
  queryParams: [
    {
      service_category: "OPERATIONS",
      sub_category: "METER_READING",
    },
  ],
};

class TenantAuthService {
  private static instance: TenantAuthService;
  private prodAxiosInstance: AxiosInstance;
  private uatAxiosInstance: AxiosInstance;
  private isRefreshing: { [key: string]: boolean } = {
    PROD: false,
    UAT: false,
  };
  private failedQueue: { [key: string]: QueueItem[] } = { PROD: [], UAT: [] };

  private constructor() {
    this.prodAxiosInstance = this.createAxiosInstance("PROD");
    this.uatAxiosInstance = this.createAxiosInstance("UAT");

    this.setupInterceptors(this.prodAxiosInstance, "PROD");
    this.setupInterceptors(this.uatAxiosInstance, "UAT");
  }

  private createAxiosInstance(env: "PROD" | "UAT"): AxiosInstance {
    return axios.create({
      baseURL: ENV_CONFIG[env].baseURL,
      withCredentials: true,
    });
  }

  private shouldUseUAT(url: string): boolean {
    const normalizedUrl = url.startsWith("/") ? url.slice(1) : url;
    const [fullPath, queryString] = normalizedUrl.split("?");

    const pathSegments = fullPath.split("/");

    const pathMatch = UAT_ENDPOINTS.paths.some((uatPath) => {
      const normalizedUatPath = uatPath.startsWith("/")
        ? uatPath.slice(1)
        : uatPath;
      return pathSegments.some(
        (segment) => segment.toLowerCase() === normalizedUatPath.toLowerCase()
      );
    });

    if (pathMatch) return true;

    if (queryString) {
      const queryParams = new URLSearchParams(queryString);

      return UAT_ENDPOINTS.queryParams.some((paramSet) => {
        return Object.entries(paramSet).every(
          ([key, value]) =>
            queryParams.get(key)?.toLowerCase() === value.toLowerCase()
        );
      });
    }

    return false;
  }

  public static getInstance(): TenantAuthService {
    if (!TenantAuthService.instance) {
      TenantAuthService.instance = new TenantAuthService();
    }
    return TenantAuthService.instance;
  }

  private processQueue(
    env: "PROD" | "UAT",
    error: any,
    token: string | null
  ): void {
    this.failedQueue[env].forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });
    this.failedQueue[env] = [];
  }

  private async setCookie(
    name: string,
    value: string,
    env: "PROD" | "UAT"
  ): Promise<void> {
    await CookieManager.set(ENV_CONFIG[env].baseURL as string, {
      name,
      value,
    });
  }

  private async getCookieString(env: "PROD" | "UAT"): Promise<string> {
    const cookies = await CookieManager.get(ENV_CONFIG[env].baseURL as string);
    return Object.entries(cookies)
      .map(([key, val]) => `${key}=${val.value}`)
      .join("; ");
  }

  private setupInterceptors(
    axiosInstance: AxiosInstance,
    env: "PROD" | "UAT"
  ): void {
    axiosInstance.interceptors.request.use(
      async (config) => {
        const httpMetric = perf().newHttpMetric(
          config.url!,
          config.method!.toUpperCase()
        );
        config.metadata = { httpMetric };
        config.metadata.requestStartTime = new Date().getTime();
        await httpMetric.start();

        const cookieString = await this.getCookieString(env);
        config.headers.Cookie = cookieString;

        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
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
        httpMetric.setResponseContentType(
          error.response?.headers["content-type"]
        );
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
          if (this.isRefreshing[env]) {
            return new Promise((resolve, reject) => {
              this.failedQueue[env].push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Cookie"] = "access_token=" + token;
                return axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing[env] = true;

          try {
            const userInfo = await getSaveData(
              LOCAL_STORAGE_DATA_KEY?.USER_INFO
            );
            const email = JSON.parse(userInfo || "{}")?.username;
            const newToken = await this.login(email, env);
            if (newToken) {
              const cookieString = await this.getCookieString(env);
              originalRequest.headers["Cookie"] = cookieString;
              this.processQueue(env, null, newToken);
              return axiosInstance(originalRequest);
            }
            throw new Error("No access token in response");
          } catch (err) {
            this.processQueue(env, err, null);
            return Promise.reject(err);
          } finally {
            this.isRefreshing[env] = false;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async login(
    email: string,
    env: "PROD" | "UAT"
  ): Promise<string | null> {
    try {
      const config = ENV_CONFIG[env];
      const response = await axios.post(
        `${config.baseURL}/cenomi-one/login`,
        { email },
        {
          headers: {
            "x-cenomi-one-api-token": config.token,
            "Content-Type": "application/json",
            Cookie: config.cookie,
          },
        }
      );
      if (response.data?.data?.access_token) {
        await this.setCookie(
          "access_token",
          response.data.data.access_token,
          env
        );
        return response.data.data.access_token;
      }
      return null;
    } catch (error: any) {
      console.error(`Tenant login error (${env}):`, error);
      throw error;
    }
  }

  public getAxiosInstance(url: string): AxiosInstance {
    return this.shouldUseUAT(url)
      ? this.uatAxiosInstance
      : this.prodAxiosInstance;
  }
}

export const tenantCentralApi = async (
  config: any,
  isLoading: boolean = true
) => {
  const axiosInstance = TenantAuthService.getInstance().getAxiosInstance(
    config.url
  );
  const fetchTenantCentralResponse = async (config: any) => {
    console.log(
      "%c %s",
      "font-weight: bold; color: white; background-color: blue;",
      "🚀Tenant API Request Config 🚀 ",
      config
    );
    return axiosInstance(config)
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
          console.log(
            "%c ✨ Response Data ✨",
            "font-weight: bold; color: white; background-color: green;",
            data
          );
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
          `${config.method}: ${config.url} `
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
  };
  if (isLoading) {
    return trackPromise(fetchTenantCentralResponse(config));
  } else {
    return fetchTenantCentralResponse(config);
  }
};

export default TenantAuthService;
