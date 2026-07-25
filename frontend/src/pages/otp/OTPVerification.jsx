import React, { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import OTPBackground from "./OTPBackground";
import OTPInput from "./OTPInput";
import ResendOTP from "./ResendOTP";

import AnimatedCard from "../../components/common/AnimatedCard";
import CustomButton from "../../components/common/CustomButton";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

export default function OTPVerification() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const state = location.state || {};

  const verifyOTP = () => {

    if (otp.length !== 6) {

      alert("Please enter a valid 6-digit OTP");

      return;

    }

    setLoading(true);

    // If called from login flow, expect a tempToken in state and finalize login
    if (state?.from === "login" || state?.tempToken) {
      axios
        .post("/api/auth/verify-otp", {
          otp,
          tempToken: state.tempToken,
        })
        .then((res) => {
          setLoading(false);
          const data = res.data || {};

          // Expect backend to return an auth token after successful OTP
          if (data.authToken) {
            localStorage.setItem("authToken", data.authToken);
          }

          navigate(state.next || "/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          const message = err?.response?.data?.message || "OTP verification failed";
          alert(message);
        });
      return;
    }

    // Registration flow (no state provided)
    setTimeout(() => {
      setLoading(false);
      alert("Registration Successful");
      navigate("/login");
    }, 2000);

  };

  return (

    <Box
      sx={{
        width:"100%",
        minHeight:"100vh",
        position:"relative",
        overflow:"hidden",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:
          "linear-gradient(135deg,#08111F,#0F172A,#0B1D35)",
      }}
    >

      <OTPBackground />

      <AnimatedCard
        width={500}
        delay={0.2}
      >

        <Box
          textAlign="center"
        >

          <motion.div

            initial={{
              scale:0
            }}

            animate={{
              scale:1
            }}

            transition={{
              duration:.6
            }}

          >

            <VerifiedUserRoundedIcon

              sx={{
                fontSize:90,
                color:"#38BDF8",
                filter:"drop-shadow(0 0 15px #38BDF8)"
              }}

            />

          </motion.div>

          <Typography

            variant="h4"

            color="white"

            fontWeight="bold"

            mt={2}

          >

            OTP Verification

          </Typography>

          <Typography

            color="#CBD5E1"

            mt={2}

          >

            An OTP has been sent to the

            <br/>

            Petrol Bunk Owner's Mobile Number

          </Typography>

        </Box>

        <Box mt={5}>

          <OTPInput

            otp={otp}

            setOtp={setOtp}

          />

        </Box>

        <Box mt={4}>

          <CustomButton

            text="Verify OTP"

            loading={loading}

            onClick={verifyOTP}

          />

        </Box>

        <Box mt={4}>

          <ResendOTP />

        </Box>

      </AnimatedCard>

    </Box>

  );

}