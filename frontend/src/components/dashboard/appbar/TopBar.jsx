import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Logo from "./Logo";
import Clock from "./Clock";
import UserMenu from "./UserMenu";

export default function TopBar({
  open,
  drawerWidth,
  collapsedWidth,
  onMenuClick,
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          md: `calc(100% - ${
            open ? drawerWidth : collapsedWidth
          }px)`,
        },

        ml: {
          md: `${open ? drawerWidth : collapsedWidth}px`,
        },

        background: "rgba(8,17,31,.85)",

        backdropFilter: "blur(20px)",

        borderBottom: "1px solid rgba(255,255,255,.08)",

        transition: "all .3s ease",
      }}
    >
      <Toolbar>

        

        {/* Logo */}

        <Logo />

        {/* Center */}

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            color="white"
          >
            Welcome To HP Petrol Bunk
          </Typography>
        </Box>

        {/* Right Side */}

        <Box
          display="flex"
          alignItems="center"
          gap={3}
        >
          <Clock />

          <UserMenu />
        </Box>

      </Toolbar>
    </AppBar>
  );
}