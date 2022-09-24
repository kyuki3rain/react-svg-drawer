import { useRecoilValue } from "recoil";
import { useChangeMode } from "../../operators/useChangeMode";
import { drawModeState } from "../../states/drawModeState";

export const useModeButtons = () => {
  const drawMode = useRecoilValue(drawModeState);
  const { changeMode } = useChangeMode();

  return { drawMode, changeMode };
};
