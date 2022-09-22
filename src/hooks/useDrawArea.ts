import { useRecoilValue } from "recoil";
import { rootPointSelector } from "../selectors/rootPointSelector";
import { selectedSvgIdState } from "../states/selectedSvgIdState";
import { svgObjectListState } from "../states/svgObjectState";
import { windowSizeState } from "../states/windowSizeState";

export const useDrawArea = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  const selectedSvgId = useRecoilValue(selectedSvgIdState);
  const rootPoint = useRecoilValue(rootPointSelector);
  const { width, height } = useRecoilValue(windowSizeState);

  return {
    svgObjectList: [...svgObjectList],
    selectedSvgId,
    rootPoint,
    width,
    height,
  };
};
