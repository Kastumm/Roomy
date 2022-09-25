import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../context/ProtectedRoute";
import AuthContext from "../context/AuthProvider";
import Dashboard from "../pages/dashboard/Dashboard";
import Schedule from "../pages/schedule/Schedule";
import Signup from "../pages/auth/Signup";
import Rooms from "../pages/rooms/Rooms";
import Login from "../pages/auth/Login";


const Main = () => {
  const {auth}:any = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/dashboard'/>}/>
      <Route path="/login" element={(auth?.id)?<Navigate to="/dashboard"/>:<Login/>} />
      <Route path="/signup" element={(auth?.id)?<Navigate to="/dashboard"/>:<Signup/>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><Schedule/></ProtectedRoute>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default Main;