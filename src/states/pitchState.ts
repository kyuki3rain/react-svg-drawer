import { atom, useSetRecoilState } from "recoil";
import { getLimitedValue } from "../helpers/limitValue";

export const pitchState = atom<number>({
  key: "pitchState",
  default: 10,
});

export const useZoom = (min: number, max: number) => {
  const setPitch = useSetRecoilState(pitchState);

  const zoomIn = () => {
    setPitch((prev) => getLimitedValue(prev + 1, min, max));
  };

  const zoomOut = () => {
    setPitch((prev) => getLimitedValue(prev - 1, min, max));
  };

  return {
    zoomIn,
    zoomOut,
  };
};
