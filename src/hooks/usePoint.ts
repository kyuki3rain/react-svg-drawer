import { useRecoilState } from "recoil";
import { pitchState, upperLeftState } from "../states/pointConfigState";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";

export const usePoint = () => {
  const [pitch] = useRecoilState(pitchState);
  const [upperLeft] = useRecoilState(upperLeftState);

  const toVirtual = (r: RealPoint) => {
    rp.toVirtual(r, pitch, upperLeft);
  };

  const toReal = (v: VirtualPoint) => {
    vp.toReal(v, pitch, upperLeft);
  };

  return {
    toVirtual,
    toReal,
  };
};
