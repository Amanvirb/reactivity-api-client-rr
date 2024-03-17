import React from "react";
import { Box } from "@mui/material";
import HomeHeader from "./HomeHeader";
import HomeMiddle from "./HomeMiddle";
import AppFooter from "../footer/AppFooter";

const HomePage = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <HomeHeader />
      <HomeMiddle />
      <AppFooter />
    </Box>
  );
};

export default HomePage;
