import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { motion } from "framer-motion";

export default function PasswordField({
  label,
  name,
  formik,
  delay = 0,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
        delay,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        type={showPassword ? "text" : "password"}
        label={label}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched[name] &&
          Boolean(formik.errors[name])
        }
        helperText={
          formik.touched[name] &&
          formik.errors[name]
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(10px)",
            color: "#FFFFFF",
            transition: "0.3s",

            "& fieldset": {
              borderColor: "rgba(255,255,255,.15)",
            },

            "&:hover fieldset": {
              borderColor: "#38BDF8",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2563EB",
              borderWidth: "2px",
            },
          },

          "& .MuiInputAdornment-root": {
            color: "#38BDF8",
          },

          "& .MuiInputLabel-root": {
            color: "#CBD5E1",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#38BDF8",
          },

          "& input": {
            color: "#FFFFFF",
          },

          "& .MuiIconButton-root": {
            color: "#38BDF8",
          },
        }}
      />
    </motion.div>
  );
}