import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => JSON.parse(localStorage.getItem("isAuthenticated")) || false);
  const [isPasskeyVerified, setIsPasskeyVerified] = useState(() => JSON.parse(localStorage.getItem("isPasskeyVerified")) || false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("isPasskeyVerified", JSON.stringify(isPasskeyVerified));
  }, [isPasskeyVerified]);

  const logout = () => {
    setIsAuthenticated(false);
    setIsPasskeyVerified(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isPasskeyVerified");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isPasskeyVerified, setIsAuthenticated, setIsPasskeyVerified, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);