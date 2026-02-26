import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple protected route wrapper. Expects an auth token in localStorage and an optional role check.
export default function ProtectedRoute({ children, roles = [] }) {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
