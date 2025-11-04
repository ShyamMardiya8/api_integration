// import Pagination from "../components/Pagination";
import { handleApiError } from "../utility/ApiError";
import { handleApiResponse } from "../utility/ApiResponse";
import { errorHandler, responseHandler } from "../utility/helpers";
import axiosInstance from "./axios";

export const userService = {
  getUserDetails: async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      return handleApiResponse(response);
    } catch (err) {
      handleApiError(err);
    }
  },
  updateUserDetails: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/api/users/${id}`, data);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  searchByName: async (searchQuery, searchQueryValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/search?${searchQuery}=${searchQueryValue}`
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  deleteUserDetails: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/users/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  pagination: async (totalPages, limit) => {
    try {
      const response = await axiosInstance.get(
        `/api/pagination?page=${totalPages}&limit=${limit}`
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
