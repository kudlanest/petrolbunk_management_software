import React, { useState } from "react";
import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";

import RegisterBackground from "./RegisterBackground";
import FloatingIcons from "./FloatingIcons";
import RegisterForm from "./RegisterForm";
import SuccessAnimation from "./SuccessAnimation";

export default function Register() {
  const [success, setSuccess] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#08111F,#0B1D35,#0F172A)",
      }}
    >
      {/* Animated Background */}
      <RegisterBackground />

      {/* Floating Petrol Icons */}
      <FloatingIcons />

      {/* Registration Form */}
      <RegisterForm onSuccess={() => setSuccess(true)} />

      {/* Success Animation */}
      <AnimatePresence>
        {success && (
          <SuccessAnimation />
        )}
      </AnimatePresence>
    </Box>
  );
}