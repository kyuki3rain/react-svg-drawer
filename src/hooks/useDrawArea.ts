import { useRecoilValue } from "recoil";
import { rootPointSelector } from "../selectors/rootPointSelector";
import { drawModeState } from "../states/drawModeState";
import { svgObjectListState } from "../states/svgObjectState";
import { windowSizeState } from "../states/windowSizeState";

export const useDrawArea = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  const rootPoint = useRecoilValue(rootPointSelector);
  const { width, height } = useRecoilValue(windowSizeState);
  const selectMode = useRecoilValue(drawModeState);

  return {
    svgObjectList: [...svgObjectList],
    rootPoint,
    width,
    height,
    selectMode,
  };
};
