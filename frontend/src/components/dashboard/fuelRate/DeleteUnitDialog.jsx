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
    units,
    onDelete,
}) {
    const [unitId, setunitId] = useState("");

    // State to manage the confirmation dialog for deletion of fuel
    const [confirmOpen, setConfirmOpen] = useState(false);
    const selectedUnit = units.find(
        (unit) => unit.id === unitId
    );
    const handleDelete = () => {
        if (!unitId) return;

        setConfirmOpen(true);
    };
    const confirmDelete = () => {
        onDelete(unitId);
        setConfirmOpen(false);
    };

    useEffect(() => {
        if (!open) {
            setunitId("");
        }
    }, [open]);

    //   const handleDelete = () => {
    //     if (!unitId) return;

    //     onDelete(unitId);
    //   };

    //   console.log("units in DeleteFuelDialog:", units);

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Delete Unit</DialogTitle>

                <DialogContent>
                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Select Unit"
                        value={unitId}
                        onChange={(e) => setunitId(e.target.value)}
                    >
                        {units.map((unit) => (
                            <MenuItem key={unit.id} value={unit.id}>
                                {unit.name}
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
                        disabled={!unitId}
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
                        <strong> "{selectedUnit?.name}"</strong>?
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