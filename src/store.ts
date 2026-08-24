import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./features/auth/memberSlice";

export const store = configureStore({
  reducer: {
    member: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
