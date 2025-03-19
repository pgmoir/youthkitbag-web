import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const authToken = localStorage.getItem('authToken');
  const isloggedin = localStorage.getItem('isloggedin');
  const user = localStorage.getItem('user');
  const auth = isloggedin && authToken && user;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
