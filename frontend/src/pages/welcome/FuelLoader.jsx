import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function FuelLoader({ progress }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Fuel Tank */}
      <Box
        sx={{
          width: 320,
          height: 70,
          border: "3px solid rgba(255,255,255,.3)",
          borderRadius: "18px",
          position: "relative",
          overflow: "hidden",
          background: "rgba(255,255,255,.05)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 0 35px rgba(37,99,235,.25)",
        }}
      >
        {/* Tank Cap */}
        <Box
          sx={{
            position: "absolute",
            right: -18,
            top: 18,
            width: 18,
            height: 30,
            borderRadius: "0 8px 8px 0",
            background: "rgba(255,255,255,.3)",
          }}
        />

        {/* Fuel Fill */}
        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.4,
          }}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "100%",
            background:
              "linear-gradient(90deg,#2563EB,#38BDF8,#67E8F9)",
            boxShadow: "0 0 25px #38BDF8",
            overflow: "hidden",
          }}
        >
          {/* Moving Wave */}
          <motion.div
            animate={{
              x: [-120, 120],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: -10,
              width: 200,
              height: 90,
              borderRadius: "45%",
              background: "rgba(255,255,255,.25)",
              filter: "blur(4px)",
            }}
          />

          {/* Bubble 1 */}
          <motion.div
            animate={{
              y: [50, 5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              left: "20%",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "white",
            }}
          />

          {/* Bubble 2 */}
          <motion.div
            animate={{
              y: [55, 10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              left: "60%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E0F2FE",
            }}
          />

          {/* Bubble 3 */}
          <motion.div
            animate={{
              y: [60, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              left: "80%",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FFFFFF",
            }}
          />
        </motion.div>
      </Box>

      
    </Box>
  );
}