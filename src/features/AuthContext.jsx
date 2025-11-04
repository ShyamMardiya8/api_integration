import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { userAuthApis } from "../services/userAuth";
import { userService } from "../services/userService";
const AuthContext = createContext(null);

export const userAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth must be used with authentication");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) setUser(JSON.parse(storeUser));
    setLoading(false);
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await userAuthApis.registerUser(userData);
      if (response.status === 200) {
        alert("registered successfully");
      }
      return response;
    } catch (err) {
      alert(err.message || "Something went's wrong");
      console.log(err);
    }
  };
  const login = async (userData) => {
    try {
      const response = await userAuthApis.loginUser(userData);
      if (response.status === 200) {
        alert("login successfully");
        localStorage.setItem("access", JSON.stringify(response.data.token));
        localStorage.setItem(
          "refresh-token",
          JSON.stringify(response.data.refToken)
        );
      }
      return response;
    } catch (err) {
      alert(err.message || "Something went's wrong");
      console.log(err);
    }
  };

  const updateUserDetails = async (id, data) => {
    try {
      const response = await userService.updateUserDetails(id, data);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const searchByName = async (searchQuery, searchQueryValue) => {
    try {
      const response = await userService.searchByName(
        searchQuery,
        searchQueryValue
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserDetails = async (id) => {
    try {
      const response = await userService.deleteUserDetails(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const groupPagination = async (page, limit) => {
    try {
      const response = await userService.pagination(page, limit);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const value = useMemo(
    () => ({
      user,
      loading,
      registerUser,
      login,
      logout,
      updateUserDetails,
      searchByName,
      groupPagination,
      deleteUserDetails,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
