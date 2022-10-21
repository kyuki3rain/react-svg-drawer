import { atom } from "recoil";

export const selectModeState = atom<SelectMode>({
  key: "selectModeState",
  default: "normal",
});

export const moveModeState = atom<MoveMode>({
  key: "moveModeState",
  default: "move",
});
