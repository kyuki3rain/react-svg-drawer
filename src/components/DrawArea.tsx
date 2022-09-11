import React, { useEffect } from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import { useSetSvgObject, useSvgObjectList } from "../states/svgObjectState";
import Grids from "./DrawArea/Grids";
import * as vp from "../helpers/virtualPoint";
import SvgObject from "./shared/SvgObject";
import Controller from "./Controller";

const DrawArea: React.FC = () => {
  const { height, width } = useWindowSize();
  const { addOrUpdateSvgObject } = useSetSvgObject();
  const { svgObjectList } = useSvgObjectList();

  useEffect(() => {
    addOrUpdateSvgObject({
      type: "line",
      point1: vp.create(10, 10),
      point2: vp.create(20, 30),
      style: {
        stroke: "black",
      },
    });
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
