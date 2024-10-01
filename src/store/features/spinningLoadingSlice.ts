import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SpinningLoadingState {
  isSpinningLoading: boolean;
}

const initialState: SpinningLoadingState = {
  isSpinningLoading: true,
};

export const spinningLoadingSlice = createSlice({
  name: "spinningLoading",
  initialState,
  reducers: {
    toggleSpinningLoading: (state) => {
      state.isSpinningLoading = !state.isSpinningLoading;
    },
  },
});

export const { toggleSpinningLoading } = spinningLoadingSlice.actions;

export const selectCount = (state: RootState) =>
  state.spinningLoader.isSpinningLoading;

export default spinningLoadingSlice.reducer;
