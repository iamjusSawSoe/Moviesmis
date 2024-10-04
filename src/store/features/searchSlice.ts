import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SearchState {
  searchValue: string;
}

const initialState: SearchState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "spinningLoading",
  initialState,
  reducers: {
    defaultSearchState: (state) => {
      state.searchValue = "";
    },
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { defaultSearchState, changeSearchValue } = searchSlice.actions;

export const selectCount = (state: RootState) => state.search.searchValue;

export default searchSlice.reducer;
