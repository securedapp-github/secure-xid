import React, { useState } from 'react';
import Layout from '../components/Layout';
import SelectDocument from '../components/SelectDocument';
import VerifyDocument from '../components/VerifyDocument';
import UploadDocument from '../components/UploadDocument';
import FaceId from "../components/FaceID";

function KycPage() {
  const [step, setStep] = useState('select');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleNext = () => {
    if (step === 'select') setStep('verify');
    else if (step === 'verify') setStep('upload');
    else if (step === 'upload') setStep('camera'); // Show QR component after upload
  };

  const handleBack = () => {
    if (step === 'verify') setStep('select');
    else if (step === 'upload') setStep('verify');
    else if (step === 'camera') setStep('upload'); // Allow going back from QR
  };

  const handleFileUpload = (file, type) => {
    if (type === 'front') {
      setFrontImage(file);
    } else if (type === 'back') {
      setBackImage(file);
    }
  };
  
  return (
    <div>
      <Layout>
        {step === 'select' && <SelectDocument onNext={handleNext} />}
        {step === 'verify' && <VerifyDocument onNext={handleNext} onBack={handleBack} />}
        {step === 'upload' && <UploadDocument onNext={handleNext} onBack={handleBack} onFileUpload={handleFileUpload} />}
        {step === 'camera' && <FaceId onBack={handleBack} frontFile={frontImage} backFile={backImage} />}
      </Layout>
    </div>
  );
}

export default KycPage;
