/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedIdListState } from "../states/selectedIdListState";
import { svgObjectListState } from "../states/svgObjectState";

export const useDebugInfoEffect = () => {
  const ids = useRecoilValue(svgObjectListState);
  useEffect(() => console.log("svgObjectListState: ", ids), [ids]);
};
