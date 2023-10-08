import { RootState } from "app/store";
import { TAppState } from "utils/typings/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TAppState = {
  chat: {
    open: false,
    data: null,
  },
  toggleFetchMessage: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppChatViewState: (state, action: PayloadAction<boolean>) => {
      state.chat = { ...state.chat, open: action.payload };
    },
    setAppChatData: (state, action: PayloadAction<any>) => {
      state.chat = { ...state.chat, data: action.payload };
    },
    setToggleFetchMessage: (state, action: PayloadAction<boolean>) => {
      state.toggleFetchMessage = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const selectAppState = (state: RootState) => state.app;
export const { setAppChatViewState, setAppChatData, setToggleFetchMessage } =
  appSlice.actions;
