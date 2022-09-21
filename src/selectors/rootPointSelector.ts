import { selector } from "recoil";
import * as vp from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";

export const rootPointSelector = selector({
  key: "rootPointSelector",
  get: ({ get }) => vp.sub(vp.create(0, 0), get(areaConfigState).upperLeft),
});
