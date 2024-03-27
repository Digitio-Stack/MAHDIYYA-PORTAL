import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-40 h-8 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse"></div>
      </div>
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}

export default Loading;
