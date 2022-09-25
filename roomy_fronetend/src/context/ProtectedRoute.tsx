import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthProvider";

const ProtectedRoute = ({ children }: any) => {
  const { auth }: any = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.id) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;