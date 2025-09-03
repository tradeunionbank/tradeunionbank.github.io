import React, { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useLoadingSpinner } from "./LoadingSpinnerContext";

function PageWrapper({ children }) {
  const { setIsLoading } = useLoadingSpinner();

  useEffect(() => {
    setIsLoading(true); // Start loading
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 1000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array for initial mount only

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 dark:from-gray-900 dark:to-gray-800">
      <LoadingSpinner />
      {children}
    </div>
  );
}

export default PageWrapper;