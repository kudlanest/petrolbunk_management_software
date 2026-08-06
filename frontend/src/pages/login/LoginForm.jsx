import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {loginUser} from "../../services/auth/authService";

import {SUCCESS_MESSAGES,ERROR_MESSAGES,INFO_MESSAGES} from "../../constants/message";




export default function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //---------------------------------------

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  //---------------------------------------

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //---------------------------------------

  const validate = () => {
    let temp = {};

    if (!form.username.trim()) {
      temp.username = "Username is required";
    }

    if (!form.password.trim()) {
      temp.password = "Password is required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  //---------------------------------------

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);


      const response = await loginUser({
        username: form.username,
        password: form.password,
      });

      const data = response.data;
      console.log("Login Response:", data);




// localStorage.setItem("accessToken", data.accessToken);
// localStorage.setItem("refreshToken", data.refreshToken);
// localStorage.setItem("user", JSON.stringify(data));

// console.log("Access Token:", data.accessToken);
// console.log("Refresh Token:", data.refreshToken);

// console.log(response.data);

      // showSnackbar(response.data, "success");

// Store username temporarily for OTP verification
// localStorage.setItem("loginUsername", form.username);

        setTimeout(() => {
            navigate("/otp-verification", {
    state: {
        from: "login",
        email: response.data.email,
        

    }
});
          }, 1200);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        ERROR_MESSAGES.LOGIN_FAILED;

      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------

  return (
    <Box>

      {/* Username */}

      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          name="username"
          value={form.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "#38BDF8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
            "& fieldset": {
              borderColor: "rgba(255,255,255,.2)",
            },
            "&:hover fieldset": {
              borderColor: "#38BDF8",
            },
          }}
        />
      </motion.div>

      {/* Password */}

      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#38BDF8" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
            "& fieldset": {
              borderColor: "rgba(255,255,255,.2)",
            },
            "&:hover fieldset": {
              borderColor: "#38BDF8",
            },
          }}
        />
      </motion.div>

      {/* Remember */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              sx={{
                color: "#38BDF8",
              }}
            />
          }
          label={
            <Typography color="#CBD5E1">
              Remember Me
            </Typography>
          }
        />

<Typography
  sx={{
    color: "#38BDF8",
    cursor: "pointer",
    fontSize: 14,
  }}
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</Typography>
      </Box>

      {/* Login Button */}

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            mt: 4,
            height: 55,
            borderRadius: "14px",
            background:
              "linear-gradient(90deg,#2563EB,#38BDF8)",
            fontWeight: "bold",
            fontSize: 16,
            textTransform: "none",
            boxShadow:
              "0 10px 25px rgba(37,99,235,.35)",
            "&:hover": {
              background:
                "linear-gradient(90deg,#1D4ED8,#0EA5E9)",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{ color: "white" }}
            />
          ) : (
            "Login"
          )}
        </Button>
      </motion.div>

      {/* Register */}

      <Box textAlign="center" mt={12}>
        <Typography color="#CBD5E1">
          Don't have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#38BDF8",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Register here
          </Typography>
        </Typography>
      </Box>

      {/* Footer */}

      <Typography
        align="center"
        mt={3}
        color="#64748B"
        fontSize={13}
      >
        {INFO_MESSAGES.COPYRIGHT}
      </Typography>

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}