import React from "react";
import {
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";

export default function CustomTextField({
  label,
  name,
  type = "text",
  placeholder = "",
  icon,
  formik,
  delay = 0,
  multiline = false,
  rows = 1,
  disabled = false,
}) {
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
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
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
          startAdornment: icon && (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            background: "rgba(255,255,255,0.08)",
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

          "& .MuiInputLabel-root": {
            color: "#CBD5E1",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#38BDF8",
          },

          "& input": {
            color: "#FFFFFF",
          },

          "& textarea": {
            color: "#FFFFFF",
          },

          "& .MuiInputAdornment-root": {
            color: "#38BDF8",
          },

          "& .MuiFormHelperText-root": {
            marginLeft: "2px",
          },
        }}
      />
    </motion.div>
  );
}