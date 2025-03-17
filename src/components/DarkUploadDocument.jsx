import React from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';

const DarkUploadDocument = ({ onBack, onNext }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-8">
         <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full mb-8">
          <div className="bg-[#0066CC] h-2 w-1/3 rounded-full"></div>
        </div>
        <h1 className="text-3xl font-semibold mb-2">Upload your document</h1>
        <p className="text-gray-400">
          Make sure that all the information on the photo is visible and easy to read
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🇮🇳</span>
            <span>Identity document</span>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Front side</p>
                  <p className="text-gray-400 text-sm">Uploaded</p>
                </div>
                <button className="text-gray-400">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Back side</p>
                  <p className="text-gray-400 text-sm">Uploaded</p>
                </div>
                <button className="text-gray-400">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            JPG, PNG, HEIC, or PDF (max 50MB)
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

export default DarkUploadDocument;
