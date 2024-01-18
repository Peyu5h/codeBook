import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/reducer/userReducer";

const store = configureStore({
  reducer: userReducer,
});

export default store;
