import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem("rahmah_admin_auth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};
