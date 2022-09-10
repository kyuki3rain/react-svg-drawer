import { useRecoilValue } from "recoil";
import { pitchState } from "../states/pitchState";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { upperLeftState } from "../states/upperLeftState";

export const usePoint = () => {
  const pitch = useRecoilValue(pitchState);
  const upperLeft = useRecoilValue(upperLeftState);

  const toVirtual = (r: RealPoint) => rp.toVirtual(r, pitch, upperLeft);
  const toReal = (v: VirtualPoint) => vp.toReal(v, pitch, upperLeft);

  return {
    toVirtual,
    toReal,
  };
};
