import React from "react";
import { Box, Typography } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export default function Logo() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1.5}
    >
      <LocalGasStationIcon
        sx={{
          color: "#38BDF8",
          fontSize: 40,
        }}
      />

      <Box>
        <Typography
          variant="h6"
          fontWeight={700}
          color="white"
        >
          HP PETROL BUNK
        </Typography>

        <Typography
          variant="caption"
          color="#94A3B8"
        >
          Management System
        </Typography>
      </Box>
    </Box>
  );
}