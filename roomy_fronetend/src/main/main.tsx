import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DASHBOARD_URL } from "../constants/constants";
import ProtectedRoute from "../context/ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Schedule from "../pages/schedule/Schedule";
import AuthContext from "../context/AuthProvider";
import Signup from "../pages/auth/Signup";
import Rooms from "../pages/rooms/Rooms";
import Login from "../pages/auth/Login";


const Main = () => {
  const {auth}:any = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/" element={<Navigate to={DASHBOARD_URL}/>}/>
      <Route path="/login" element={(auth?.id)?<Navigate to={DASHBOARD_URL}/>:<Login/>} />
      <Route path="/signup" element={(auth?.id)?<Navigate to={DASHBOARD_URL}/>:<Signup/>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><Schedule/></ProtectedRoute>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default Main;