import { atom } from "recoil";

export const windowSizeState = atom({
  key: "windowSizeState",
  default: {
    width: 0,
    height: 0,
  },
});
