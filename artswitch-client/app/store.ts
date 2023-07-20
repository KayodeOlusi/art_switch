import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "features/slices/modal";
import { storiesReducer } from "../features/slices/stories";

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
