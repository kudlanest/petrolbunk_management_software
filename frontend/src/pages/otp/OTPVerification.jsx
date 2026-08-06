import React, { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
// import axios from "axios";

import OTPBackground from "./OTPBackground";
import OTPInput from "./OTPInput";
import ResendOTP from "./ResendOTP";

import AnimatedCard from "../../components/common/AnimatedCard";
import CustomButton from "../../components/common/CustomButton";
import AppSnackbar from "../../components/common/AppSnackbar"; //Step 1: Import the AppSnackbar component


import { SUCCESS_MESSAGES,ERROR_MESSAGES} from "../../constants/message";


import {verifyRegistration,verifyLogin,verifyForgotPassword} from "../../services/auth/authService";




export default function OTPVerification() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);


  //To Identify the source of OTP verification (register, login, forgot-password, change-password, change-username, change-email)
  const location = useLocation();
  const state = location.state || {};
  const from = state.from || "";
  const email = state.email || "";

 console.log("OTP Verification Page - From:", from, "Email:", email);



  //=================================
  //Step 2: Snackbar state and handler for closing the snackbar
  //SnackBar toast for success and error messages
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





  const verifyOTP = async () => {

    if (otp.length !== 6) {
       
           setSnackbar({
      open: true,
      message:  ERROR_MESSAGES.OTP_LENGTH,
      severity: "error",
    });
        return;
    }

    setLoading(true);

    try {

        switch (from) {

case "register": {



    await verifyRegistration({
        email: email,
        otp: otp,
    });


    //Step 3: Show success snackbar message
    setSnackbar({
      open: true,
      message: SUCCESS_MESSAGES.REGISTER,
      severity: "success",
    });


    setTimeout(() => navigate("/login"), 1000);

    break;
}

            case "login": {
// FIX 1: Assign API response to a variable


          const response = await verifyLogin({
            email,
            otp,
          });

          console.log("Login OTP verification response:", response.data);

          // FIX 2: Store tokens/user details in localStorage if returned
          if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          setSnackbar({
            open: true,
            message: SUCCESS_MESSAGES.LOGIN,
            severity: "success",
          });

          // FIX 3: Brief delay before navigation
          setTimeout(() => navigate("/dashboard"), 1000);
          break;
}
                
                

case "forgot-password": {



    await verifyForgotPassword({
        email,
        otp,
    });

    console.log("Forgot Password OTP verification successful for email:", email);

    setSnackbar({
      open: true,
      message:  SUCCESS_MESSAGES.OTP_VERIFIED,
      severity: "success",
    });

    setTimeout(() => navigate("/reset-password", {
        state: {
            email,
        },
    }), 1000);

    

    break;
}

            case "change-password":
                // Call verify change password API
                break;

            case "change-username":
                // Call verify change username API
                break;

            case "change-email":
                // Call verify change email API
                break;

            default:
                alert("Invalid OTP flow");
        }

    } catch (error) {

        // alert(error.response?.data?.message || "OTP verification failed");
        setSnackbar({
      open: true,
      message: error.response?.data?.message || ERROR_MESSAGES.OTP_VERIFICATION_FAILED,
      severity: "error",
    });

    } finally {

        setLoading(false);

    }
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
    {from === "register" && "Verify Registration"}

    {from === "login" && "Verify Login"}

    {from === "forgot-password" && "Verify Password Reset"}

    {from === "change-password" && "Verify Password Change"}

    {from === "change-username" && "Verify Username Change"}

    {from === "change-email" && "Verify Email Change"}
</Typography>

          <Typography
    color="#CBD5E1"
    mt={2}
    textAlign="center"
>

    {from === "register" &&
        `Enter the OTP sent to ${email}`}


    {from === "login" &&
        `Enter the login OTP sent to ${email}`}

{from === "forgot-password" &&
    `Enter the OTP sent to ${email}`
}

    {from === "change-password" &&
        `Enter the OTP to change your password.`}

    {from === "change-username" &&
        `Enter the OTP to change your username.`}

    {from === "change-email" &&
        `Enter the OTP to change your email.`}

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

            <AppSnackbar
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={handleCloseSnackbar}
/>

    </Box>

  );

}