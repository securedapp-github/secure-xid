import React from 'react';
import { Check } from 'lucide-react';

const VerificationComplete = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="rounded-full border-2 border-[#00FF85] p-4">
            <Check className="w-8 h-8 text-[#00FF85]" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold">
          Your profile has been verified
        </h1>
      </div>
    </div>
  );
};

export default VerificationComplete;
