import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { drawModeState } from "../states/drawModeState";

export const useModeButtons = () => {
  const [drawMode, setDrawMode] = useRecoilState(drawModeState);

  const changeMode = useCallback(
    (mode: DrawMode, param?: SvgObject) => {
      setDrawMode((prev) => (prev.mode === mode ? prev : { mode, param }));
    },
    [setDrawMode]
  );

  return { drawMode, changeMode };
};
