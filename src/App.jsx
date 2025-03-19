import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Remove BrowserRouter import
import AuthPage from './pages/AuthPage';
import KycPage from './pages/KycPage';
import DashBoard from './components/DashBoard';
import Loader from './components/Loader';
import AdminDashBoard from "./pages/AdminDashBoard"
const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Now this will work

  useEffect(() => {
    setLoading(true); // Show loader on route change
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [location]);

  return (
    <>
      {loading && <Loader />} {/* Display loader when loading is true */}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/kyc" element={<KycPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
     
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;