import React from "react";
import { useDrawArea } from "../hooks/useDrawArea";
import DrawAreaController from "../controllers/DrawAreaController";
import Grids from "../components/DrawArea/Grids";
import SvgObjectWrapper from "../components/DrawArea/SvgObjectWrapper";

const DrawArea: React.FC = () => {
  const { svgObjectList, selectedSvgId, rootPoint, width, height } =
    useDrawArea();

  return (
    <DrawAreaController>
      <svg
        width={width}
        height={height}
        style={{ position: "fixed", right: 0, userSelect: "none" }}
        viewBox={`0, 0, ${width}, ${height}`}
      >
        <Grids />
        {svgObjectList.map((id) => (
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
