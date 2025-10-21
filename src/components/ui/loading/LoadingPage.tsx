"use client";

import React from "react";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4 max-w-xs w-full px-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-300 rounded-full animate-spin"></div>
        {/* Optional message */}
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
