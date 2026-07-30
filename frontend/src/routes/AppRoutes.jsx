import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/welcome/Welcome";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import OTPVerification from "../pages/otp/OTPVerification";


// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";


//To prevent the user from accessing the pages ,if the user not logged in
import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verification" element={<OTPVerification />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
}