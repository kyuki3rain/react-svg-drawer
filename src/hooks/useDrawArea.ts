import { useRecoilValue } from "recoil";
import { rootPointSelector } from "../selectors/rootPointSelector";
import { selectedIdListState } from "../states/selectedIdListState";
import { moveModeState } from "../states/selectModeState";
import { svgObjectListState } from "../states/svgObjectState";
import { windowSizeState } from "../states/windowSizeState";

export const useDrawArea = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  const selectedIdList = useRecoilValue(selectedIdListState);
  const rootPoint = useRecoilValue(rootPointSelector);
  const moveMode = useRecoilValue(moveModeState);
  const { width, height } = useRecoilValue(windowSizeState);

  return {
    svgObjectList: [...svgObjectList],
    selectedIdList,
    rootPoint,
    moveMode,
    width,
    height,
  };
};
