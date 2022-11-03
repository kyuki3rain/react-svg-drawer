import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { isOnEdge } from "../helpers/wireHelper";
import { edgePointsSelector } from "../selectors/wireSelector";
import { svgObjectStates } from "../states/svgObjectState";
import {
  edgeListState,
  nodeIdToEdgeIdStates,
  nodeListState,
  pointToNodeIdState,
} from "../states/wireState";

export const useNodeState = () => {
  const setNodeList = useSetRecoilState(nodeListState);
  const setPointToNodeId = useSetRecoilState(pointToNodeIdState);

  const getEdgeThrouphPoint = useRecoilCallback(
    ({ snapshot }) =>
      (point: VirtualPoint) => {
        const edgeList = snapshot.getLoadable(edgeListState).getValue();
        const edge = Array.from(edgeList.values()).find((e) => {
          const [point1, point2] = snapshot
            .getLoadable(edgePointsSelector(e))
            .getValue();
          if (!point1 || !point2) return false;

          return isOnEdge(point1, point2, point);
        });

        return edge;
      },
    []
  );

  const setNode = useCallback(
    (point: VirtualAbsolute, id?: NodeId) => {
      const nodeId = id || (nanoid() as NodeId);
      setNodeList((prev) => new Set(prev.add(nodeId)));
      setPointToNodeId(
        (prev) => new Map(prev.set(JSON.stringify(point), nodeId))
      );

      return nodeId;
    },
    [setNodeList, setPointToNodeId]
  );

  const removeNode = useRecoilCallback(
    ({ snapshot }) =>
      (nodeId: NodeId, point: VirtualPoint) => {
        setNodeList((prev) => {
          prev.delete(nodeId);
          return new Set(prev);
        });
        setPointToNodeId((prev) => {
          prev.delete(JSON.stringify(point));
          return new Map(prev);
        });

        return [
          ...snapshot
            .getLoadable(nodeIdToEdgeIdStates(nodeId))
            .getValue()
            .values(),
        ];
      },
    [setNodeList, setPointToNodeId]
  );

  const getNodeFromPoint = useRecoilCallback(
    ({ snapshot }) =>
      (point: VirtualPoint) => {
        const pointToNodeIdMap = snapshot
          .getLoadable(pointToNodeIdState)
          .getValue();
        const pString = JSON.stringify(point);
        const id = pointToNodeIdMap.get(pString);
        return id;
      },
    []
  );

  const separateEdge = useRecoilCallback(
    ({ snapshot }) =>
      (edgeId: EdgeId, nodeId: NodeId) => {
        const edge = snapshot.getLoadable(svgObjectStates(edgeId)).getValue();
        if (edge?.type !== "edge" || edge.id === "preview") return null;

        const res: [EdgeId, EdgeObject, EdgeObject] = [
          edge.id,
          {
            id: edge.id,
            type: "edge",
            node1: edge.node1,
            node2: nodeId,
            area: {
              upperLeft: vp.zero() as VirtualAbsolute,
              bottomRight: vp.zero() as VirtualAbsolute,
            },
          },
          {
            id: edge.id,
            type: "edge",
            node1: nodeId,
            node2: edge.node2,
            area: {
              upperLeft: vp.zero() as VirtualAbsolute,
              bottomRight: vp.zero() as VirtualAbsolute,
            },
          },
        ];

        return res;
      },

    []
  );

  return {
    getNodeFromPoint,
    setNode,
    getEdgeThrouphPoint,
    separateEdge,
    removeNode,
  };
};
