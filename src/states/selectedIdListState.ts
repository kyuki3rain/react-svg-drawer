import { atom } from "recoil";

export const selectedIdListState = atom<Set<SvgId>>({
  key: "selectedIdListState",
  default: new Set(),
});

export const copyingIdsState = atom<Set<SvgId>>({
  key: "copyingIdsState",
  default: new Set(),
});
