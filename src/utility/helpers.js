import axios from "axios";
const BASE_URL = "http://localhost:3000";
export const errorHandler = async (error) => {
  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  ) {
    const refresh_token = localStorage.getItem("refresh-token");
    if (!refresh_token) {
      console.warn("No refresh token found. Redirecting to login...");
      localStorage.removeItem("access");
      return Promise.reject(error);
    }
    console.error("Response error :: ", error.response);
    try {
      const refresh_token_url = `${BASE_URL}/api/refresh`;
      const response = await axios.post(refresh_token_url, {
        refresh: refresh_token,
      });

      const newAccesToken = response.data.token;

      localStorage.setItem("access", newAccesToken);

      const originalRequest = error.config;
      originalRequest.headers.Authorization = `${newAccesToken}`;
      return await axios(originalRequest);
    } catch (refreshError) {
      return await Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};

export const responseHandler = (response) => {
  return response;
};

export const requestHandler = (config) => {
  const accessToken = JSON.parse(localStorage.getItem("token"));
  if (accessToken) {
    console.info("🚀 ~ requestHandler ~ accessToken:", accessToken);
    config.headers["Authorization"] = `${accessToken}`;
  }
  return config;
};
