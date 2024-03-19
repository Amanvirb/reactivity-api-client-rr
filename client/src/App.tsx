import { Outlet } from "react-router-dom";
import NavBar from "./app/layout/NavBar";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./app/store/configureStore";
import { fetchCurrentUser } from "./features/users/account/accountSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/app/layout/style.css";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/styles/styles";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  });

  if (loading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <NavBar />
          <Box component={"div"} sx={{ m: 6 }}>
            <Outlet />
          </Box>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
