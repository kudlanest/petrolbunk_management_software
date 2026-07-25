import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const circles = [
  { size: 420, top: "-10%", left: "-8%", color: "#2563EB", duration: 18 },
  { size: 320, top: "65%", left: "78%", color: "#38BDF8", duration: 22 },
  { size: 260, top: "15%", left: "82%", color: "#1D4ED8", duration: 20 },
  { size: 220, top: "75%", left: "10%", color: "#60A5FA", duration: 24 },
];

const particles = Array.from({ length: 40 });

export default function RegisterBackground() {
  return (
    <>
      {/* Main Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#08111F 0%,#0B1D35 45%,#111827 100%)",
        }}
      />

      {/* Animated Glow Circles */}
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.15, 1],
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
            background: circle.color,
            filter: "blur(120px)",
            opacity: 0.18,
            top: circle.top,
            left: circle.left,
          }}
        />
      ))}

      {/* Animated Light Rays */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`ray-${index}`}
          animate={{
            opacity: [0.05, 0.18, 0.05],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: 400,
            height: 2,
            background:
              "linear-gradient(90deg,transparent,#38BDF8,transparent)",
            top: `${15 + index * 18}%`,
            left: "-10%",
            transformOrigin: "left center",
            filter: "blur(2px)",
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -120],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            borderRadius: "50%",
            background: "#38BDF8",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Glass Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.02)",
        }}
      />

      {/* Grid Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
}