import { useRecoilValue } from "recoil";
import { rootPointSelector } from "../selectors/rootPointSelector";
import { selectedIdListState } from "../states/selectedIdListState";
import { svgObjectListState } from "../states/svgObjectState";
import { windowSizeState } from "../states/windowSizeState";

export const useDrawArea = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  const selectedIdList = useRecoilValue(selectedIdListState);
  const rootPoint = useRecoilValue(rootPointSelector);
  const { width, height } = useRecoilValue(windowSizeState);

  return {
    svgObjectList: [...svgObjectList],
    selectedIdList,
    rootPoint,
    width,
    height,
  };
};
