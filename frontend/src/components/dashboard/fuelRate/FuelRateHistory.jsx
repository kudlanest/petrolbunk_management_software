

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useMemo, useRef,useEffect } from "react";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";


import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";

import FuelRateHistoryGrid from "../../../components/dashboard/fuelRate/FuelRateHistoryGrid";
import { exportFuelRateHistoryPDF } from "../../../utils/pdfExport";
import { exportFuelRateHistoryExcel } from "../../../utils/excelExport";
import { useReactToPrint } from "react-to-print";
import PrintFuelRateHistory from "./PrintFuelRateHistory";
import FuelRateHistoryCards from "./FuelRateHistoryCards";  

import {
  getFuelRateHistory,
} from "../../../services/fuelRate/fuelRateService";

export default function FuelRateHistory() {

  const [fuel, setFuel] = useState("All");
  const [search, setSearch] = useState("");

const [selectedDate, setSelectedDate] = useState(null);
const printRef = useRef();
const [refreshing, setRefreshing] = useState(false);


const [history, setHistory] = useState([]);

useEffect(() => {
    loadHistory();
}, []);

const loadHistory = async () => {
    try {
        const response = await getFuelRateHistory();
        setHistory(response.data);
    } catch (error) {
        console.error(error);
    }
};


const filteredHistory = useMemo(() => {
  return history.filter((item) => {

    const matchesSearch =
      item.fuel.toLowerCase().includes(search.toLowerCase()) ||
      item.updatedBy.toLowerCase().includes(search.toLowerCase());

    const matchesFuel =
      fuel === "All" || item.fuel === fuel;

    // const matchesDate =
    // !selectedDate ||
    // dayjs(item.date).format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD");


    const matchesDate =
  !selectedDate ||
  dayjs(item.updatedDate, "DD MMM YYYY").format("YYYY-MM-DD") ===
    selectedDate.format("YYYY-MM-DD");
    
    return matchesSearch && matchesFuel && matchesDate;

  });
}, [history, search, fuel, selectedDate]);

const handlePrint = useReactToPrint({
  contentRef: printRef,
  documentTitle: "Fuel Rate History",
});



const handleRefresh = async () => {

    setRefreshing(true);

    setSearch("");
    setFuel("All");
    setSelectedDate(null);

    try {
        await loadHistory();
    } finally {
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }
};





  return (
    
  <Box>

    {/* Header */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        p: 2,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        Fuel Rate History
      </Typography>

      <Box display="flex" gap={2}>
<Button
  variant="contained"
  color="error"
  startIcon={<PictureAsPdfIcon />}
  onClick={() => exportFuelRateHistoryPDF(filteredHistory)}
>
  Export PDF
</Button>

<Button
  variant="contained"
  color="success"
  startIcon={<TableViewIcon />}
  onClick={() => exportFuelRateHistoryExcel(filteredHistory)}
>
  Export Excel
</Button>
<Button
  variant="contained"
  startIcon={<PrintIcon />}
  onClick={handlePrint}
>
  Print
</Button>

<Button
  variant="outlined"
  startIcon={
    <RefreshIcon
      sx={{
        animation: refreshing ? "spin 0.6s linear" : "none",
        "@keyframes spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      }}
    />
  }
  onClick={handleRefresh}
>
  Refresh
</Button>

      </Box>

    </Box>

     {/* Summary Cards */}
  <FuelRateHistoryCards history={filteredHistory} />

    {/* Filters */}
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 2,
        p: 3,
        mb: 3,
      }}
    >

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
      >

<OutlinedInput
    size="small"
    placeholder="Search Fuel / Updated By"
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    startAdornment={
        <InputAdornment position="start">
            <SearchIcon color="primary"/>
        </InputAdornment>
    }
/>

        <TextField
          select
          size="small"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Gas">Gas</MenuItem>
          <MenuItem value="Engine Oil">Engine Oil</MenuItem>
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  minWidth: 200,
                },
              },
            }}
          />
        </LocalizationProvider>

      </Box>

    </Box>
<Box
    sx={{
        display: "none",
    }}
>
    <div ref={printRef}>
        <PrintFuelRateHistory
            history={filteredHistory}
        />
    </div>
</Box>

<FuelRateHistoryGrid
    history={filteredHistory}
/>

  </Box>
  )
}
