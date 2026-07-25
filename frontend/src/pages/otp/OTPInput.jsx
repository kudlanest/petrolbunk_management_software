import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";
import { motion } from "framer-motion";

export default function OTPInput({ otp, setOtp }) {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Allow only digits
    if (!/^\d?$/.test(value)) return;

    const otpArray = otp.split("");

    otpArray[index] = value;

    const newOTP = otpArray.join("");

    setOtp(newOTP);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }

    // Left Arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    // Right Arrow
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    setOtp(pasted);

    const nextIndex = Math.min(pasted.length - 1, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={2}
      onPaste={handlePaste}
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.08,
          }}
        >
          <TextField
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={otp[index] || ""}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e) =>
              handleKeyDown(index, e)
            }
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "bold",
                color: "#FFFFFF",
              },
            }}
            sx={{
              width: 60,

              "& .MuiOutlinedInput-root": {
                height: 60,
                borderRadius: "14px",
                background: "rgba(255,255,255,.08)",
                backdropFilter: "blur(12px)",

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.2)",
                },

                "&:hover fieldset": {
                  borderColor: "#38BDF8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#2563EB",
                  borderWidth: "2px",
                },
              },
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
}