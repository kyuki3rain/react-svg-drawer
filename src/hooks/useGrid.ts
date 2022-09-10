import { useRecoilValue } from "recoil";
import { pitchState } from "../states/pitchState";
import { useWindowSize } from "./useWindowSize";
import * as vp from "../helpers/virtualPoint";
import { usePoint } from "./usePoint";
import { upperLeftState } from "../states/upperLeftState";
import { useMemo } from "react";

export const useGrid = () => {
  const pitch = useRecoilValue(pitchState);
  const upperLeft = useRecoilValue(upperLeftState);

  const { width, height } = useWindowSize();
  const { toReal } = usePoint();

  const VerticalGridArray = useMemo(
    () =>
      [...Array(Math.ceil(width / pitch))].map((_, i) =>
        toReal(vp.create(i + Math.ceil(upperLeft.vx) - upperLeft.vx, 0))
      ),
    [pitch, toReal, upperLeft.vx, width]
  );
  const HorizontalGridArray = useMemo(
    () =>
      [...Array(Math.ceil(height / pitch))].map((_, i) =>
        toReal(vp.create(0, i + Math.ceil(upperLeft.vy) - upperLeft.vy))
      ),
    [height, pitch, toReal, upperLeft.vy]
  );

  return {
    VerticalGridArray,
    HorizontalGridArray,
  };
};
