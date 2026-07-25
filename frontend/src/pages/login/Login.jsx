import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import LoginBackground from "./LoginBackground";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(135deg,#08111F,#0F172A,#112240)",
      }}
    >
      {/* Animated Background */}
      <LoginBackground />

      {/* Login Card */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          p: 2,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 430,
              borderRadius: 6,
              p: 5,
              backdropFilter: "blur(30px)",
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.15)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,.45)",
            }}
          >
            {/* Logo */}

            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  margin: "auto",
                  bgcolor: "#2563EB",
                  boxShadow:
                    "0 0 35px rgba(37,99,235,.5)",
                }}
              >
                <LocalGasStationIcon
                  sx={{
                    fontSize: 45,
                  }}
                />
              </Avatar>
            </motion.div>

            <Typography
              align="center"
              sx={{
                mt: 3,
                color: "#FFFFFF",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              align="center"
              sx={{
                color: "#94A3B8",
                mt: 1,
                mb: 4,
              }}
            >
              Petrol Bunk Management System
            </Typography>

            <LoginForm />
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}