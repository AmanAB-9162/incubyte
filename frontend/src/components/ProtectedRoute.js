import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/api';

function ProtectedRoute({ children }) {
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;