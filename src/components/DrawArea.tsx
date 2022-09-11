import React, { useEffect } from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import { useSvgObjectList } from "../states/svgObjectState";
import Grids from "./DrawArea/Grids";
import SvgObject from "./shared/SvgObject";
import Controller from "./Controller";
import { useSetDrawMode } from "../states/drawModeState";

const DrawArea: React.FC = () => {
  const { height, width } = useWindowSize();
  const { changeMode } = useSetDrawMode();
  const { svgObjectList } = useSvgObjectList();

  useEffect(() => {
    changeMode("line");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller>
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
      </svg>
    </Controller>
  );
};

export default DrawArea;
