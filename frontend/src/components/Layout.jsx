import React from 'react';
import { Shield } from 'lucide-react';


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
    <header className="mb-8">
      <div className="flex items-center">
        <span className="text-2xl font-bold">
          SECURE<span className="text-[#00FF85]">X</span>-ID
        </span>
      </div>
    </header>
    <main className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-12 flex gap-24">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <br />
            Secure<span className="text-[#00FF85]">X</span>-ID
          </h1>
          <h2 className="text-3xl font-bold mb-6">The Future of KYC/AML</h2>
          <p className="text-gray-600 text-lg mb-12">
            Don't risk compliance gaps—streamline verification, detect fraud, and mitigate risk effortlessly. Start securing your business today.
          </p>
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#00FF85]" />
            <span className="font-semibold">SecureDapp</span>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  </div>
  )
}

export default Layout
