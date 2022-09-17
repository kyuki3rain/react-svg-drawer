import { atom } from "recoil";
import * as vp from "../helpers/virtualPoint";

export const PITCH_DEFAULT = 10;
export const PITCH_MIN = 1;
export const PITCH_MAX = 50;

export const areaConfigState = atom({
  key: "areaConfigState",
  default: { pitch: 10, upperLeft: vp.create(0, 0) },
});
