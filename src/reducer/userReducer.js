import Cookies from "js-cookie";

const initialState = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;

console.log(initialState);
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
