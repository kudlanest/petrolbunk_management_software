import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import OilBarrelRoundedIcon from "@mui/icons-material/OilBarrelRounded";
import OpacityRoundedIcon from "@mui/icons-material/OpacityRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";

const icons = [
  LocalGasStationRoundedIcon,
  LocalShippingRoundedIcon,
  OilBarrelRoundedIcon,
  OpacityRoundedIcon,
  SpeedRoundedIcon,
  PaymentsRoundedIcon,
  SecurityRoundedIcon,
  DirectionsCarRoundedIcon,
];

export default function OTPBackground() {
  return (
    <>
      {/* Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#08111F 0%,#0B1D35 50%,#0F172A 100%)",
        }}
      />

      {/* Glowing Circles */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "#2563EB",
          filter: "blur(140px)",
          opacity: 0.25,
          top: -120,
          left: -120,
        }}
      />

      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#38BDF8",
          filter: "blur(140px)",
          opacity: 0.18,
          bottom: -120,
          right: -120,
        }}
      />

      {/* Floating Icons */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0.15, 0.4, 0.15],
            y: [0, -35, 0],
            rotate: [0, 12, -12, 0],
            x: [0, 25, -25, 0],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          style={{
            position: "absolute",
            top: `${10 + Math.random() * 75}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
        >
          <Icon
            sx={{
              fontSize: 45,
              color: "#38BDF8",
              opacity: 0.3,
              filter: "drop-shadow(0 0 12px #38BDF8)",
            }}
          />
        </motion.div>
      ))}

      {/* Small Animated Particles */}
      {[...Array(30)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#38BDF8",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 12px #38BDF8",
          }}
        />
      ))}
    </>
  );
}