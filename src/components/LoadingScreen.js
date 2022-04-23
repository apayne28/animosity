import React from "react";
import ZeroTwoSpin from "../ZeroTwoSpin.gif";
import { Box, Typography } from "@mui/material";

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        borderStyle: "solid",
        backgroundColor: "white",
        height: "auto",
        width: "auto",
      }}
    >
      <img src={ZeroTwoSpin} alt='Loading...' />
      <Typography sx={{ fontSize: 50 }}>Loading...</Typography>
    </Box>
  );
}

export default LoadingScreen;
