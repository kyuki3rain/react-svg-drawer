import { atom, atomFamily } from "recoil";

export const nodeListState = atom({
  key: "nodeList",
  default: new Set() as NodeIdList,
});

export const pointToNodeIdState = atom({
  key: "pointToNodeId",
  default: new Map() as PointToNodeIdMap,
});

export const edgeListState = atom({
  key: "edgeList",
  default: new Set() as EdgeIdList,
});

export const nodeIdToEdgeIdStates = atomFamily({
  key: "nodeIdToEdgeId",
  default: () => new Map() as NodeIdToEdgeIdMap,
});
