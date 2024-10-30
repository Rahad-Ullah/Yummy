/* eslint-disable import/order */
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
  withCredentials: true,
});

// Intercept request to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const useRefreshToken = config.headers?.useRefreshToken;

    // Retrieve tokens from cookies
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    // Use refreshToken if need it
    if (useRefreshToken && refreshToken) {
      config.headers.Authorization = `${refreshToken}`;
    }
    // Use accessToken for general requests
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    // Remove custom header property to prevent it from being sent to the server
    delete config.headers.useRefreshToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
