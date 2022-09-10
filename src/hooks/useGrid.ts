import { useRecoilValue } from "recoil";
import { pitchState } from "../states/pitchState";
import { useWindowSize } from "./useWindowSize";
import * as vp from "../helpers/virtualPoint";
import { usePoint } from "./usePoint";
import { upperLeftState } from "../states/upperLeftState";

export const useGrid = () => {
  const pitch = useRecoilValue(pitchState);
  const upperLeft = useRecoilValue(upperLeftState);

  const { width, height } = useWindowSize();
  const { toReal } = usePoint();

  const XGridStartPointArray = Array(Math.ceil(height / pitch)).map((_, i) =>
    toReal(vp.create(i + Math.ceil(upperLeft.vy) - upperLeft.vy, 0))
  );
  const YGridStartPointArray = Array(Math.ceil(width / pitch)).map((_, i) =>
    toReal(vp.create(i + Math.ceil(upperLeft.vx) - upperLeft.vx, 0))
  );

  return {
    XGridStartPointArray,
    YGridStartPointArray,
  };
};
