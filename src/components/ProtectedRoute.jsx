// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated (has authToken in localStorage)
  const isAuthenticated = localStorage.getItem('authToken');

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child components (protected content)
  return children;
};

export default ProtectedRoute;