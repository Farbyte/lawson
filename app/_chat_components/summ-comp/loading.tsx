import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex space-x-3 items-center">
        <div className="w-3 h-3 bg-current rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-current rounded-full animate-pulse delay-100"></div>
        <div className="w-3 h-3 bg-current rounded-full animate-pulse delay-200"></div>
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingDots;
