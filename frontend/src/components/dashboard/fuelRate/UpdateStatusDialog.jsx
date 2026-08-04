import { useState,useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";

import {getAllFuels} from "../../../services/fuelRate/fuelService";

export default function UpdateStatusDialog({
  open,
  onClose,
  onUpdate,
}) {

   const [fuelsList, setFuelsList] = useState([]);
  const [fuel, setFuel] = useState("");

  const [status, setStatus] = useState("ACTIVE");


      useEffect(() => {
      loadFuels();
   
  }, []);

  const loadFuels = async () => {
      try {
          const response = await getAllFuels();
          setFuelsList(response.data);
      } catch (error) {
          console.error(error);
      }
  };


const handleUpdate = async () => {
  if (!fuel) {
    alert("Please select a fuel.");
    return;
  }

  try {
    await onUpdate(fuel, status);

    setFuel("");
    setStatus("ACTIVE");

    onClose();
  } catch (error) {
    console.error(error);
  }
};

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle color="black">
        Update Fuel Status
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <FormControl fullWidth>

            <InputLabel>
              Fuel Type
            </InputLabel>

            <Select
    value={fuel}
    label="Fuel Type"
    onChange={(e) => setFuel(e.target.value)}
>
    {fuelsList.map((item) => (
        <MenuItem
            key={item.id}
            value={item.id}
        >
            {item.fuelName}
        </MenuItem>
    ))}
</Select>

          </FormControl>

          <RadioGroup
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <FormControlLabel
              value="ACTIVE"
              control={<Radio />}
              label="Active"
            />

            <FormControlLabel
              value="INACTIVE"
              control={<Radio />}
              label="Inactive"
            />

          </RadioGroup>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUpdate}
        >
          Update
        </Button>

      </DialogActions>

    </Dialog>

  );
}