import { useSetAreaConfig } from "../states/areaConfigState";
import * as rp from "../helpers/realPoint";
import { useCallback } from "react";

export const useZoom = () => {
  const { incPitch, incPitchWithCorrect, decPitch, decPitchWithCorrect } =
    useSetAreaConfig();

  const zoomIn = useCallback(
    (x?: number, y?: number) => {
      if (!x || !y) incPitch();
      else incPitchWithCorrect(rp.create(x, y));
    },
    [incPitch, incPitchWithCorrect]
  );

  const zoomOut = useCallback(
    (x?: number, y?: number) => {
      if (!x || !y) decPitch();
      else decPitchWithCorrect(rp.create(x, y));
    },
    [decPitch, decPitchWithCorrect]
  );

  return {
    zoomIn,
    zoomOut,
  };
};
