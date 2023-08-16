import { RootState } from "app/store";
import { MODAL_VIEWS } from "utils/typings/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TOpenModalPayload = {
  view: MODAL_VIEWS;
};

type TInitialState = {
  isOpen: boolean;
  view: MODAL_VIEWS;
  data: any;
};

const initialState: TInitialState = {
  isOpen: false,
  view: MODAL_VIEWS.NONE,
  data: null,
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
    setModalData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const modalState = (state: RootState) => state.modal;
export const { openAppModal, closeAppModal, setModalData } = modalSlice.actions;
