import { useRecoilValue } from "recoil";
import { rootPointSelector } from "../selectors/rootPointSelector";
import { svgObjectListState } from "../states/svgObjectState";
import { windowSizeState } from "../states/windowSizeState";

export const useDrawArea = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  const rootPoint = useRecoilValue(rootPointSelector);
  const { width, height } = useRecoilValue(windowSizeState);

  return {
    svgObjectList: [...svgObjectList],
    rootPoint,
    width,
    height,
  };
};
