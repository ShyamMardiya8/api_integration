import axios from "axios";
import { LOGIN_USER_URL, REGISTER_USER_URL } from "../utility/endpoints";
import { handleApiResponse } from "../utility/ApiResponse";
import { handleApiError } from "../utility/ApiError";

export const userAuthApis = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post(REGISTER_USER_URL, userData);
      return response;
    } catch (err) {
      console.error(err.message);
    }
  },
  loginUser: async (userData) => {
    try {
      const response = await axios.post(LOGIN_USER_URL, userData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
