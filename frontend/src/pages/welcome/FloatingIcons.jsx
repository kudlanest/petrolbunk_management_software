import React from "react";
import { motion } from "motion/react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import OpacityIcon from "@mui/icons-material/Opacity";

const icons = [
  { Icon: LocalGasStationIcon, top: "10%", left: "8%", size: 40 },
  { Icon: OilBarrelIcon, top: "18%", right: "12%", size: 45 },
  { Icon: LocalShippingIcon, top: "72%", left: "10%", size: 50 },
  { Icon: DirectionsCarIcon, top: "80%", right: "15%", size: 42 },
  { Icon: ReceiptLongIcon, top: "35%", left: "5%", size: 36 },
  { Icon: PaymentsIcon, top: "60%", right: "6%", size: 38 },
  { Icon: SpeedIcon, top: "15%", left: "48%", size: 44 },
  { Icon: SecurityIcon, top: "75%", left: "45%", size: 40 },
  { Icon: SettingsIcon, top: "45%", right: "18%", size: 40 },
  { Icon: OpacityIcon, top: "28%", left: "80%", size: 38 },
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map(({ Icon, size, ...position }, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            zIndex: 2,
            color: "#38BDF8",
            opacity: 0.18,
            ...position,
          }}
          animate={{
            y: [0, -25, 20, 0],
            x: [0, 12, -10, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 0.95, 1],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon
            sx={{
              fontSize: size,
              filter: "drop-shadow(0 0 15px rgba(56,189,248,0.7))",
            }}
          />
        </motion.div>
      ))}
    </>
  );
}