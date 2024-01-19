import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./src/reducer/index";
const store = configureStore({
  reducer: rootReducer,
});

export default store;
