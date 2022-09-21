import { atom } from "recoil";

export const selectedSvgIdState = atom<Set<SvgId>>({
  key: "selectedSvgIdState",
  default: new Set(),
});
