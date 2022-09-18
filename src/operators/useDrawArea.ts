import { useRecoilValue } from "recoil";
import { useWindowSize } from "../hooks/useWindowSize";
import { rootPointSelector } from "../states/areaConfigState";
import { selectedSvgIdState } from "../states/selectedSvgIdState";
import { svgObjectListState } from "../states/svgObjectState";

export const useDrawArea = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  const selectedSvgId = useRecoilValue(selectedSvgIdState);
  const rootPoint = useRecoilValue(rootPointSelector);
  const { width, height } = useWindowSize();

  return {
    svgObjectList: [...svgObjectList],
    selectedSvgId,
    rootPoint,
    width,
    height,
  };
};
