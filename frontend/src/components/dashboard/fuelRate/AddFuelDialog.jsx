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

export default function AddFuelDialog({
  open,
  onClose,
  units,
  onSave,
  onAddUnit,
}) {
  const [fuelName, setFuelName] = useState("");
  const [unitId, setUnitId] = useState("");

  const handleSave = () => {
    if (!fuelName.trim() || !unitId) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      fuelName,
      unitId,
    });

    setFuelName("");
    setUnitId("");
    onClose();
  };

  const handleCancel = () => {
    setFuelName("");
    setUnitId("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Fuel</DialogTitle>

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
                {unit.unitName}
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
    </Dialog>
  );
}