import { atom } from "jotai";
import Cookies from "js-cookie";

const initialState = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;
let userAtom = atom(initialState);
export default userAtom = atom(initialState);
