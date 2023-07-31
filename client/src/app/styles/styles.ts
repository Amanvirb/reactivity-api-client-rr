import { colors, createTheme } from "@mui/material";

const Colors = {
  primary: "#fff",
  secondary: "#95defb",
  hover: "#21b6af",
  active: "#21b6af",
  inherit: "#fff",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  typography: {
    body1: {
      color: "#000",
    },
    body2: {
      color: "#013220",
    },
    h2: {
      color: "#013220",
    },
    h3: {
      color: "#013220",
    },
    h4: {
      color: "#013220",
    },
    h6:{
      color:"#fff"
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        padding: 1,
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#fff",
          p: 1,
          width: 100,
          mr: 1,
          justifyContent: "center",
          ":hover": {
            bgcolor: "#21b6af",
          },
          ".active": {
            bgcolor: "#21b6af",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // color: Colors.inherit,
          // fontSize:'6rem', 
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          // color: Colors.inherit,
          // fontSize:'6rem', 
        },
      },
    },
  },
});
export default theme;
