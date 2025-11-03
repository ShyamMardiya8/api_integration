import axios from "axios";
import {
  errorHandler,
  requestHandler,
  responseHandler,
} from "../utility/helpers";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config) => requestHandler(config),
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
