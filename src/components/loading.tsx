import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-2.5 h-2.5 bg-primary-blue rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-primary-blue rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-primary-blue rounded-full"></div>
      </div>
    </div>
  );
}

export default Loading;
