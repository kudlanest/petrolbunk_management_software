import React from "react";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  width = 650,
  padding = 5,
  delay = 0,
  blur = 25,
}) {
  return (
    <Paper
      component={motion.div}
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      elevation={0}
      sx={{
        width: {
          xs: "95%",
          sm: width,
        },

        p: padding,

        borderRadius: "24px",

        backdropFilter: `blur(${blur}px)`,

        background: "rgba(255,255,255,0.08)",

        border: "1px solid rgba(255,255,255,0.12)",

        boxShadow: "0 0 50px rgba(37,99,235,.25)",

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* Glow Effect */}
      <motion.div
        animate={{
          x: [-150, 350],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "100%",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,.15), transparent)",
          transform: "skewX(-25deg)",
          pointerEvents: "none",
        }}
      />

      {children}
    </Paper>
  );
}