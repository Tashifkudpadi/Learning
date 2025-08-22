import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/index";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
