import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { useAreaConfig } from "../states/areaConfigState";
import { useSnapGrid } from "../states/snapGridState";

export const usePoint = () => {
  const { pitch, upperLeft } = useAreaConfig();
  const { snapGrid } = useSnapGrid();

  const toVirtual = (
    r: RealPoint,
    withSnap?: boolean,
    isRelative?: boolean
  ) => {
    if (withSnap === false || !snapGrid)
      return rp.toVirtual(r, pitch, upperLeft, isRelative);
    return rp.toVirtualWithSnap(r, pitch, upperLeft, isRelative);
  };
  const toReal = (v: VirtualPoint, isRelative?: boolean) =>
    vp.toReal(v, pitch, upperLeft, isRelative);

  return {
    toVirtual,
    toReal,
  };
};
