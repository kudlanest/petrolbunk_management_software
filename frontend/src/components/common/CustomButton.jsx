import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function CustomButton({
  text = "Submit",
  type = "submit",
  loading = false,
  fullWidth = true,
  startIcon = null,
  endIcon = null,
  color1 = "#2563EB",
  color2 = "#38BDF8",
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Button
        fullWidth={fullWidth}
        type={type}
        disabled={loading}
        startIcon={!loading ? startIcon : null}
        endIcon={!loading ? endIcon : null}
        onClick={onClick}
        sx={{
          mt: 2,
          height: 55,
          borderRadius: "14px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 700,
          color: "#FFFFFF",

          background: `linear-gradient(90deg, ${color1}, ${color2})`,

          boxShadow: `0 8px 25px ${color1}55`,

          transition: "all .35s ease",

          "&:hover": {
            background: `linear-gradient(90deg, ${color2}, ${color1})`,
            boxShadow: `0 12px 35px ${color2}88`,
            transform: "translateY(-2px)",
          },

          "&:disabled": {
            color: "#fff",
            background: "#64748B",
          },
        }}
      >
        {loading ? (
          <CircularProgress
            size={26}
            sx={{
              color: "#FFFFFF",
            }}
          />
        ) : (
          text
        )}
      </Button>
    </motion.div>
  );
}