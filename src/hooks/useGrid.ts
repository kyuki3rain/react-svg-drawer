import { useWindowSize } from "./useWindowSize";
import { useMemo } from "react";
import { useAreaConfig } from "../states/areaConfigState";

export const useGrid = () => {
  const { pitch, upperLeft } = useAreaConfig();
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
  };
};
