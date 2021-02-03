import { createContext } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../api";

export const stateContext = createContext({
  currentUser: null,
  currentUserData: null,
  login: () => {},
  logout: () => {},
  axios: null,
});

export const StateProvider = ({ children }) => {
  const customAxios = axios.create();

  const [currentUser, setCurrentUser] = useState(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    const authToken = localStorage.getItem("authToken");
    const isManager = localStorage.getItem("isManager") === "true";

    if (phoneNumber && authToken) return { phoneNumber, authToken, isManager };
    return null;
  });
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      customAxios.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = "Token " + currentUser.authToken;
          config.headers["Content-Type"] = "application/json";

          return config;
        },
        (error) => Promise.reject(error)
      );
      customAxios.interceptors.request.use(
        (config) => {
          config.headers["Content-Type"] = "application/json";

          return config;
        },
        (error) => Promise.reject(error)
      );
    } else {
    }
  }, [customAxios, currentUser]);

  useEffect(() => {
    if (currentUser) {
      getCurrentUser(axios, currentUser).then((res) => {
        setCurrentUserData(res.data);
      });
    }
  }, [currentUser]);

  const login = (phoneNumber, authToken, isManager) => {
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("isManager", isManager);
    setCurrentUser({ phoneNumber, authToken, isManager });
  };

  const logout = () => {
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("authToken");
    localStorage.removeItem("isManager");
    setCurrentUser(null);
  };

  return (
    <stateContext.Provider
      value={{
        login,
        logout,
        axios: customAxios,
        currentUser: currentUser,
        currentUserData: currentUserData,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
