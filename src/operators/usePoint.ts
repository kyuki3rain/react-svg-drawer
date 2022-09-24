import { useRecoilCallback } from "recoil";
import { rp } from "../helpers/realPoint";
import { vp } from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";
import { snapGridState } from "../states/snapGridState";

export const usePoint = () => {
  const toVirtual = useRecoilCallback(
    ({ snapshot }) =>
      (r: RealPoint, withSnap?: boolean) => {
        const snapGrid = snapshot.getLoadable(snapGridState).getValue();
        const { pitch, upperLeft } = snapshot
          .getLoadable(areaConfigState)
          .getValue();
        if (withSnap === false || !snapGrid)
          return rp.toVirtual(r, pitch, upperLeft);
        return rp.toVirtualWithSnap(r, pitch, upperLeft);
      },
    []
  );

  const toReal = useRecoilCallback(
    ({ snapshot }) =>
      (v: VirtualPoint) => {
        const { pitch } = snapshot.getLoadable(areaConfigState).getValue();
        return vp.toReal(v, pitch);
      },
    []
  );

  return {
    toVirtual,
    toReal,
  };
};
