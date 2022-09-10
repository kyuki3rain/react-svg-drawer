import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { useAreaConfig } from "../states/areaConfigState";

export const usePoint = () => {
  const { pitch, upperLeft } = useAreaConfig();

  const toVirtual = (r: RealPoint) => rp.toVirtual(r, pitch, upperLeft);
  const toReal = (v: VirtualPoint) => vp.toReal(v, pitch, upperLeft);

  return {
    toVirtual,
    toReal,
  };
};
