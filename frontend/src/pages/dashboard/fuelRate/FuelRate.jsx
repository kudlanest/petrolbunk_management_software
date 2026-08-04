import FuelRateGrid from "../../../components/dashboard/fuelRate/FuelRateGrid";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HistoryIcon from "@mui/icons-material/History";

import { useNavigate } from "react-router-dom";

import AppSnackbar from "../../../components/common/AppSnackbar";

import UpdateFuelRateDialog from "../../../components/dashboard/fuelRate/UpdateFuelRateDialog";
import AddFuelDialog from "../../../components/dashboard/fuelRate/AddFuelDialog";
import DeleteFuelDialog from "../../../components/dashboard/fuelRate/DeleteFuelDialog";
import AddFuelRateDialog from "../../../components/dashboard/fuelRate/AddFuelRateDialog";
import AddUnitDialog from "../../../components/dashboard/fuelRate/AddUnitDialog";
import DeleteUnitDialog from "../../../components/dashboard/fuelRate/DeleteUnitDialog";
import UpdateStatusDialog from "../../../components/dashboard/fuelRate/UpdateStatusDialog";


import { hasAnyRole } from "../../../utils/auth";

import { getFuelRates } from "../../../services/fuelRate/fuelRateService";
import { getAllFuels } from "../../../services/fuelRate/fuelService";
import { getAllUnits } from "../../../services/fuelRate/unitService";
import { addFuel } from "../../../services/fuelRate/fuelService";
import { deleteFuel } from "../../../services/fuelRate/fuelService";
import { addUnit } from "../../../services/fuelRate/unitService";
import { deleteUnit } from "../../../services/fuelRate/unitService";
import { createFuelRate } from "../../../services/fuelRate/fuelRateService";
import { updateFuelRate } from "../../../services/fuelRate/fuelRateService";
import { updateFuelStatus } from "../../../services/fuelRate/fuelService";



export default function FuelRate() {

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddRateDialog, setOpenAddRateDialog] = useState(false);
  const [openUnitDialog, setOpenUnitDialog] = useState(false);
  const [openDeleteUnitDialog, setOpenDeleteUnitDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const navigate = useNavigate();

  //To Disable Add Fuel, Update Fuel Rate and Update Status buttons for non-admin and non-manager users
  const canManageFuel = hasAnyRole("CASHIER", "ATTENDANT");

  const [fuels, setFuels] = useState([]);
  const [fuelRates, setFuelRates] = useState([]);
  const [units, setUnits] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  

  useEffect(() => {
    loadFuelRates();
    loadUnits();
    loadFuels();
  }, []);

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

  const loadFuelRates = async () => {
    try {
      const response = await getFuelRates();
      setFuelRates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFuels = async () => {
    try {
      const response = await getAllFuels();
      setFuels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUnits = async () => {
    try {
      const response = await getAllUnits();
      setUnits(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const activeFuelRates = fuelRates.filter(
    (fuel) => fuel.status === "ACTIVE"
  );

  // console.log("Active Fuel Rates:", activeFuelRates);
  // console.log("All Fuel Rates:", fuelRates);

  // const user = JSON.parse(localStorage.getItem("user"));

  // console.log("User:", user);
  // console.log("Role:", user?.role);
  // console.log("canManageFuel:", canManageFuel);



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
            disabled={canManageFuel}
          >
            Add Fuel
          </Button>

          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteDialog(true)}
            disabled={canManageFuel}
          >
            Delete Fuel
          </Button>
          <Button
  color="error"
  variant="outlined"
  startIcon={<DeleteSweepIcon />}
  onClick={() => setOpenDeleteUnitDialog(true)}
  disabled={canManageFuel}
>
  Delete Unit
</Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddRateDialog(true)}
            disabled={canManageFuel}
          >
            Add Fuel Rate
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpenUpdateDialog(true)}
            disabled={canManageFuel}
          >
            Update Fuel Rate
          </Button>

          <Button
            variant="contained"
            color="warning"
            startIcon={<SyncAltIcon />}
            onClick={() => setOpenStatusDialog(true)}
            disabled={canManageFuel}
          >
            Update Status
          </Button>


          <Button
            variant="contained"
            color="success"
            startIcon={<HistoryIcon />}
            onClick={() => navigate("/dashboard/fuel-rate/history")}
          >
            See Rates Update History
          </Button>
        </Box>
      </Box>

      <FuelRateGrid fuelRates={activeFuelRates} />

      <AddFuelRateDialog
        open={openAddRateDialog}
        onClose={() => setOpenAddRateDialog(false)}
        fuels={fuels}
        onSave={async (data) => {
          try {
            await createFuelRate({
              ...data,
              updatedBy: user.role,
            });

            await loadFuelRates();

            setOpenAddRateDialog(false);

            setSnackbar({
              open: true,
              message: "Fuel rate added successfully.",
              severity: "success",
            });

          } catch (error) {
            setSnackbar({
              open: true,
              message:
                error.response?.data?.message ||
                error.response?.data ||
                "Something went wrong.",
              severity: "error",
            });
          }
        }}
      />

      <UpdateFuelRateDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        fuelRates={fuelRates}
        onUpdate={async (data) => {
          try {
            await updateFuelRate(data);

            loadFuelRates();

            setOpenUpdateDialog(false);

            setSnackbar({
              open: true,
              message: "Fuel rate updated successfully.",
              severity: "success",
            });

          } catch (error) {
            console.error(error);

            setSnackbar({
              open: true,
              message:
                error.response?.data?.message ||
                "Failed to update fuel rate.",
              severity: "error",
            });
          }
        }}
      />

      <AddFuelDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        units={units}
        onAddUnit={() => setOpenUnitDialog(true)}
        onSave={async (data) => {
          try {
            await addFuel(data);

            await loadFuels();
            await loadFuelRates();

            setOpenAddDialog(false);

            setSnackbar({
              open: true,
              message: "Fuel added successfully.",
              severity: "success",
            });

          } catch (error) {
            console.error(error);

            setSnackbar({
              open: true,
              message:
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to add fuel.",
              severity: "error",
            });
          }
        }}
      />

      <DeleteFuelDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fuels={fuels}
        onDelete={async (fuelId) => {
          try {
            await deleteFuel(fuelId);

            await loadFuels();
            await loadFuelRates();

            setOpenDeleteDialog(false);

            setSnackbar({
              open: true,
              severity: "success",
              message: "Fuel deleted successfully.",
            });

          } catch (error) {
            setSnackbar({
              open: true,
              severity: "error",
              message:
                error.response?.data?.message ||
                "Failed to delete fuel.",
            });
          }
        }}
      />

      

      <AddUnitDialog
        open={openUnitDialog}
        onClose={() => setOpenUnitDialog(false)}
        onSave={async (data) => {
          try {
            await addUnit(data);

            await loadUnits();

            setOpenUnitDialog(false);

            setSnackbar({
              open: true,
              message: "Unit added successfully.",
              severity: "success",
            });

          } catch (error) {
            console.error(error);

            setSnackbar({
              open: true,
              message:
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to add unit.",
              severity: "error",
            });
          }
        }}
      />

      <DeleteUnitDialog
  open={openDeleteUnitDialog}
  onClose={() => setOpenDeleteUnitDialog(false)}
  units={units}
  onDelete={async (unitId) => {
    try {
      await deleteUnit(unitId);

      await loadUnits();

      setOpenDeleteUnitDialog(false);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Unit deleted successfully.",
      });

    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          error.response?.data?.message ||
          "Failed to delete unit.Because this unit is associated with a fuel, you cannot delete it.",
      });
    }
  }}
/>
      <UpdateStatusDialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}

        onUpdate={async (fuelId, status) => {
          try {
            await updateFuelStatus(fuelId, status);



            setOpenStatusDialog(false);
          } catch (error) {
            console.error(error);
          }
        }}
      />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}