import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "features/slices/modal";
import { storiesReducer } from "../features/slices/stories";
import { userReducer } from "features/slices/user";
import { appReducer } from "features/slices/app";

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    modal: modalReducer,
    user: userReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
