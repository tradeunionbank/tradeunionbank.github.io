import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const username = localStorage.getItem("currentUser");
    if (!username) return null;
    return getUser(username) || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => JSON.parse(localStorage.getItem("isAuthenticated")) || false);
  const [isPasskeyVerified, setIsPasskeyVerified] = useState(() => JSON.parse(localStorage.getItem("isPasskeyVerified")) || false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("isPasskeyVerified", JSON.stringify(isPasskeyVerified));
  }, [isPasskeyVerified]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser.username);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const login = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsPasskeyVerified(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsPasskeyVerified(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isPasskeyVerified");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isPasskeyVerified,
        login,
        logout,
        setIsPasskeyVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);