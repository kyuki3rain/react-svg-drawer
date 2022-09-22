import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { drawModeState } from "../states/drawModeState";

export const useChangeMode = () => {
  const setDrawMode = useSetRecoilState(drawModeState);

  const changeMode = useCallback(
    (mode: DrawMode) => {
      setDrawMode((prev) => (prev === mode ? prev : mode));
    },
    [setDrawMode]
  );

  return {
    changeMode,
  };
};
