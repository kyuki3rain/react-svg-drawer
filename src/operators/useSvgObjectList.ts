import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { svgObjectListState } from "../states/svgObjectState";

export const useSvgObjectList = () => {
  const setSvgObjectList = useSetRecoilState(svgObjectListState);

  const includeIds = useCallback(
    (ids: SvgId[]) => {
      setSvgObjectList((prev) => {
        ids.map((id) => prev.add(id));
        return new Set(prev);
      });
    },
    [setSvgObjectList]
  );

  const excludeIds = useCallback(
    (ids: SvgId[]) => {
      setSvgObjectList((prev) => {
        ids.map((id) => prev.delete(id));
        return new Set(prev);
      });
    },
    [setSvgObjectList]
  );

  return {
    includeIds,
    excludeIds,
  };
};
