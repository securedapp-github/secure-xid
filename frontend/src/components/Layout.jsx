import React from 'react';
import { Shield } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-8">
      <header className="mb-8 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start items-center">
          <span className="text-2xl font-bold">
            SECURE<span className="text-[#00FF85]">X</span>-ID
          </span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome to <br />
              Secure<span className="text-[#00FF85]">X</span>-ID
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">The Future of KYC/AML</h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12">
              Don't risk compliance gaps—streamline verification, detect fraud, and mitigate risk effortlessly. Start securing your business today.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-[#00FF85]" />
              <span className="font-semibold">SecureDapp</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;