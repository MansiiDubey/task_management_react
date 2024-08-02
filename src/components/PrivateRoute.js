import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" />;
};


export const getToken = () => {
  return localStorage.getItem('token');
};

export const decodeToken = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
};


export const getUsername = () => {
  const decode = decodeToken();
  return decode?.sub
  // console.log('username', decodeToken?.sub)
}




export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  if (!exp) return true;
  return Date.now() >= exp * 1000;
};