import { RootState } from "app/store";
import { MODAL_VIEWS } from "typings/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TOpenModalPayload = {
  view: MODAL_VIEWS;
};

type TInitialState = {
  isOpen: boolean;
  view: MODAL_VIEWS;
};

const initialState: TInitialState = {
  isOpen: false,
  view: MODAL_VIEWS.NONE,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAppModal: (state, action: PayloadAction<TOpenModalPayload>) => {
      state.isOpen = true;
      state.view = action.payload.view;
    },
    closeAppModal: state => {
      state.isOpen = false;
      state.view = MODAL_VIEWS.NONE;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const modalState = (state: RootState) => state.modal;
export const { openAppModal, closeAppModal } = modalSlice.actions;
