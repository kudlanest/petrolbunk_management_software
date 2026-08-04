import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function DeleteFuelDialog({
  open,
  onClose,
  fuels,
  onDelete,
}) {
  const [fuelId, setFuelId] = useState("");

  // State to manage the confirmation dialog for deletion of fuel
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedFuel = fuels.find(
  (fuel) => fuel.id === fuelId
);
const handleDelete = () => {
  if (!fuelId) return;

  setConfirmOpen(true);
};
const confirmDelete = () => {
  onDelete(fuelId);
  setConfirmOpen(false);
};

  useEffect(() => {
    if (!open) {
      setFuelId("");
    }
  }, [open]);



  // console.log("Fuels in DeleteFuelDialog:", fuels);

  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Delete Fuel</DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Select Fuel"
          value={fuelId}
          onChange={(e) => setFuelId(e.target.value)}
        >
          {fuels.map((fuel) => (
            <MenuItem key={fuel.id} value={fuel.id}>
              {fuel.fuelName}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={!fuelId}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
    open={confirmOpen}
    onClose={() => setConfirmOpen(false)}
  >
    <DialogTitle>Confirm Delete</DialogTitle>

    <DialogContent>
      <Typography>
        Are you sure you want to delete
        <strong> "{selectedFuel?.fuelName}"</strong>?
      </Typography>

      <Typography
        color="error"
        sx={{ mt: 2 }}
      >
        This action cannot be undone.
      </Typography>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => setConfirmOpen(false)}>
        Cancel
      </Button>

      <Button
        color="error"
        variant="contained"
        onClick={confirmDelete}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>

    </>
  );
}