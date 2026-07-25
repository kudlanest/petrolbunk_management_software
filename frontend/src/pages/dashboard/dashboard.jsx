import { Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Box>
      <Typography
        variant="h3"
        color="white"
        fontWeight={700}
      >
        Dashboard
      </Typography>

      <Typography
        color="#CBD5E1"
        mt={2}
      >
        Welcome to Petrol Bunk Management System.
      </Typography>
    </Box>
  );
}