import { Typography, Box } from "@mui/material";
import { INFO_MESSAGES } from "../../constants/message";

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
        Welcome to {INFO_MESSAGES.PROJECT_NAME}.
      </Typography>
    </Box>
  );
}