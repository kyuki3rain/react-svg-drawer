import { atom } from "recoil";

export const drawModeState = atom<DrawMode>({
  key: "drawModeState",
  default: "selector",
});

export const mulSelectState = atom<boolean>({
  key: "mulSelectState",
  default: false,
});
