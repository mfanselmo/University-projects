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
  reloadCurrentUserData: () => {},
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
    } else {
      customAxios.interceptors.request.use(
        (config) => {
          config.headers["Content-Type"] = "application/json";

          return config;
        },
        (error) => Promise.reject(error)
      );
    }
  }, [customAxios, currentUser]);

  useEffect(() => {
    if (currentUser) {
      getCurrentUser(axios, currentUser).then((res) => {
        setCurrentUserData(res.data);

        if (res.data && res.data.is_manager && !currentUser.isManager) {
          setCurrentUser((old) => {
            localStorage.setItem("isManager", true);
            return { ...old, isManager: true };
          });
        } else if (res.data && !res.data.is_manager && currentUser.isManager) {
          setCurrentUser((old) => {
            localStorage.setItem("isManager", false);
            return { ...old, isManager: false };
          });
        }
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

  const reloadCurrentUserData = () => {
    if (currentUser) {
      getCurrentUser(axios, currentUser).then((res) => {
        setCurrentUserData(res.data);

        if (res.data && res.data.is_manager && !currentUser.isManager) {
          setCurrentUser((old) => {
            localStorage.setItem("isManager", true);
            return { ...old, isManager: true };
          });
        } else if (res.data && !res.data.is_manager && currentUser.isManager) {
          setCurrentUser((old) => {
            localStorage.setItem("isManager", false);
            return { ...old, isManager: false };
          });
        }
      });
    }
  };

  return (
    <stateContext.Provider
      value={{
        login,
        logout,
        axios: customAxios,
        currentUser: currentUser,
        currentUserData: currentUserData,
        reloadCurrentUserData: reloadCurrentUserData,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
