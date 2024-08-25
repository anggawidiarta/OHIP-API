import { ENV_VARS } from "@/config/constants";
import { useTokenStore } from "@/stores/token-store";
import axios from "axios";

export const getToken = async () => {
  const tokenStore = useTokenStore();
  try {
    const response = await axios({
      url: "http://localhost:5173/api/oauth/v1/tokens",
      method: "POST",
      data: {
        username: ENV_VARS.VITE_USERNAME,
        password: ENV_VARS.VITE_PASSWORD,
        grant_type: "password",
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        "x-app-key": ENV_VARS.VITE_APP_KEY,
        Authorization: `Basic ${btoa(
          `${ENV_VARS.VITE_CLIENT_ID}:${ENV_VARS.VITE_CLIENT_SECRET}`
        )}`,
      },
    });
    tokenStore.token = response.data;
  } catch (error) {
    console.log(error);
  }
};
