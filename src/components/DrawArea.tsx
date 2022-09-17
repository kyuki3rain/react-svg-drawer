import React from "react";
import { useRecoilValue } from "recoil";

import { useWindowSize } from "../hooks/useWindowSize";
import { rootPointSelector } from "../states/areaConfigState";
import { useSelectedSvgId } from "../states/selectedSvgIdState";
import { useSvgObjectList } from "../states/svgObjectState";
import DrawAreaController from "./DrawArea/DrawAreaController";
import Grids from "./DrawArea/Grids";
import SvgObjectWrapper from "./DrawArea/SvgObjectWrapper";

const DrawArea: React.FC = () => {
  const { height, width } = useWindowSize();
  const { svgObjectList } = useSvgObjectList();
  const { selectedSvgId } = useSelectedSvgId();
  const rootPoint = useRecoilValue(rootPointSelector);

  return (
    <DrawAreaController>
      <svg
        width={width}
        height={height}
        style={{ position: "fixed", right: 0, userSelect: "none" }}
        viewBox={`0, 0, ${width}, ${height}`}
      >
        <Grids />
        {[...svgObjectList].map((id) => (
          <SvgObjectWrapper
            svgId={id}
            key={id}
            isSelected={selectedSvgId.has(id)}
            parentPoint={rootPoint}
          ></SvgObjectWrapper>
        ))}
        <SvgObjectWrapper
          svgId="preview"
          isSelected={false}
          parentPoint={rootPoint}
        ></SvgObjectWrapper>
      </svg>
    </DrawAreaController>
  );
};

export default DrawArea;
