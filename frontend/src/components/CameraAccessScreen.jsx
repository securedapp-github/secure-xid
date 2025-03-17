import React from 'react';
import { ChevronLeft, Camera, Check } from 'lucide-react';

const CameraAccessScreen = ({ onBack, onNext }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full mb-8">
          <div className="bg-[#0066CC] h-2 w-3/4 rounded-full"></div>
        </div>
        <h1 className="text-3xl font-semibold mb-8">Get your camera ready</h1>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <div className="bg-gray-700 p-8 rounded-full">
          <div className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2">
            <Check className="w-5 h-5" />
            <Camera className="w-5 h-5" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Allow camera access</h2>
          <p className="text-gray-400">
            To continue the verification, we need access to your device's camera.
          </p>
          <p className="text-gray-400">
            When prompted, you need to allow camera access to continue.
          </p>
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

export default CameraAccessScreen;
