import React from "react";
import { motion } from "framer-motion";

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import OpacityIcon from "@mui/icons-material/Opacity";

const icons = [
  {
    icon: <LocalGasStationIcon sx={{ fontSize: 42 }} />,
    top: "10%",
    left: "8%",
    delay: 0,
  },
  {
    icon: <OilBarrelIcon sx={{ fontSize: 44 }} />,
    top: "18%",
    right: "10%",
    delay: 1,
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 46 }} />,
    bottom: "12%",
    left: "12%",
    delay: 2,
  },
  {
    icon: <DirectionsCarIcon sx={{ fontSize: 42 }} />,
    bottom: "18%",
    right: "14%",
    delay: 3,
  },
  {
    icon: <PaymentsIcon sx={{ fontSize: 38 }} />,
    top: "45%",
    left: "5%",
    delay: 4,
  },
  {
    icon: <ReceiptLongIcon sx={{ fontSize: 38 }} />,
    top: "40%",
    right: "6%",
    delay: 5,
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    top: "72%",
    left: "40%",
    delay: 2,
  },
  {
    icon: <SettingsIcon sx={{ fontSize: 42 }} />,
    top: "18%",
    left: "45%",
    delay: 1,
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    top: "70%",
    right: "35%",
    delay: 3,
  },
  {
    icon: <OpacityIcon sx={{ fontSize: 40 }} />,
    top: "55%",
    right: "45%",
    delay: 4,
  },
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map((item, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -30, 15, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            color: "#38BDF8",
            filter: "drop-shadow(0 0 20px rgba(56,189,248,.6))",
            zIndex: 2,
            pointerEvents: "none",
            ...item,
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </>
  );
}