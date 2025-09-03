import React from "react";
import { FaUniversity } from "react-icons/fa";
import { useLoadingSpinner } from "./LoadingSpinnerContext";

function LoadingSpinner() {
  const { isLoading } = useLoadingSpinner();

  return (
    isLoading && (
      <div className="flex min-h-screen items-center justify-center min-h-screen bg-transparent">
        <div className="relative backdrop-blur-lg bg-white/30 p-6 rounded-xl shadow-lg">
          <FaUniversity className="w-16 h-16 text-white animate-spin" />
        </div>
      </div>
    )
  );
}

export default LoadingSpinner;