import React from 'react';
import { ChevronLeft } from 'lucide-react';
import qr from "../assets/qr.webp"
const Qr = ({ onBack, onNext }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold">Continue verification on your phone</h2>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            To complete your verification, please continue on your mobile device
          </p>
          <div className='justify-items-center'>
          <img className="w-100 h-100" src={qr}></img>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2 max-w-md mx-auto">
            <input
              type="text"
              value="https://www.securedapp.in/vm"
              readOnly
              className="flex-1 bg-transparent text-gray-700 outline-none"
            />
            <button 
              onClick={() => navigator.clipboard.writeText('https://www.securedapp.in/vm')}
              className="bg-[#0066CC] text-white px-4 py-2 rounded-md hover:bg-[#0052a3] transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};
export default Qr;