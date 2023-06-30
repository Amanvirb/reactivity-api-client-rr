import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { activitySlice } from "../../features/activities/activitySlice";
import { accountSlice } from "../../features/users/account/accountSlice";
import { userProfileSlice } from "../../features/profiles/userProfileSlice";

export const store = configureStore({
  reducer: {
    activity: activitySlice.reducer,
    account: accountSlice.reducer,
    profile: userProfileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
