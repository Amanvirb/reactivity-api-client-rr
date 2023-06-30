import { useMediaQuery } from "@mui/material";
import React from "react";

const useUtilities = () => {
  const isMobile = !useMediaQuery('(min-width:600px)');
  const isMediumScreen= !useMediaQuery('(min-width:900px)');
  return {
    isMobile,
    isMediumScreen,
  };
};

export default useUtilities;
