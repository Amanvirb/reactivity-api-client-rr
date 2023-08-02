import { alpha, colors, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const Colors = {
  primary: "#000",
  secondary: "#21b6af",
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
    h5: {
      color: "#21b6af",
    },
    h6: {
      color: "#fff",
    },
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
          color: Colors.inherit,
          padding: 4,
          width: 100,
          margin: 2,
          // border:'2px solid red',
          justifyContent: "center",
          "&:hover": {
            // boxShadow: `0px 0px 0px 8px ${alpha('#000', 0.16)}`,
            backgroundColor: Colors.active,
          },
          "&.active": {
            backgroundColor: Colors.hover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: Colors.inherit,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: Colors.secondary,
          fontSize: "2rem",
        },
      },
    },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       "&:hover": {
    //         boxShadow: '0 0 20px 20px #dfdfdf',
    //         // boxShadow: `0px 0px 0px 8px ${alpha('#000', 0.16)}`, // theme.shadows[20]
    //       },
    //     },
    //   },
    // },
  },
});
export default theme;
