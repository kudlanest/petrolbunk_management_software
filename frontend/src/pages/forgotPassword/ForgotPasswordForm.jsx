import React, { useState } from "react";
// import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import AppSnackbar from "../../components/common/AppSnackbar"; //Step 1: Import the AppSnackbar component
import { forgotPassword } from "../../services/auth/authService";

import {SUCCESS_MESSAGES,ERROR_MESSAGES} from "../../constants/message";



export default function ForgotPasswordForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

   const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const handleCloseSnackbar = () => {
  setSnackbar((prev) => ({
    ...prev,
    open: false,
  }));
};

  const handleSubmit = async () => {

    if (!email.trim()) {


      setSnackbar({
        open: true,
        message: "Email is required",
        severity: "error",
      });
      return;
    }

    try {

      setLoading(true);

      // await publicApi.post(
      //   "/auth/forgot-password",
      //   {
      //     email,
      //   }
      // );

      await forgotPassword({
        email,
      });



      setSnackbar({
        open: true,
        message: SUCCESS_MESSAGES.FORGOT_PASSWORD_OTP_SENT,
        severity: "success",
      });

      setTimeout(() => {

        navigate("/otp-verification", {
          state: {
            from: "forgot-password",
            email,
          },
        });

      }, 1000);

    } catch (error) {



      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          ERROR_MESSAGES.FORGOT_PASSWORD_OTP_SENT_FAILED,
        severity: "error",
      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        width: 450,
        p: 5,
        borderRadius: 4,
        background: "rgba(255,255,255,.08)",
        backdropFilter: "blur(20px)",
      }}
    >

      <Typography
        variant="h4"
        color="white"
        textAlign="center"
        fontWeight="bold"
      >
        Forgot Password
      </Typography>

      <Typography
        color="#CBD5E1"
        textAlign="center"
        mt={2}
      >
        Enter your registered email address
      </Typography>

      <TextField
        fullWidth
        label="Email"
        sx={{ mt: 4 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: <Email sx={{ mr: 1 }} />,
        }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 4, height: 50 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          "Send OTP"
        )}
      </Button>

                  <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

    </Paper>

  );

}