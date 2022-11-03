import { nanoid } from "nanoid";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { svgObjectStates } from "../states/svgObjectState";
import { edgeListState, nodeIdToEdgeIdStates } from "../states/wireState";
import { useSvgObject } from "./useSvgObject";

export const useEdgeState = () => {
  const setEdgeList = useSetRecoilState(edgeListState);
  const { addObject } = useSvgObject();

  const setEdge = useRecoilCallback(
    ({ set }) =>
      (node1: NodeId, node2: NodeId, id?: EdgeId) => {
        if (node1 === node2) return;
        const edgeId = id || (nanoid() as EdgeId);

        set(
          nodeIdToEdgeIdStates(node1),
          (prev) => new Map(prev.set(node2, edgeId))
        );
        set(
          nodeIdToEdgeIdStates(node2),
          (prev) => new Map(prev.set(node1, edgeId))
        );
        setEdgeList((prev) => new Set(prev.add(edgeId)));
        addObject(
          {
            id: edgeId,
            type: "edge",
            node1,
            node2,
            area: {
              upperLeft: vp.zero() as VirtualAbsolute,
              bottomRight: vp.zero() as VirtualAbsolute,
            },
          },
          edgeId
        );

        return edgeId;
      },
    [addObject, setEdgeList]
  );

  const removeEdge = useRecoilCallback(
    ({ snapshot, set }) =>
      (edgeId: EdgeId) => {
        const edge = snapshot.getLoadable(svgObjectStates(edgeId)).getValue();
        if (edge?.type !== "edge") return null;

        set(nodeIdToEdgeIdStates(edge.node1), (prev) => {
          prev.delete(edge.node2);
          return new Map(prev);
        });
        set(nodeIdToEdgeIdStates(edge.node2), (prev) => {
          prev.delete(edge.node1);
          return new Map(prev);
        });
        setEdgeList((prev) => {
          prev.delete(edgeId);
          return new Set(prev);
        });

        return edge;
      },
    [setEdgeList]
  );

  return {
    setEdge,
    removeEdge,
  };
};
