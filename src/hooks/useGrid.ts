import { useWindowSize } from "../operators/useWindowSize";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { areaConfigState } from "../states/areaConfigState";

export const useGrid = () => {
  const { pitch, upperLeft } = useRecoilValue(areaConfigState);
  const { width, height } = useWindowSize();

  const VerticalGridArray = useMemo(() => {
    return [...Array(Math.ceil(width / pitch))].map(
      (_, i) => (i + Math.ceil(upperLeft.vx) - upperLeft.vx) * pitch
    );
  }, [pitch, upperLeft.vx, width]);
  const HorizontalGridArray = useMemo(
    () =>
      [...Array(Math.ceil(height / pitch))].map(
        (_, i) => (i + Math.ceil(upperLeft.vy) - upperLeft.vy) * pitch
      ),
    [height, pitch, upperLeft.vy]
  );

  return {
    VerticalGridArray,
    HorizontalGridArray,
    width,
    height,
  };
};
