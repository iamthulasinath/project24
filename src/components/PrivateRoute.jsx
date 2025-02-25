import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const PrivateRoute = ({ children }) => {
  const { user } = useStore();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};