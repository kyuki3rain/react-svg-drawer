import { DefaultValue, selector } from "recoil";
import { selectedIdListState } from "../states/selectedIdListState";
import { svgObjectListState, svgObjectStates } from "../states/svgObjectState";

export const allSvgObjectSelector = selector({
  key: "allSvgObjectSelector",
  get: ({ get }) =>
    [...get(svgObjectListState)].map((id) => get(svgObjectStates(id))),
  set: ({ get, set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      [...get(svgObjectListState)].map((id) => reset(svgObjectStates(id)));
      set(svgObjectListState, new Set());
      return;
    }

    const idList = newValue
      .map((obj) => {
        if (!obj?.id || obj.id == "preview") return;
        set(svgObjectStates(obj.id), obj);
        return obj.id;
      })
      .flatMap((x) => x ?? []);

    set(svgObjectListState, new Set(idList));
  },
});

export const selectSvgObjectSelector = selector({
  key: "selectSvgObjectSelector",
  get: ({ get }) =>
    [...get(selectedIdListState)].map((id) => get(svgObjectStates(id))),
});
