import Grid from "@mui/material/Grid";
import FuelRateCard from "./FuelRateCard";

export default function FuelRateGrid({ fuelRates }) {

  
  return (
    <Grid container spacing={3}>
      {fuelRates.map((fuel) => (
        <Grid
          key={fuel.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <FuelRateCard fuel={fuel} />
        </Grid>
      ))}
    </Grid>
  );
}