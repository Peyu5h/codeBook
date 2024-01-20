import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
