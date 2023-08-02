import { useMediaQuery } from "@mui/material";
import React from "react";

const useUtilities = () => {
  const isMobile = !useMediaQuery("(min-width:600px)");
  const isMediumScreen = !useMediaQuery("(min-width:900px)");

  const avatarStyle = {
    width: isMobile ? 50 : 100,
    height: isMobile ? 50 : 100,
  };
  const avatarStyle1 = {
    width: isMobile ? 20 : 40,
    height: isMobile ? 20 : 40,
  };
  const appFontSize = {
    fontSize: isMobile ? 12 : 16,
  };

  return {
    isMobile,
    isMediumScreen,
    avatarStyle,
    avatarStyle1,
    appFontSize,
  };
};

export default useUtilities;
