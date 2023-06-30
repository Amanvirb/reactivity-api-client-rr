import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  fetchActivityAsync,
  cancelActivity,
  setParams,
  setStartDate,
  clearActivityDetail,
} from "../../features/activities/activitySlice";

const useDispatchReducer = () => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const { activityLoaded, activityStatus, attendActivityLoaded } =
    useAppSelector((state) => state.activity);

  useEffect(() => {
    if (!activityLoaded) {
      dispatch(fetchActivityAsync());
    }
  }, [activityLoaded, dispatch]);

  // useEffect(() => {
  //   if (!attendActivityLoaded) {
  //     dispatch(fetchActivityDetailAsync())
  //   }
  // }, [attendActivityLoaded, dispatch])

  const filtersHandler = (values: any) => {
    dispatch(setParams(values));
  };
  const filteredDateHandler = (values: any) => {
    dispatch(setStartDate(values));
    console.log("date is", values);
  };

  const cancelActivityHandler = (activityID: string) => {
    dispatch(cancelActivity(activityID));
  };

  const clearActivityDetailHandler=()=>{
    dispatch(clearActivityDetail())
  }

  return {
    filtersHandler,
    filteredDateHandler,
    cancelActivityHandler,
    clearActivityDetailHandler,
    activityStatus,
    attendActivityLoaded,
  };
};

export default useDispatchReducer;
