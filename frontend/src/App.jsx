import React, { useState } from 'react';
import  Layout  from './components/Layout';
import  SelectDocument  from './components/SelectDocument';
import  VerifyDocument  from './components/VerifyDocument';
import  UploadDocument  from './components/UploadDocument';

function App() {
  const [step, setStep] = useState('select');

  const handleNext = () => {
    if (step === 'select') setStep('verify');
    else if (step === 'verify') setStep('upload');
  };

  const handleBack = () => {
    if (step === 'verify') setStep('select');
    else if (step === 'upload') setStep('verify');
  };

  return (
    <Layout>
      {step === 'select' && <SelectDocument onNext={handleNext} />}
      {step === 'verify' && <VerifyDocument onNext={handleNext} onBack={handleBack} />}
      {step === 'upload' && <UploadDocument onBack={handleBack} />}
    </Layout>
  );
}

export default App;
