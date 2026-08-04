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

export default function AddFuelRateDialog({
  open,
  onClose,
  fuels,
  onSave,
}) {
  const [fuelId, setFuelId] = useState("");
  const [rate, setRate] = useState("");

  const handleSave = () => {
    if (!fuelId || !rate) {
      alert("Please fill all fields.");
      return;
    }

    onSave({
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

//   console.log("Fuels in AddFuelRateDialog:", fuels);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{ fontWeight: "bold" }}
        color="black"
      >
        Add Fuel Rate
      </DialogTitle>

      <DialogContent>
        <Box mt={2}>
          <TextField
            select
            fullWidth
            label="Fuel Type"
            value={fuelId}
            onChange={(e) => setFuelId(e.target.value)}
            margin="normal"
          >
            {fuels.map((fuel) => (
              <MenuItem
                key={fuel.id}
                value={fuel.id}
              >
                {fuel.fuelName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Initial Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            margin="normal"
            inputProps={{
              min: 0,
              step: "0.01",
            }}
          />
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