import { useCallback } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { rp } from "../helpers/realPoint";
import { vp } from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";
import { snapGridState } from "../states/snapGridState";

export const usePoint = () => {
  const areaConfig = useRecoilValue(areaConfigState);
  const toVirtual = useRecoilCallback(
    ({ snapshot }) =>
      (r: RealPoint, withSnap?: boolean) => {
        const snapGrid = snapshot.getLoadable(snapGridState).getValue();
        const { pitch, upperLeft } = areaConfig;
        if (withSnap === false || !snapGrid)
          return rp.toVirtual(r, pitch, upperLeft);
        return rp.toVirtualWithSnap(r, pitch, upperLeft);
      },
    [areaConfig]
  );

  const toReal = useCallback(
    (v: VirtualPoint) => {
      const { pitch } = areaConfig;
      return vp.toReal(v, pitch);
    },
    [areaConfig]
  );

  return {
    toVirtual,
    toReal,
  };
};
