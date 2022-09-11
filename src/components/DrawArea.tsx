import React from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import { useSvgObjectList } from "../states/svgObjectState";
import Grids from "./DrawArea/Grids";
import SvgObject from "./shared/SvgObject";

const DrawArea: React.FC = () => {
  const { height, width } = useWindowSize();
  const { svgObjectList } = useSvgObjectList();

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "fixed", right: 0 }}
      viewBox={`0, 0, ${width}, ${height}`}
    >
      <Grids />
      {[...svgObjectList].map((id) => (
        <SvgObject svgId={id} key={id}></SvgObject>
      ))}
      <SvgObject svgId={"preview" as SvgId}></SvgObject>
    </svg>
  );
};

export default DrawArea;
