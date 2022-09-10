import { useSetAreaConfig } from "../states/areaConfigState";

const useZoom = () => {
  const { incPitch, incPitchWithCorrect, decPitch, decPitchWithCorrect } =
    useSetAreaConfig();

  const zoomIn = (r?: RealPoint) => {
    if (!r) incPitch();
    else incPitchWithCorrect(r);
  };

  const zoomOut = (r?: RealPoint) => {
    if (!r) decPitch();
    else decPitchWithCorrect(r);
  };

  return {
    zoomIn,
    zoomOut,
  };
};
