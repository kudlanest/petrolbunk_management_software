import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/welcome/Welcome";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import OTPVerification from "../pages/otp/OTPVerification";
import DashboardLayoutComponent from "../pages/dashboard/dashboardlayoutcomponent";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verification" element={<OTPVerification />} />

      <Route path="/dashboard" element={<DashboardLayoutComponent />}></Route>
      {/* <Route path="/dashboardscreen" element={<Dashboard />} /> */}

    </Routes>
  );
}