import React from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import Grids from "./DrawArea/Grids";

const DrawArea: React.FC = () => {
  const { height, width } = useWindowSize();

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "fixed", right: 0 }}
      viewBox={`0, 0, ${width}, ${height}`}
      onClick={() => {
        console.log("onClick");
      }}
      onContextMenu={() => {
        console.log("onContextMenu");
      }}
    >
      <Grids />
    </svg>
  );
};

export default DrawArea;
