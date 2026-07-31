import { Box, Paper, Typography } from "@mui/material";

import UpdateIcon from "@mui/icons-material/Update";
import TodayIcon from "@mui/icons-material/Today";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function FuelRateHistoryCards({ history }) {
  const totalUpdates = history.length;

  const highestRate =
    history.length > 0
      ? Math.max(...history.map((x) => x.newRate))
      : 0;

  const lowestRate =
    history.length > 0
      ? Math.min(...history.map((x) => x.newRate))
      : 0;

  const todayUpdates = history.filter(
    (x) => x.date === new Date().toISOString().slice(0, 10)
  ).length;

  const cards = [
    {
      title: "Total Updates",
      value: totalUpdates,
      color: "#1976d2",
      icon: <UpdateIcon sx={{ fontSize: 45, color: "#1976d2" }} />,
    },
    {
      title: "Today's Updates",
      value: todayUpdates,
      color: "#2e7d32",
      icon: <TodayIcon sx={{ fontSize: 45, color: "#2e7d32" }} />,
    },
    {
      title: "Highest Rate",
      value: `₹ ${highestRate.toFixed(2)}`,
      color: "#ef6c00",
      icon: <TrendingUpIcon sx={{ fontSize: 45, color: "#ef6c00" }} />,
    },
    {
      title: "Lowest Rate",
      value: `₹ ${lowestRate.toFixed(2)}`,
      color: "#d32f2f",
      icon: <TrendingDownIcon sx={{ fontSize: 45, color: "#d32f2f" }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
        mb: 3,
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.title}
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 4,
            borderLeft: `6px solid ${card.color}`,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 8,
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography color="text.secondary" fontWeight={600}>
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                mt={1}
              >
                {card.value}
              </Typography>
            </Box>

            <Box>{card.icon}</Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}