import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function UserMenu() {

  const [anchorEl,setAnchorEl]=useState(null);

  const navigate = useNavigate();

  //user name from local storage to display in the menu
  const user = JSON.parse(localStorage.getItem("user"));

  const open=Boolean(anchorEl);

  const handleOpen=(event)=>{
    setAnchorEl(event.currentTarget);
  };

  const handleClose=()=>{
    setAnchorEl(null);
  };

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error(error);
  } finally {
    // Remove stored data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Close menu
    handleClose();

    // Redirect to login
    navigate("/login", { replace: true });
  }
};

  return (
    <>
<Avatar
  onClick={handleOpen}
  sx={{
    bgcolor: "#2563EB",
    cursor: "pointer",
  }}
>
  {user?.fullName?.charAt(0).toUpperCase()}
</Avatar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

<Typography
  px={2}
  py={1}
  fontWeight={700}
>
  {user?.fullName}
</Typography>

<Typography
  px={2}
  pb={1}
  variant="body2"
  color="text.secondary"
>Role:
  {user?.role}
</Typography>

        <Divider/>

        <MenuItem>

          <ListItemIcon>

            <PersonIcon/>

          </ListItemIcon>

          Edit Username

        </MenuItem>

        <MenuItem>

          <ListItemIcon>

            <LockIcon/>

          </ListItemIcon>

          Edit Password

        </MenuItem>

        <Divider/>

       <MenuItem onClick={handleLogout}>

          <ListItemIcon>

            <LogoutIcon color="error"/>

          </ListItemIcon>

          Logout

        </MenuItem>

      </Menu>

    </>
  );

}