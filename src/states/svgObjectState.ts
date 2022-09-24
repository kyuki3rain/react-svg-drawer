import { atom, atomFamily } from "recoil";

export const svgObjectStates = atomFamily<SvgObject | null, SvgId | "preview">({
  key: "svgObjectStates",
  default: () => {
    return null;
  },
});
export const svgObjectListState = atom<Set<SvgId>>({
  key: "svgObjectListState",
  default: new Set(),
});
