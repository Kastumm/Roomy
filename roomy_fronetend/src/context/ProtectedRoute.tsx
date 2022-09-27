import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_URL } from "../constants/constants";
import AuthContext from "./AuthProvider";

const ProtectedRoute = ({ children }: any) => {
  const { auth }: any = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.id) {
    return <Navigate to={LOGIN_URL} replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;