import { useState } from "react";
import { useDispatch } from "react-redux";
import TenantAuthService from "../utils/authService";
import { getSaveData } from "../utils/helpers";
import { LOCAL_STORAGE_DATA_KEY } from "../utils/constants";
import { getTenantLogin } from "../containers/Home/redux/actions";

export const useTenantAuth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userInfo = await getSaveData(LOCAL_STORAGE_DATA_KEY?.USER_INFO);
      const email = JSON.parse(userInfo || "{}")?.username;

      if (!email) {
        throw new Error("No user email found");
      }

      const authService = TenantAuthService.getInstance();
      const prodToken = await authService.login(email, "PROD");
      const uatToken = await authService.login(email, "UAT");

      if (!uatToken) {
        console.error("Failed to get UAT token");
      }

      if (prodToken) {
        dispatch(
          getTenantLogin.success({
            data: { data: { access_token: prodToken } },
          })
        );
      } else {
        throw new Error("Login failed");
      }
    } catch (err: any) {
      setError(err);
      dispatch(getTenantLogin.failure());
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
