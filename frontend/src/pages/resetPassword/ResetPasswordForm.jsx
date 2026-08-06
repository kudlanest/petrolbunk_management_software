import React, { useState } from "react";
// import axios from "axios";
import {
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import AppSnackbar from "../../components/common/AppSnackbar"; //Step 1: Import the AppSnackbar component




import {resetPassword} from "../../services/auth/authService";
import {SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../constants/message";

export default function ResetPasswordForm() {

    const navigate = useNavigate();
    const location = useLocation();

    const { email} = location.state || {};

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

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

    const resetPasswordmethod = async () => {

        if (newPassword !== confirmPassword) {



            setSnackbar({
                open: true,
                message: ERROR_MESSAGES.RESET_PASSWORD_NOT_EQUAL,
                severity: "error",
            });

            return;
        }

        try {

            setLoading(true);


            await resetPassword({
                email,
                newPassword,
            });



            setSnackbar({
                open: true,
                message: SUCCESS_MESSAGES.PASSWORD_RESET,
                severity: "success",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {



            setSnackbar({
                open: true,
                message:
                    error.response?.data?.message ||
                    ERROR_MESSAGES.RESET_PASSWORD_FAILED,
                severity: "error",
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <Paper
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
                Reset Password
            </Typography>

            <TextField
                fullWidth
                type="password"
                label="New Password"
                sx={{ mt: 4 }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                    startAdornment: <Lock sx={{ mr: 1 }} />,
                }}
            />

            <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                sx={{ mt: 3 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                    startAdornment: <Lock sx={{ mr: 1 }} />,
                }}
            />

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 4 }}
                onClick={resetPasswordmethod}
                disabled={loading}
            >
                {loading
                    ? <CircularProgress size={22} color="inherit" />
                    : "Reset Password"}
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