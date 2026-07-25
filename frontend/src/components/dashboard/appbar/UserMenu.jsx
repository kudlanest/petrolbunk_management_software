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

export default function UserMenu() {

  const [anchorEl,setAnchorEl]=useState(null);

  const open=Boolean(anchorEl);

  const handleOpen=(event)=>{
    setAnchorEl(event.currentTarget);
  };

  const handleClose=()=>{
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        onClick={handleOpen}
        sx={{
          bgcolor:"#2563EB",
          cursor:"pointer"
        }}
      >
        A
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
          Admin
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

        <MenuItem>

          <ListItemIcon>

            <LogoutIcon color="error"/>

          </ListItemIcon>

          Logout

        </MenuItem>

      </Menu>

    </>
  );

}