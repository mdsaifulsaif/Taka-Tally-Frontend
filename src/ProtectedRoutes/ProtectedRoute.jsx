import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/ContextProvider";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>loading..</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
