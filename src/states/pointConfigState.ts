import { atom } from "recoil";
import * as vp from "../helpers/virtualPoint";

export const pitchState = atom<number>({
  key: "pitchState",
  default: 0,
});

export const upperLeftState = atom<VirtualPoint>({
  key: "upperLeftState",
  default: vp.create(0, 0),
});
