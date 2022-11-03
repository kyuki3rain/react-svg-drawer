import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { isOnEdge } from "../helpers/wireHelper";
import { edgePointsSelector } from "../selectors/wireSelector";
import { svgObjectStates } from "../states/svgObjectState";
import {
  edgeListState,
  nodeListState,
  pointToNodeIdState,
} from "../states/wireState";
import { useEdgeState } from "./useEdgeState";
import { useSvgObject } from "./useSvgObject";

export const useNodeState = () => {
  const setNodeList = useSetRecoilState(nodeListState);
  const setPointToNodeId = useSetRecoilState(pointToNodeIdState);
  const { removeEdge, setEdge } = useEdgeState();
  const { addObject } = useSvgObject();

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

  const separateEdge = useRecoilCallback(
    ({ snapshot }) =>
      (edgeId: EdgeId, nodeId: NodeId) => {
        const edge = snapshot.getLoadable(svgObjectStates(edgeId)).getValue();
        if (edge?.type !== "edge" || edge.id === "preview") return;

        removeEdge(edge.id);
        setEdge(edge.node1, nodeId, edge.id);
        setEdge(nodeId, edge.node2);
      },
    [removeEdge, setEdge]
  );

  const setNode = useCallback(
    (point: VirtualAbsolute, id?: NodeId) => {
      const nodeId = id || (nanoid() as NodeId);
      setNodeList((prev) => new Set(prev.add(nodeId)));
      console.log(nodeId, point);
      addObject(
        {
          id: nodeId,
          type: "node",
          point,
          fixedPoint: point,
          area: {
            upperLeft: vp.zero() as VirtualAbsolute,
            bottomRight: vp.zero() as VirtualAbsolute,
          },
        },
        nodeId
      );
      setPointToNodeId(
        (prev) => new Map(prev.set(JSON.stringify(point), nodeId))
      );

      const edge = getEdgeThrouphPoint(point);
      if (edge) separateEdge(edge, nodeId);

      return nodeId;
    },
    [
      addObject,
      getEdgeThrouphPoint,
      separateEdge,
      setNodeList,
      setPointToNodeId,
    ]
  );

  // const removeNode = useCallback(
  //   (nodeId: NodeId) => {
  //     const node = nodeList.get(nodeId);
  //     if (!node) return null;

  //     setNodeList((prev) => {
  //       prev.delete(nodeId);
  //       return new Map(prev);
  //     });
  //     setPointToNodeIdMap((prev) => {
  //       prev.delete(JSON.stringify(node.point));
  //       return new Map(prev);
  //     });

  //     return node;
  //   },
  //   [nodeList, setNodeList, setPointToNodeIdMap]
  // );

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

  return { getNodeFromPoint, setNode };
};
