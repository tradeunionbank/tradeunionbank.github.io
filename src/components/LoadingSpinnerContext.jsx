import React, { createContext, useContext, useState } from "react";

const LoadingSpinnerContext = createContext();

export function LoadingSpinnerProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingSpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingSpinnerContext.Provider>
  );
}

export const useLoadingSpinner = () => useContext(LoadingSpinnerContext);