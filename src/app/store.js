import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import navbarReducer from "../features/navbarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
  },
});
