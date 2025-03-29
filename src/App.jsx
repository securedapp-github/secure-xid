// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import KycPage from './pages/KycPage';
import DashBoard from './components/DashBoard';
import Loader from './components/Loader';
import AdminDashBoard from "./pages/AdminDashBoard";
import MonitorDashboard from './components/MonitorDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <Routes>
        {/* Public Route (No authentication needed) */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected Routes (Require authentication) */}
        <Route
          path="/kyc"
          element={
            <ProtectedRoute>
              <KycPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoute>
              <MonitorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;