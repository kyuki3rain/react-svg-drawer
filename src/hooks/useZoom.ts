import { useSetAreaConfig } from "../states/areaConfigState";
import * as rp from "../helpers/realPoint";

export const useZoom = () => {
  const { incPitch, incPitchWithCorrect, decPitch, decPitchWithCorrect } =
    useSetAreaConfig();

  const zoomIn = (x?: number, y?: number) => {
    if (!x || !y) incPitch();
    else incPitchWithCorrect(rp.create(x, y));
  };

  const zoomOut = (x?: number, y?: number) => {
    if (!x || !y) decPitch();
    else decPitchWithCorrect(rp.create(x, y));
  };

  return {
    zoomIn,
    zoomOut,
  };
};
