import React from "react";
import { motion } from "motion/react";
import { Box } from "@mui/material";

const circles = [
  {
    size: 450,
    top: "-120px",
    left: "-100px",
    color: "rgba(37,99,235,0.25)",
    duration: 18,
  },
  {
    size: 350,
    bottom: "-100px",
    right: "-80px",
    color: "rgba(56,189,248,0.20)",
    duration: 22,
  },
  {
    size: 280,
    top: "30%",
    left: "65%",
    color: "rgba(59,130,246,0.15)",
    duration: 20,
  },
];

const particles = Array.from({ length: 35 });

export default function AnimatedBackground() {
  return (
    <>
      {/* Background Gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#08111F 0%,#0F172A 45%,#0B1D35 100%)",
        }}
      >
        {/* Animated Blurred Circles */}
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -40, 20, 0],
              x: [0, 30, -20, 0],
              scale: [1, 1.08, 0.95, 1],
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
              bottom: circle.bottom,
              right: circle.right,
            }}
          />
        ))}

        {/* Moving Light Beam 1 */}
        <motion.div
          animate={{
            x: [-300, 1400],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: 250,
            height: "120%",
            transform: "rotate(-20deg)",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
            filter: "blur(25px)",
          }}
        />

        {/* Moving Light Beam 2 */}
        <motion.div
          animate={{
            x: [1600, -300],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: 200,
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
          const size = Math.random() * 5 + 2;
          const left = Math.random() * 100;
          const duration = Math.random() * 15 + 10;
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
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.4,
          }}
        />

        {/* Radial Glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(37,99,235,0.12), transparent 70%)",
          }}
        />
      </Box>
    </>
  );
}