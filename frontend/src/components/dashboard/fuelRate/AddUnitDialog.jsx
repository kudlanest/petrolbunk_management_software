import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function AddUnitDialog({
  open,
  onClose,
  onSave,
}) {

  const [unitName, setUnitName] = useState("");

  const handleSave = () => {

    if (!unitName.trim()) {
      alert("Please enter unit name");
      return;
    }

    onSave({
      unitName,
    });

    setUnitName("");

    onClose();
  };

  const handleCancel = () => {

    setUnitName("");

    onClose();

  };

  return (

    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth
      maxWidth="xs"
    >

      <DialogTitle>
        Add New Unit
      </DialogTitle>

      <DialogContent>

        <Box mt={2}>

          <TextField
            fullWidth
            label="Unit Name"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
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