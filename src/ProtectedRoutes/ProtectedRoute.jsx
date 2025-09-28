import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/ContextProvider";
import LoadingPage from "../Components/LoadingPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
