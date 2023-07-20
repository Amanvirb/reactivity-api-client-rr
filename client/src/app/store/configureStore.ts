import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { activitySlice } from "../../features/activities/activitySlice";
import { accountSlice } from "../../features/users/account/accountSlice";
import { userProfileSlice } from "../../features/profiles/userProfileSlice";
import { blogSlice } from "../../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    activity: activitySlice.reducer,
    account: accountSlice.reducer,
    profile: userProfileSlice.reducer,
    blog: blogSlice.reducer,
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
