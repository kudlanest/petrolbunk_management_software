import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import SidebarMenu from "./SidebarMenu";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ open, drawerWidth, collapsedWidth,onToggle, }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "all .35s ease",
          overflowX: "hidden",
          background: "#0B172A",
          color: "#fff",
          borderRight: "1px solid rgba(255,255,255,.08)",
          boxSizing: "border-box",
        },
      }}
    >
      {/* Logo Section */}

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
          px: 2,
        }}
      >
        {open && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <LocalGasStationIcon
              sx={{
                color: "#38BDF8",
                fontSize: 34,
              }}
            />

            <Typography
              fontWeight={700}
              fontSize={18}
            >
              Petrol Bunk
            </Typography>
          </Box>
        )}

        <IconButton
         onClick={onToggle}
    sx={{ color: "white" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      {/* Navigation */}

      <List
        sx={{
          mt: 2,
          px: 1,
        }}
      >
        {SidebarMenu.map((item) => (
          <SidebarItem
            key={item.title}
            item={item}
            open={open}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;