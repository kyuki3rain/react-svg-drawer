import { selector } from "recoil";
import { svgObjectStates } from "../states/svgObjectState";

export const selectObjectSelector = selector({
  key: "selectObjectSelector",
  get: ({ get }) => {
    const obj = get(svgObjectStates("select"));
    if (obj?.type !== "group") return [];
    return obj.objectIds;
  },
});
