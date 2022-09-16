import { useCallback } from "react";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { useAreaConfig } from "../states/areaConfigState";
import { useSnapGrid } from "../states/snapGridState";

export const usePoint = () => {
  const { pitch, upperLeft } = useAreaConfig();
  const { snapGrid } = useSnapGrid();

  const toVirtual = useCallback(
    (r: RealPoint, withSnap?: boolean, isRelative?: boolean) => {
      if (withSnap === false || !snapGrid)
        return rp.toVirtual(r, pitch, upperLeft, isRelative);
      return rp.toVirtualWithSnap(r, pitch, upperLeft, isRelative);
    },
    [pitch, snapGrid, upperLeft]
  );

  const toReal = useCallback(
    (v: VirtualPoint, isRelative?: boolean) =>
      vp.toReal(v, pitch, upperLeft, isRelative),
    [pitch, upperLeft]
  );

  return {
    toVirtual,
    toReal,
    rootPoint: vp.sub(vp.create(0, 0), upperLeft),
  };
};
