import React from "react";

const LoadingDots = () => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <div className="h-3 w-3 animate-pulse rounded-full bg-current"></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-current delay-100"></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-current delay-200"></div>
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingDots;
