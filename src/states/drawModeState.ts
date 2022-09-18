import { atom } from "recoil";

type DrawModeState = {
  mode: DrawMode;
  param?: SvgObject;
};

export const drawModeState = atom<DrawModeState>({
  key: "drawModeState",
  default: { mode: "selector" },
});
