import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type DrawModeState = {
  mode: DrawMode;
  param?: SvgObject;
};

const drawModeState = atom<DrawModeState>({
  key: "drawModeState",
  default: { mode: "selector" },
});

export const useSetDrawMode = () => {
  const setDrawMode = useSetRecoilState(drawModeState);

  const changeMode = useCallback(
    (mode: DrawMode, param?: SvgObject) => {
      setDrawMode((prev) => (prev.mode === mode ? prev : { mode, param }));
    },
    [setDrawMode]
  );

  return { changeMode };
};

export const useDrawMode = () => {
  const drawMode = useRecoilValue(drawModeState);
  const setDrawMode = useSetDrawMode();
  return { drawMode, ...setDrawMode };
};
