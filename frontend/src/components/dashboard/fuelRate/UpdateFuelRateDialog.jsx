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
} from "@mui/material";

export default function UpdateFuelRateDialog({
  open,
  onClose,
  fuelRates,
  onUpdate,
}) {
  const [fuelId, setFuelId] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = () => {
    if (!fuelId || !rate) {
      alert("Please fill all fields.");
      return;
    }

    onUpdate({
      fuelId,
      rate: Number(rate),
    });

    setFuelId("");
    setRate("");

    onClose();
  };

  const handleCancel = () => {
    setFuelId("");
    setRate("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
        }}
      >
        Update Fuel Rate
      </DialogTitle>

      <DialogContent>

        <Box mt={2}>

          {/* Fuel Type */}

          <TextField
            select
            fullWidth
            label="Fuel Type"
            value={fuelId}
            onChange={(e) => setFuelId(e.target.value)}
            margin="normal"
          >
            {fuelRates.map((fuel) => (
              <MenuItem
                key={fuel.id}
                value={fuel.id}
              >
                {fuel.fuelName}
              </MenuItem>
            ))}
          </TextField>

          {/* Rate */}

          <TextField
            fullWidth
            type="number"
            label="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            margin="normal"
          />

        </Box>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Update
        </Button>

      </DialogActions>

    </Dialog>
  );
}