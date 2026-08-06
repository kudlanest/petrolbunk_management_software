import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Box, Typography, Avatar } from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import AnimatedBackground from "./AnimatedBackground";
import FloatingIcons from "./FloatingIcons";
import FuelLoader from "./FuelLoader";
import LoadingMessages from "./LoadingMessages";

import {INFO_MESSAGES} from "../../constants/message";

export default function Welcome() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {

    const timer = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            setFinished(true);
            navigate("/login");
          }, 1000);

          return 100;
        }

        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          style={{
            width: "100%",
            minHeight: "100vh",
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg,#08111F,#0B1D35,#0F172A)",
          }}
        >
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Floating Petrol Icons */}
          <FloatingIcons />

          {/* Center Card */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <Box
                sx={{
                  width: 520,
                  backdropFilter: "blur(30px)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: "30px",
                  padding: "45px",
                  textAlign: "center",
                  boxShadow:
                    "0 0 50px rgba(37,99,235,.25)",
                }}
              >
                {/* Logo */}
                <motion.div
                  animate={{
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "auto",
                      bgcolor: "#2563EB",
                      boxShadow:
                        "0 0 40px rgba(56,189,248,.5)",
                    }}
                  >
                    <LocalGasStationIcon
                      sx={{
                        fontSize: 60,
                        color: "white",
                      }}
                    />
                  </Avatar>
                </motion.div>

                <Typography
                  sx={{
                    mt: 4,
                    color: "#CBD5E1",
                    fontWeight: 600,
                    letterSpacing: 6,
                  }}
                >
                  WELCOME TO
                </Typography>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.5,
                  }}
                  style={{
                    marginTop: 20,
                    fontSize: "46px",
                    fontWeight: 800,
                    background:
                      "linear-gradient(90deg,#38BDF8,#2563EB,#FFFFFF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow:
                      "0 0 35px rgba(56,189,248,.6)",
                  }}
                >
                  {INFO_MESSAGES.PETROL_BUNK_NAME}
                </motion.h1>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#94A3B8",
                    fontSize: 18,
                  }}
                >
                 {INFO_MESSAGES.PROJECT_NAME}
                </Typography>

                <Box mt={5}>
                  <FuelLoader progress={progress} />
                </Box>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#38BDF8",
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  {progress}%
                </Typography>

                <Box mt={3}>
                  <LoadingMessages progress={progress} />
                </Box>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}