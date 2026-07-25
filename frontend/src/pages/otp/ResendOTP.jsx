import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import { motion } from "framer-motion";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

export default function ResendOTP() {

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {

    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [seconds]);

  const handleResend = () => {

    console.log("Resending OTP...");

    // Example API
    /*
    axios.post("/api/auth/resend-otp", {
      username: "employeeUsername"
    });
    */

    setSeconds(60);

  };

  return (

    <Box
      textAlign="center"
      mt={2}
    >

      <Typography
        color="#CBD5E1"
        mb={1}
      >
        Didn't receive the OTP?
      </Typography>

      {seconds > 0 ? (

        <motion.div
          key={seconds}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >

          <Typography
            sx={{
              color: "#38BDF8",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Resend in {seconds}s
          </Typography>

        </motion.div>

      ) : (

        <Button
          variant="contained"
          startIcon={<ReplayRoundedIcon />}
          onClick={handleResend}
          sx={{
            mt: 1,
            px: 4,
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            background:
              "linear-gradient(90deg,#2563EB,#38BDF8)",
            boxShadow: "0 0 20px rgba(56,189,248,.4)",

            "&:hover": {
              background:
                "linear-gradient(90deg,#1D4ED8,#0EA5E9)",
            },
          }}
        >
          Resend OTP
        </Button>

      )}

    </Box>

  );

}