import { selector } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";

export const rootPointSelector = selector({
  key: "rootPointSelector",
  get: ({ get }) => vp.sub(vp.zero(), get(areaConfigState).upperLeft),
});
