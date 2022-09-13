import React from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import { useSvgObjectList } from "../states/svgObjectState";
import DrawAreaController from "./DrawArea/DrawAreaController";
import Grids from "./DrawArea/Grids";
import SvgObjectWrapper from "./DrawArea/SvgObjectWrapper";

const DrawArea: React.FC = () => {
  const { height, width } = useWindowSize();
  const { svgObjectList } = useSvgObjectList();

  return (
    <DrawAreaController>
      <svg
        width={width}
        height={height}
        style={{ position: "fixed", right: 0 }}
        viewBox={`0, 0, ${width}, ${height}`}
      >
        <Grids />
        {[...svgObjectList].map((id) => (
          <SvgObjectWrapper svgId={id} key={id}></SvgObjectWrapper>
        ))}
        <SvgObjectWrapper svgId="preview"></SvgObjectWrapper>
      </svg>
    </DrawAreaController>
  );
};

export default DrawArea;
