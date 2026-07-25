import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/welcome/Welcome";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import OTPVerification from "../pages/otp/OTPVerification";


// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verification" element={<OTPVerification />} />

       {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
}