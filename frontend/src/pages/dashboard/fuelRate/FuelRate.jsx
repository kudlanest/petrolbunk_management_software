import FuelRateGrid from "../../../components/dashboard/fuelRate/FuelRateGrid";

import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HistoryIcon from "@mui/icons-material/History";  
import { useNavigate } from "react-router-dom";

import UpdateFuelRateDialog from "../../../components/dashboard/fuelRate/UpdateFuelRateDialog";
import AddFuelDialog from "../../../components/dashboard/fuelRate/AddFuelDialog";  
import AddUnitDialog from   "../../../components/dashboard/fuelRate/AddUnitDialog";
import UpdateStatusDialog from "../../../components/dashboard/fuelRate/UpdateStatusDialog";

import { hasAnyRole } from "../../../utils/auth";




export default function FuelRate() {

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUnitDialog, setOpenUnitDialog] = useState(false);
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const navigate = useNavigate();

    //To Disable Add Fuel, Update Fuel Rate and Update Status buttons for non-admin and non-manager users
    // const canManageFuel = hasAnyRole("ADMIN", "MANAGER");
 


  const fuelRates = [
    {
      id: 1,
      fuelName: "Petrol",
      rate: 104.50,
      unit: "Litre",
      updatedDate: "30 Jul 2026",
      updatedTime: "10:45 AM",
    },
    {
      id: 2,
      fuelName: "Diesel",
      rate: 94.30,
      unit: "Litre",
      updatedDate: "30 Jul 2026",
      updatedTime: "10:45 AM",
    },
    {
      id: 3,
      fuelName: "Engine Oil",
      rate: 420.00,
      unit: "Litre",
      updatedDate: "30 Jul 2026",
      updatedTime: "10:45 AM",
    },
    {
      id: 4,
      fuelName: "Gas",
      rate: 1120,
      unit: "Cylinder",
      updatedDate: "30 Jul 2026",
      updatedTime: "10:45 AM",
    },
  ];

  const units = [
  { id: 1, unitName: "Litre" },
  { id: 2, unitName: "ml" },
  { id: 3, unitName: "Kg" },
  { id: 4, unitName: "Gram" },
  { id: 5, unitName: "Cylinder" },
];

  return (
    <Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Fuel Rate Management
        </Typography>

        <Box display="flex" gap={2}>
<Button
  variant="outlined"
  startIcon={<AddIcon />}
  onClick={() => setOpenAddDialog(true)}
  // disabled={!canManageFuel}
>
  Add Fuel
</Button>
<Button
  variant="contained"
  startIcon={<EditIcon />}
  onClick={() => setOpenUpdateDialog(true)}
  // disabled={!canManageFuel}
>
  Update Fuel Rate
</Button>

<Button
  variant="contained"
  color="warning"
  startIcon={<SyncAltIcon />}
  onClick={() => setOpenStatusDialog(true)}
  // disabled={!canManageFuel}
>
  Update Status
</Button>


<Button
    variant="contained"
    color="success"
    startIcon={<HistoryIcon />}
    onClick={() => navigate("/dashboard/fuel-rate/history")}
>
    See Rates
</Button>
        </Box>
      </Box>

      <FuelRateGrid fuelRates={fuelRates} />
      <UpdateFuelRateDialog
  open={openUpdateDialog}
  onClose={() => setOpenUpdateDialog(false)}
  fuelRates={fuelRates}
  onUpdate={(data) => {
    console.log(data);

    // Later we'll call the backend API here
    // Example:
    // fuelRateService.updateFuelRate(data);
  }}
/>

<AddFuelDialog
  open={openAddDialog}
  onClose={() => setOpenAddDialog(false)}
  units={units}
onAddUnit={() => setOpenUnitDialog(true)}
  onSave={(data) => {
    console.log(data);

    // Later:
    // api.post("/fuel", data);
  }}
/>

<AddUnitDialog
  open={openUnitDialog}
  onClose={() => setOpenUnitDialog(false)}
  onSave={(data) => {

    console.log(data);

    // Later we'll call backend
    // api.post("/units", data)

  }}
/>
<UpdateStatusDialog
    open={openStatusDialog}
    onClose={() => setOpenStatusDialog(false)}
/>

    </Box>
  );
}