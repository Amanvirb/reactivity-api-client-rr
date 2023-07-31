import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import activities from "../../app/assets/images/avtivities.jpg";
import { CardMedia } from "@mui/material";
import { router } from "../../app/layout/Routes";
import HomeHeader from "./HomeHeader";
import HomeMiddle from "./HomeMiddle";

const HomePage = () => {
  return (
    <Box component={"div"} sx={{display:'flex', flexDirection:'column', height: "100vh", alignItems:"center"}}>
      <HomeHeader />
      <HomeMiddle />
      <Typography variant="h2" align="center" margin={4}>
        Homepage is under Construction
      </Typography>
    </Box>
  );
};

export default HomePage;
