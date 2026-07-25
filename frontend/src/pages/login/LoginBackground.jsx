import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const circles = [
  {
    size: 500,
    top: "-150px",
    left: "-120px",
    color: "rgba(37,99,235,0.25)",
    duration: 18,
  },
  {
    size: 350,
    top: "10%",
    right: "-120px",
    color: "rgba(56,189,248,0.20)",
    duration: 20,
  },
  {
    size: 300,
    bottom: "-100px",
    left: "20%",
    color: "rgba(96,165,250,0.15)",
    duration: 22,
  },
];

const particles = Array.from({ length: 45 });

export default function LoginBackground() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#08111F 0%,#0F172A 45%,#112240 100%)",
      }}
    >
      {/* Animated Glow Circles */}
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: circle.size,
            height: circle.size,
            borderRadius: "50%",
            filter: "blur(90px)",
            background: circle.color,
            top: circle.top,
            left: circle.left,
            right: circle.right,
            bottom: circle.bottom,
          }}
        />
      ))}

      {/* Light Beam 1 */}
      <motion.div
        animate={{ x: [-500, 1700] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          width: 220,
          height: "130%",
          transform: "rotate(-25deg)",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,.08), transparent)",
          filter: "blur(20px)",
        }}
      />

      {/* Light Beam 2 */}
      <motion.div
        animate={{ x: [1700, -500] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          width: 180,
          height: "120%",
          right: 0,
          transform: "rotate(18deg)",
          background:
            "linear-gradient(to right, transparent, rgba(56,189,248,.08), transparent)",
          filter: "blur(20px)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((_, index) => {
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={index}
            initial={{
              y: "110vh",
              opacity: 0,
            }}
            animate={{
              y: "-20vh",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "#38BDF8",
              boxShadow: "0 0 10px #38BDF8",
            }}
          />
        );
      })}

      {/* Grid Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Center Glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(37,99,235,.12), transparent 70%)",
        }}
      />

      {/* Bottom Glow */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "-250px",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.18), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </Box>
  );
}