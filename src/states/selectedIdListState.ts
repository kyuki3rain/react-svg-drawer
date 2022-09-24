import { atom } from "recoil";

export const selectedIdListState = atom<Set<SvgId>>({
  key: "selectedIdListState",
  default: new Set(),
});
