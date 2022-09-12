/* eslint-disable no-console */
import { HorizontalRule, ShowChart, TextFields } from "@mui/icons-material";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CircleIcon from "@mui/icons-material/Circle";
import { Fab, SvgIcon, Tooltip } from "@mui/material";
import React from "react";
import { useDrawMode } from "../states/drawModeState";
import { ReactComponent as CursorIcon } from "../assets/CursorIcon.svg";

const ButtonArea: React.FC = () => {
  const { drawMode, changeMode } = useDrawMode();

  return (
    <div style={{ float: "left", marginTop: 5 }}>
      <Tooltip title="selector" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="selector"
          color={drawMode.mode === "selector" ? "secondary" : "primary"}
          onClick={() => drawMode.mode !== "selector" && changeMode("selector")}
        >
          <SvgIcon>
            <CursorIcon></CursorIcon>
          </SvgIcon>
        </Fab>
      </Tooltip>
      <Tooltip title="line" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="line"
          color={drawMode.mode === "line" ? "secondary" : "primary"}
          onClick={() => drawMode.mode !== "line" && changeMode("line")}
        >
          <HorizontalRule />
        </Fab>
      </Tooltip>
      <Tooltip title="polyline" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="polyline"
          color={drawMode.mode === "polyline" ? "secondary" : "primary"}
          onClick={() => drawMode.mode !== "polyline" && changeMode("polyline")}
        >
          <ShowChart />
        </Fab>
      </Tooltip>
      <Tooltip title="text" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="text"
          color={drawMode.mode === "text" ? "secondary" : "primary"}
          onClick={() => drawMode.mode !== "text" && changeMode("text")}
        >
          <TextFields />
        </Fab>
      </Tooltip>
      <Tooltip title="rect" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="rect"
          color={drawMode.mode === "rect" ? "secondary" : "primary"}
          onClick={() => drawMode.mode !== "rect" && changeMode("rect")}
        >
          <RectangleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="circle" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="circle"
          color={drawMode.mode === "circle" ? "secondary" : "primary"}
          onClick={() => drawMode.mode !== "circle" && changeMode("circle")}
        >
          <CircleIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ButtonArea;
