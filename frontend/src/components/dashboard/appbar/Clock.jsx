import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Clock() {

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setDateTime(new Date());

    },1000);

    return ()=>clearInterval(timer);

  },[]);

  return (

    <Box textAlign="right">

      <Typography
        color="white"
        fontWeight={600}
      >
        {dateTime.toLocaleTimeString()}
      </Typography>

      <Typography
        variant="caption"
        color="#94A3B8"
      >
        {dateTime.toDateString()}
      </Typography>

    </Box>

  );

}