import { atom } from "recoil";
import * as vp from "../helpers/virtualPoint";

export const upperLeftState = atom<VirtualPoint>({
  key: "upperLeftState",
  default: vp.create(0, 0),
});
