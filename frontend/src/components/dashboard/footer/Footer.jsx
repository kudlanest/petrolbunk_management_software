import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: 60,
        // display: "flex",
        display: "start",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        bgcolor: "#0B172A",
        borderTop: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Typography
        variant="body2"
        color="#CBD5E1"
      >
        Designed & Developed by{" "}
        <Typography
          component="span"
          sx={{
            color: "#38BDF8",
            fontWeight: 700,
          }}
        >
          Kudlanest
        </Typography>
      </Typography>

      <Typography
        variant="body2"
        color="#94A3B8"
      >
        © HP Petrol Bunk 2026. All Rights Reserved.
      </Typography>
    </Box>
  );
}