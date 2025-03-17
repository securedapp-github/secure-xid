import React from 'react';
import { ChevronLeft, Smartphone, Check, X } from 'lucide-react';

const CameraReadyScreen = ({ onBack, onNext }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full mb-8">
          <div className="bg-[#0066CC] h-2 w-2/3 rounded-full"></div>
        </div>
        <h1 className="text-3xl font-semibold mb-8">Get your camera ready</h1>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <div className="bg-gray-900 p-8 rounded-xl w-full">
          <div className="border-2 border-gray-700 rounded-lg p-8 flex justify-center">
            <Smartphone className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Tips</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-[#00FF85]" />
              <span>Find a well-lit place</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-[#00FF85]" />
              <span>Ensure your face is within the frame</span>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-5 h-5 text-red-500" />
              <span>Don't wear hats, glasses, and mask</span>
            </div>
          </div>
          <button className="text-gray-400 text-sm mt-4">View our guidelines</button>
        </div>

        <button 
          onClick={onNext}
          className="w-full bg-[#0066CC] text-white py-4 px-6 rounded-lg font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CameraReadyScreen;
