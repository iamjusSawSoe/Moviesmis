import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ModalState {
  isModalDetail: boolean;
}

const initialState: ModalState = {
  isModalDetail: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModalDetail: (state) => {
      state.isModalDetail = !state.isModalDetail;
    },
  },
});

export const { toggleModalDetail } = modalSlice.actions;

export const selectCount = (state: RootState) => state.modal.isModalDetail;

export default modalSlice.reducer;
