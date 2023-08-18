import { Outlet } from "react-router-dom";
import NavBar from "./app/layout/NavBar";
import useAxios from "./app/hooks/useAxios";
import React, { useCallback, useEffect, useState } from "react";
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
  const { user } = useAxios();
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
  }, [dispatch, token]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  // useEffectOnce(() => {
  //   console.log("In useEffectONCE")
  //   if (user && user.token) {
  //     console.log("In useEffectONCE111")
  //     const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
  //     const expires = new Date(jwtToken.exp * 1000);
  //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //     console.log(Date.now() - (60 * 1000))
  //     setDelay(Math.abs(timeout));
  //     console.log("timeout is", timeout);
  //   }
  // })

  // useInterval(
  //   async () => {
  //     // Your custom logic here
  //     if (user && user.token) {

  //       const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
  //       console.log("splited token is", jwtToken);

  //       const expires = new Date(jwtToken.exp * 1000);
  //       const timeout = expires.getTime() - Date.now() - (60 * 1000);

  //       console.log(Date.now() - (60 * 1000))
  //       setDelay(Math.abs(timeout));
  //       console.log("timeout is", timeout);
  //       // setCount(count + 1)
  //       await dispatch(fetchRefreshToken());
  //     }
  //   },
  //   // Delay in milliseconds or null to stop it
  //   (token || delay > 0) ? delay : null,
  // )

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
