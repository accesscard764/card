import React from 'react';

const LoadingTransition: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1E2A78] mb-2">
            Setting up your system...
          </h2>
          <p className="text-gray-600">This will only take a moment</p>
        </div>
        
        <div className="space-y-6">
          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
              <div 
                className="animate-loading-bar shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1E2A78]"
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>Preparing your dashboard</span>
            <span className="text-[#1E2A78]">Please wait...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTransition;