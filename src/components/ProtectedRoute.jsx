// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute; 
