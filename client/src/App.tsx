import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import NavBar from "./app/layout/NavBar";
import useAxios from "./app/hooks/useAxios";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "./app/store/configureStore";
import {
  fetchCurrentUser,
} from "./features/users/account/accountSlice";
import { pending } from "./app/common/options/sliceOpt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/app/layout/style.css";

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
    <div className="approot">
      <NavBar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
