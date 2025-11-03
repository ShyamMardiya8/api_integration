import Pagination from "../components/Pagination";
import { handleApiResponse } from "../utility/ApiResponse";
import { errorHandler, responseHandler } from "../utility/helpers";
import axiosInstance from "./axios";

export const userService = {
  getUserDetails: async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      return handleApiResponse(response);
    } catch (err) {
      errorHandler(err);
    }
  },
  updateUserDetails: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/api/users/${id}`, data);
      return handleApiResponse(response);
    } catch (error) {
      errorHandler(error);
    }
  },
  searchByName: async (searchQuery, searchQueryValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/search?${searchQuery}=${searchQueryValue}`
      );
      return handleApiResponse(response);
    } catch (error) {
      errorHandler(error);
    }
  },
  pagination: async (totalPages, limit) => {
    try {
      const response = await axiosInstance.get(
        `/api/pagination?page=${totalPages}&limit=${limit}`
      );
      return handleApiResponse(response);
    } catch (error) {
      errorHandler(error);
    }
  },
};
