import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { useAreaConfig } from "../states/areaConfigState";
import { useSnapGrid } from "../states/snapGridState";

export const usePoint = () => {
  const { pitch, upperLeft } = useAreaConfig();
  const { snapGrid } = useSnapGrid();

  const toVirtual = (r: RealPoint, withSnap?: boolean) => {
    if (withSnap === false || !snapGrid)
      return rp.toVirtual(r, pitch, upperLeft);
    return rp.toVirtualWithSnap(r, pitch, upperLeft);
  };
  const toReal = (v: VirtualPoint) => vp.toReal(v, pitch, upperLeft);

  return {
    toVirtual,
    toReal,
  };
};
