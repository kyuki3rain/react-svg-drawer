import { useWindowSize } from "./useWindowSize";
import * as vp from "../helpers/virtualPoint";
import { usePoint } from "./usePoint";
import { useMemo } from "react";
import { useAreaConfig } from "../states/areaConfigState";

export const useGrid = () => {
  const { pitch, upperLeft } = useAreaConfig();

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
