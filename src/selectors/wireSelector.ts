import { selectorFamily } from "recoil";
import { nodeIdToEdgeIdStates } from "../states/wireState";

export const hasEdgeSelector = selectorFamily({
  key: "hasEdgeSelector",
  get:
    (id: NodeId | "preview") =>
    ({ get }) => {
      if (id === "preview") return 0;
      return get(nodeIdToEdgeIdStates(id))?.size ?? 0;
    },
});
