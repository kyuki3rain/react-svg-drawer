import { selectorFamily } from "recoil";
import { svgObjectStates } from "../states/svgObjectState";
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

export const nodePointSelector = selectorFamily({
  key: "nodePointSelector",
  get:
    (id: NodeId | "preview") =>
    ({ get }) => {
      if (id === "preview") return null;

      const obj = get(svgObjectStates(id));
      if (obj?.type !== "node") return null;
      return obj.point;
    },
});

export const edgePointsSelector = selectorFamily({
  key: "edgePointsSelector",
  get:
    (id: EdgeId | "preview") =>
    ({ get }) => {
      if (id === "preview") return [null, null];

      const obj = get(svgObjectStates(id));
      if (obj?.type !== "edge") return [null, null];

      return [
        get(nodePointSelector(obj.node1)),
        get(nodePointSelector(obj.node2)),
      ];
    },
});
