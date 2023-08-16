import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "features/slices/modal";
import { storiesReducer } from "../features/slices/stories";
import { userReducer } from "features/slices/user";

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    modal: modalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
