import { Outlet } from "react-router-dom";
import NavBar from "./app/layout/NavBar";
import useAxios from "./app/hooks/useAxios";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "./app/store/configureStore";
import { fetchCurrentUser, fetchRefreshToken } from "./features/users/account/accountSlice";
import { pending } from "./app/common/options/sliceOpt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/app/layout/style.css";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/styles/styles";
import { useEffectOnce, useInterval } from "usehooks-ts";

function App() {

  // Dynamic delay
  const [delay, setDelay] = useState<number>(0);
  const { accountStatus } = useAxios();
  const dispatch = useAppDispatch();

  const tokenIntervalCalculater = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      setDelay(Math.abs(timeout));
    }
  }

  const initApp = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await dispatch(fetchCurrentUser());
        tokenIntervalCalculater();
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
      }
    }
  }, [dispatch]);

  useEffectOnce(() => {
    initApp();
  });

  const localToken = localStorage.getItem("token");
  useInterval(
    async () => {
      // Your custom logic here
      if (localToken) {
        await dispatch(fetchRefreshToken());
        tokenIntervalCalculater();

      }
    },
    // Delay in milliseconds or null to stop it
    (localToken || delay > 0) ? delay : null,
  )

  if (accountStatus === pending) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <NavBar />
          <Outlet />
          <ToastContainer />
          {/* <AppFooter/> */}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
