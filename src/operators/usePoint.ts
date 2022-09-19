import { useRecoilCallback } from "recoil";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";
import { snapGridState } from "../states/snapGridState";

export const usePoint = () => {
  const toVirtual = useRecoilCallback(
    ({ snapshot }) =>
      (r: RealPoint, withSnap?: boolean, isRelative?: boolean) => {
        const snapGrid = snapshot.getLoadable(snapGridState).getValue();
        const { pitch, upperLeft } = snapshot
          .getLoadable(areaConfigState)
          .getValue();
        if (withSnap === false || !snapGrid)
          return rp.toVirtual(r, pitch, upperLeft, isRelative);
        return rp.toVirtualWithSnap(r, pitch, upperLeft, isRelative);
      },
    []
  );

  const toReal = useRecoilCallback(
    ({ snapshot }) =>
      (v: VirtualPoint, isRelative?: boolean) => {
        const { pitch, upperLeft } = snapshot
          .getLoadable(areaConfigState)
          .getValue();
        return vp.toReal(v, pitch, upperLeft, isRelative);
      },
    []
  );

  return {
    toVirtual,
    toReal,
  };
};
