import { useAreaConfig } from "../states/areaConfigState";
import * as vp from "../helpers/virtualPoint";
import { useCallback } from "react";

export const useMove = () => {
  const { pitch, setUpperLeftRelative } = useAreaConfig();

  const move = useCallback(
    (x: number, y: number) =>
      setUpperLeftRelative(vp.create(x / pitch, y / pitch)),
    [pitch, setUpperLeftRelative]
  );

  return {
    move,
    moveToLeft: (d: number) => move(-d, 0),
    moveToRight: (d: number) => move(d, 0),
    moveToTop: (d: number) => move(0, -d),
    moveToBottom: (d: number) => move(0, d),
  };
};
