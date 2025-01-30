import React from 'react';
import { ChevronLeft, Upload } from 'lucide-react';

const UploadDocument = ({ onBack }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold">Document type</h2>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium mb-4">Identity document</p>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="font-medium mb-1">Front side</p>
              <p className="text-sm text-gray-500">Choose or drag and drop</p>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="font-medium mb-1">Back side</p>
              <p className="text-sm text-gray-500">Choose or drag and drop</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">JPG, PNG, HEIC or PDF (max 50mb)</p>
        </div>

        <button className="w-full bg-[#0066CC] text-white py-3 px-6 rounded-lg font-medium">
          Continue
        </button>
      </div>
    </div>
  );
}

export default UploadDocument;
