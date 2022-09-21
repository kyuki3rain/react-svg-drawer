import { useRecoilCallback } from "recoil";
import { svgObjectStates } from "../states/svgObjectState";
import * as vp from "../helpers/virtualPoint";
import { useCallback } from "react";

export const useCorrectFixedPoint = () => {
  const updateFixedPoint = useRecoilCallback(
    ({ set }) =>
      (id: SvgId, correction: VirtualPoint) => {
        if (!id || id === "preview") return;

        set(svgObjectStates(id), (prev) => {
          if (!prev) return prev;
          if (!prev.fixedPoint) return prev;
          return (
            prev && {
              ...prev,
              fixedPoint: vp.sub(prev.fixedPoint, correction),
            }
          );
        });
      },
    []
  );

  const updateFixedPoints = useCallback(
    (ids: SvgId[], correction: VirtualPoint) =>
      ids.forEach((id) => updateFixedPoint(id, correction)),
    [updateFixedPoint]
  );

  return {
    updateFixedPoint,
    updateFixedPoints,
  };
};
