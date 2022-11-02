import { atom } from "recoil";
import { vp } from "../helpers/virtualPoint";

export const areaConfigState = atom({
  key: "areaConfigState",
  default: { pitch: 10, upperLeft: vp.zero() },
});
