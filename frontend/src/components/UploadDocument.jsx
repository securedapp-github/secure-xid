import React, { useState } from 'react';
import { ChevronLeft, Upload } from 'lucide-react';

const UploadDocument = ({ onBack, onNext, onFileUpload }) => {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
 
  // Handle front file change
  const handleFrontFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFrontFile(file);
      onFileUpload(file, 'front');  // Correct: Only passing the file and type
      // Pass the file to parent
    }
  };

  // Handle back file change
  const handleBackFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setBackFile(file);
      onFileUpload(file, 'back');  // Pass the file to parent
    }
  };

  // Check if both files are uploaded
  React.useEffect(() => {
    if (frontFile && backFile) {
      setIsFileUploaded(true);
    } else {
      setIsFileUploaded(false);
    }
  }, [frontFile, backFile]);

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold">Document type</h2>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium mb-4">Identity document</p>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="flex justify-center mb-4">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="font-medium mb-1 text-sm sm:text-base">Front side</p>
              <p className="text-xs sm:text-sm text-gray-500">Choose or drag and drop</p>
              {/* File input for Front side */}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFrontFileChange}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="flex justify-center mb-4">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="font-medium mb-1 text-sm sm:text-base">Back side</p>
              <p className="text-xs sm:text-sm text-gray-500">Choose or drag and drop</p>
              {/* File input for Back side */}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleBackFileChange}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-4">JPG, PNG, HEIC or PDF (max 50mb)</p>
        </div>

        {/* Disable Continue button if both files are not uploaded */}
        <button 
          onClick={onNext}  // Proceed to next step if both files are uploaded
          className={`w-full bg-[#0066CC] text-white py-2 sm:py-3 px-6 rounded-lg font-medium ${isFileUploaded ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFileUploaded}  // Disable button if files are not uploaded
        >
          Continue
        </button>
       
      </div>
      
    </div>
  );
}

export default UploadDocument;
