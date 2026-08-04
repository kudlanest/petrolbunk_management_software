import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
} from "@mui/material";

import { useState } from "react";

export default function FuelRateHistoryGrid({ history }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getRateChange = (oldRate, newRate) => {

    const diff = Number(newRate) - Number(oldRate);

    if (diff > 0) {
      return (
        <Chip
          label={`+₹${diff.toFixed(2)}`}
          color="success"
          size="small"
        />
      );
    }

    if (diff < 0) {
      return (
        <Chip
          label={`-₹${Math.abs(diff).toFixed(2)}`}
          color="error"
          size="small"
        />
      );
    }

    return (
      <Chip
        label="No Change"
        color="default"
        size="small"
      />
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer>

        <Table stickyHeader>

          <TableHead>

            <TableRow>

              <TableCell><b>Fuel</b></TableCell>

              <TableCell align="right">
                <b>Old Rate</b>
              </TableCell>

              <TableCell align="right">
                <b>New Rate</b>
              </TableCell>

              <TableCell align="center">
                <b>Change</b>
              </TableCell>

              <TableCell>
                <b>Updated By</b>
              </TableCell>

              <TableCell>
                <b>Date</b>
              </TableCell>

              <TableCell>
                <b>Time</b>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {history
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (

                <TableRow
                  key={row.id}
                  hover
                >

                  <TableCell>{row.fuel}</TableCell>

                  <TableCell align="right">
                    ₹{row.oldRate}
                  </TableCell>

                  <TableCell align="right">
                    ₹{row.newRate}
                  </TableCell>

                  <TableCell align="center">
                    {getRateChange(row.oldRate, row.newRate)}
                  </TableCell>

                  <TableCell>{row.updatedBy}</TableCell>

                  <TableCell>{row.updatedDate}</TableCell>

                  <TableCell>{row.updatedTime}</TableCell>

                </TableRow>

              ))}

          </TableBody>

        </Table>

      </TableContainer>

      <TablePagination
        component="div"
        count={history.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

    </Paper>
  );
}