import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/welcome/Welcome";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import OTPVerification from "../pages/otp/OTPVerification";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";


// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";
import FuelRate from "../pages/dashboard/fuelRate/FuelRate";
import FuelRateHistory from "../components/dashboard/fuelRate/FuelRateHistory";


//To prevent the user from accessing the pages ,if the user not logged in
import ProtectedRoute from "./ProtectedRoute";




export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verification" element={<OTPVerification />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
    path="/reset-password"
    element={<ResetPassword />}
/>

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="fuel-rate" element={<FuelRate />} />
        <Route
          path="fuel-rate/history"
          element={<FuelRateHistory />}
        />
      </Route>

    </Routes>
  );
}