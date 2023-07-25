import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import NavBar from "./app/layout/NavBar";
import useAxios from "./app/hooks/useAxios";
import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "./app/store/configureStore";
import { fetchCurrentUser } from "./features/users/account/accountSlice";
import { pending } from "./app/common/options/sliceOpt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/app/layout/style.css";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/styles/styles";

function App() {
  const { accountStatus } = useAxios();
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    if (token) {
      try {
        await dispatch(fetchCurrentUser());
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (accountStatus === pending) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <NavBar />
          <Outlet />
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
