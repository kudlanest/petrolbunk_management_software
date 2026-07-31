import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function PrintFuelRateHistory({ history }) {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "white",
        color: "black",
      }}
    >
      {/* Company */}

      <Typography
        align="center"
        variant="h4"
        fontWeight={700}
      >
        PETROL BUNK MANAGEMENT SYSTEM
      </Typography>

      <Typography
        align="center"
        variant="h6"
        mb={3}
      >
        Fuel Rate History Report
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
      >
        <Typography>
          Generated :
          {" "}
          {new Date().toLocaleString()}
        </Typography>

        <Typography>
          Printed By : Admin
        </Typography>
      </Box>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell><b>Fuel</b></TableCell>

            <TableCell><b>Old Rate</b></TableCell>

            <TableCell><b>New Rate</b></TableCell>

            <TableCell><b>Updated By</b></TableCell>

            <TableCell><b>Date</b></TableCell>

            <TableCell><b>Time</b></TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {history.map((row) => (

            <TableRow key={row.id}>

              <TableCell>{row.fuel}</TableCell>

              <TableCell>{row.oldRate}</TableCell>

              <TableCell>{row.newRate}</TableCell>

              <TableCell>{row.updatedBy}</TableCell>

              <TableCell>{row.date}</TableCell>

              <TableCell>{row.time}</TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

      <Typography
        align="center"
        mt={6}
        fontSize={12}
      >
        © 2026 Petrol Bunk Management System
      </Typography>

    </Box>
  );
}