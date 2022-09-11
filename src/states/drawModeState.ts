import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type DrawModeState = {
  mode: DrawMode;
  param?: SvgObject;
};

const drawModeState = atom<DrawModeState>({
  key: "drawModeState",
  default: { mode: "selector" },
});

export const useDrawMode = () => {
  const drawMode = useRecoilValue(drawModeState);
  return { drawMode };
};

export const useSetDrawMode = () => {
  const setDrawMode = useSetRecoilState(drawModeState);

  const changeMode = (mode: DrawMode, param?: SvgObject) => {
    setDrawMode({ mode, param });
  };

  return { changeMode };
};
