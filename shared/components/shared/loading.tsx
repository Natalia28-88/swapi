import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-transparent border-[#72b3b3] border-solid rounded-full animate-spin"></div>
        <span className="text-lg text-white">Loading...</span>
      </div>
    </div>
  );
};
