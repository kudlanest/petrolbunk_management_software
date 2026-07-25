import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarItem({ item, open }) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname === item.path;

  return (
    <Tooltip
      title={!open ? item.title : ""}
      placement="right"
      arrow
    >
      <ListItemButton
        onClick={() => navigate(item.path)}
        sx={{
          mb: 1,
          borderRadius: 3,
          minHeight: 50,
          justifyContent: open ? "initial" : "center",
          px: 2.5,

          background: active
            ? "linear-gradient(90deg,#2563EB,#38BDF8)"
            : "transparent",

          color: active ? "#fff" : "#CBD5E1",

          transition: "0.3s",

          "&:hover": {
            background: active
              ? "linear-gradient(90deg,#2563EB,#38BDF8)"
              : "rgba(255,255,255,0.08)",

            transform: "translateX(4px)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 2 : "auto",
            justifyContent: "center",
            color: active ? "#fff" : "#38BDF8",
          }}
        >
          {item.icon}
        </ListItemIcon>

        {open && (
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontWeight: active ? 700 : 500,
              fontSize: 15,
            }}
          />
        )}
      </ListItemButton>
    </Tooltip>
  );
}