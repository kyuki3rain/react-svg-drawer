/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { selectedIdListState } from "../states/selectedIdListState";
import { svgObjectListState } from "../states/svgObjectState";
import { nodeIdToEdgeIdStates, nodeListState } from "../states/wireState";

export const useDebugInfoEffect = () => {
  const nodeList = useRecoilValue(nodeListState);
  const nodeIdToEdgeIdList = useRecoilCallback(
    ({ snapshot }) =>
      () =>
        [...snapshot.getLoadable(nodeListState).getValue()].map((v) =>
          snapshot.getLoadable(nodeIdToEdgeIdStates(v)).getValue()
        )
  );
  useEffect(
    () => console.log("nodeIdToEdgeIdList: ", nodeIdToEdgeIdList()),
    [nodeList]
  );
};
