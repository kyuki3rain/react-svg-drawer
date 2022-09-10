import { atom } from "recoil";

export const pitchState = atom<number>({
  key: "pitchState",
  default: 0,
});
