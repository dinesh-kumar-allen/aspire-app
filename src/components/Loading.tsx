import React from "react";

const Loading = () => {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center absolute top-[50%] left-[40%] lg:left-[55%]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
