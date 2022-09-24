import { atom } from "recoil";

export const drawModeState = atom<DrawMode>({
  key: "drawModeState",
  default: "selector",
});
