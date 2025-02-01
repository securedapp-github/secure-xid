import React, { useState } from 'react';
import  Layout  from './components/Layout';
import  SelectDocument  from './components/SelectDocument';
import  VerifyDocument  from './components/VerifyDocument';
import  UploadDocument  from './components/UploadDocument';
import CameraAccessScreen from './components/CameraAccessScreen';
import CameraReadyScreen from './components/CameraReadyScreen';
import VerificationComplete from './components/VerificationComplete';
import DarkUploadDocument from './components/DarkUploadDocument';

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
    <div>
       <Layout>
         {step === 'select' && <SelectDocument onNext={handleNext} />}
         {step === 'verify' && <VerifyDocument onNext={handleNext} onBack={handleBack} />}
         {step === 'upload' && <UploadDocument onBack={handleBack} />}
       </Layout>
    <div>
    <CameraAccessScreen />
    <CameraReadyScreen />
    <VerificationComplete />
    <DarkUploadDocument />
</div>

</div>
  );
}

export default App;
