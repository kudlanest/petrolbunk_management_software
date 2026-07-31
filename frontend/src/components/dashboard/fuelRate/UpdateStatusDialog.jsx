import { useState } from "react";

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

export default function UpdateStatusDialog({
  open,
  onClose,
}) {

  const [fuel, setFuel] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const fuelList = [
    "Petrol",
    "Diesel",
    "Engine Oil",
    "Gas",
  ];

  const handleUpdate = () => {

    console.log({
      fuel,
      status,
    });

    alert("Fuel status updated successfully.");

    onClose();
  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
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
              onChange={(e) =>
                setFuel(e.target.value)
              }
            >

              {fuelList.map((item) => (

                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
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