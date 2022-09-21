import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { drawModeState } from "../../states/drawModeState";

export const useModeButtons = () => {
  const [drawMode, setDrawMode] = useRecoilState(drawModeState);

  const changeMode = useCallback(
    (mode: DrawMode) => {
      setDrawMode((prev) => (prev === mode ? prev : mode));
    },
    [setDrawMode]
  );

  return { drawMode, changeMode };
};
