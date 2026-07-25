import React from "react";
import { Typography, Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

const loadingMessages = [
  "🚀 Initializing System...",
  "🔐 Verifying Security...",
  "🛢️ Connecting Fuel Inventory...",
  "⛽ Loading Petrol Stock...",
  "🚛 Loading Diesel Stock...",
  "👨‍💼 Fetching Employee Records...",
  "📊 Preparing Dashboard...",
  "💳 Initializing Payment Modules...",
  "📈 Generating Reports...",
  "☁️ Synchronizing Data...",
  "✨ Optimizing Performance...",
  "✅ Almost Ready..."
];

export default function LoadingMessages({ progress }) {
  const index = Math.min(
    Math.floor((progress / 100) * loadingMessages.length),
    loadingMessages.length - 1
  );

  return (
    <Box
      sx={{
        height: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            {loadingMessages[index]}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}