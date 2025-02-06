import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage"; // Login & Signup Page
import SelectDocument from "./components/SelectDocument";
import VerifyDocument from "./components/VerifyDocument";
import UploadDocument from "./components/UploadDocument";
import Layout from "./components/Layout";
import KycPage from "./pages/KycPage";
import DashBoard from "./components/DashBoard";
import DarkUploadDocument from "./components/DarkUploadDocument";
import CameraAccessScreen from "./components/CameraAccessScreen";
import CameraReadyScreen from "./components/CameraReadyScreen";
const App = () => {
  return (
    <Router>
    
      <Routes>
        {/* Authentication Page */}
        <Route path="/" element={<AuthPage />} />

        {/* KYC Process (Protected Routes after login) */}
      
        <Route path="/kyc" element={<KycPage />} />
        <Route path="/dashboard" element={<DashBoard />} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
