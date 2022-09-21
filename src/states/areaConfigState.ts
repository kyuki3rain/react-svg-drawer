import { atom } from "recoil";
import * as vp from "../helpers/virtualPoint";

export const areaConfigState = atom({
  key: "areaConfigState",
  default: { pitch: 10, upperLeft: vp.create(0, 0) },
});
