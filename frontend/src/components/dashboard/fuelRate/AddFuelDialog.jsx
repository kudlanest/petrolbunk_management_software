import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

import AppSnackbar from "../../common/AppSnackbar";

export default function AddFuelDialog({
  open,
  onClose,
  units,
  onSave,
  onAddUnit,
}) {
  const [fuelName, setFuelName] = useState("");
  const [unitId, setUnitId] = useState("");

  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const handleCloseSnackbar = () => {
  setSnackbar((prev) => ({
    ...prev,
    open: false,
  }));
};

  // const handleSave = () => {
  //   if (!fuelName.trim() || !unitId) {
  //     setSnackbar({
  //   open: true,
  //   message: "Please fill all fields.",
  //   severity: "error",
  // });
  //     return;
  //   }

  //   onSave({
  //     fuelName,
  //     unitId,
  //   });

  //   setFuelName("");
  //   setUnitId("");
  //   onClose();
  // };


  const handleSave = async () => {
  if (!fuelName.trim() || !unitId) {
    setSnackbar({
      open: true,
      message: "Please fill all fields.",
      severity: "error",
    });
    return;
  }

  try {
    await onSave({
      fuelName,
      unitId,
    });

    setSnackbar({
      open: true,
      message: "Fuel added successfully.",
      severity: "success",
    });

    setFuelName("");
    setUnitId("");

    onClose();
  } catch (error) {
    setSnackbar({
      open: true,
      message: "Failed to add fuel.",
      severity: "error",
    });
  }
};

  const handleCancel = () => {
    setFuelName("");
    setUnitId("");
    onClose();
  };
// console.log("Units:", units);
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle color="black">Add Fuel</DialogTitle>

      <DialogContent>

        <Box mt={2}>

          <TextField
            fullWidth
            label="Fuel Name"
            value={fuelName}
            onChange={(e) => setFuelName(e.target.value)}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Unit"
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
            margin="normal"
          >
            {units.map((unit) => (
              <MenuItem
                key={unit.id}
                value={unit.id}
              >
                {unit.name}
              </MenuItem>
            ))}
          </TextField>

          <Typography
            sx={{
              mt: 1,
              color: "#1976d2",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={onAddUnit}
          >
            + Add New Unit
          </Typography>

        </Box>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleCancel}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>
      <AppSnackbar
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={handleCloseSnackbar}
/>
    </Dialog>
    
  );
}