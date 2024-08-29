import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: true,
};

export const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectCount = (state: RootState) => state.theme.isDarkMode;

export default themeSlice.reducer;
