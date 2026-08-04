import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export default function FuelRateCard({ fuel }) {

    // const [fuelRates, setFuelRates] = useState([]);
//     const response = await fuelRateService.getAllFuelRates();
// setFuelRates(response.data);
   

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#0B172A",
        color: "white",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <LocalGasStationIcon sx={{ color: "#38BDF8", fontSize: 30 }} />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {fuel.fuelName}
          </Typography>
        </Box>

        <Typography
          mt={3}
          variant="h4"
          fontWeight={700}
          color="#38BDF8"
        >
          ₹ {fuel.rate}
        </Typography>

        <Typography
          color="#CBD5E1"
          mt={1}
        >
          / {fuel.unit}
        </Typography>

        <Typography
          mt={3}
          fontSize={13}
          color="#94A3B8"
        >
          Last Updated
        </Typography>

        <Typography
          fontSize={14}
          color="white"
        >
          {fuel.updatedDate}
        </Typography>

        <Typography
          fontSize={13}
          color="#CBD5E1"
        >
          {fuel.updatedTime}
        </Typography>
      </CardContent>
    </Card>
  );
}