// import { atom } from "jotai";

// export const cartAtom = atom([]);

import { atomWithStorage } from "jotai/utils";
export const cartAtom = atomWithStorage("cart", []);
