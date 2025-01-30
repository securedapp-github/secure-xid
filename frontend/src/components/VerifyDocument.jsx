import React from 'react';
import { ChevronLeft, UserSquare2, Scan } from 'lucide-react';

const VerifyDocument = ({ onNext, onBack }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Verify your ID document</h2>
          <p className="text-gray-600">We'll use this info to confirm your identity and comply with our legal requirements.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
          <UserSquare2 className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Your photo ID</h3>
            <p className="text-gray-600 text-sm">We accept most common form of ID.</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
          <Scan className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">A quick scan of your face</h3>
            <p className="text-gray-600 text-sm">This is to confirm that you match your ID</p>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full bg-[#0066CC] text-white py-3 px-6 rounded-lg font-medium mt-4"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default VerifyDocument;
