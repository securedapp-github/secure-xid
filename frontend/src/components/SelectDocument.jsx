import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'IN', name: 'India' }
];

const documentTypes = [
  { id: 'passport', name: 'Passport' },
  { id: 'drivers_license', name: 'Driver\'s License' },
  { id: 'national_id', name: 'National ID Card' },
  { id: 'residence_permit', name: 'Residence Permit' }
];

const SelectDocument = ({ onNext }) => {
  const [country, setCountry] = useState('');
  const [documentType, setDocumentType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country && documentType) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-8">
        <button type="button" className="p-2 rounded-full bg-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold">Select type and issuing country and your identity document.</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issuing country<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-200 rounded-lg bg-white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document type<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-200 rounded-lg bg-white"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          >
            <option value="">Select document type</option>
            {documentTypes.map((docType) => (
              <option key={docType.id} value={docType.id}>
                {docType.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#0066CC] text-white py-3 px-6 rounded-lg font-medium"
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default SelectDocument;
