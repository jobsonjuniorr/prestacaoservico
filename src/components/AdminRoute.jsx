import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const isAdmin = user && user.email === "admin@local.com"; 

  if (!isAdmin) {

    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;