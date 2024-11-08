import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import searchReducer from "./features/searchSlice";
import spinningLoadingReducer from "./features/spinningLoadingSlice";
import themeReducer from "./features/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
      theme: themeReducer,
      spinningLoader: spinningLoadingReducer,
      search: searchReducer,
    },
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
