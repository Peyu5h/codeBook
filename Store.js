// store.js
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./src/reducer/ReduxFilterReducer";

const store = configureStore({
  reducer: filterReducer,
});

export default store;
