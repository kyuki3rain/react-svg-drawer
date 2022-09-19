import TextFieldsIcon from "@mui/icons-material/TextFields";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CircleIcon from "@mui/icons-material/Circle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import { Fab, SvgIcon, Tooltip } from "@mui/material";
import React from "react";
import { ReactComponent as CursorIcon } from "../../assets/CursorIcon.svg";
import { useModeButtons } from "../../hooks/useModeButtons";

const ModeButtons: React.FC = () => {
  const { drawMode, changeMode } = useModeButtons();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <Tooltip title="selector" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="selector"
          color={drawMode.mode === "selector" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "selector" && changeMode("selector")}
        >
          <SvgIcon>
            <CursorIcon />
          </SvgIcon>
        </Fab>
      </Tooltip>
      <Tooltip title="line" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="line"
          color={drawMode.mode === "line" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "line" && changeMode("line")}
        >
          <HorizontalRuleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="polyline" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="polyline"
          color={drawMode.mode === "polyline" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "polyline" && changeMode("polyline")}
        >
          <ShowChartIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="text" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="text"
          color={drawMode.mode === "text" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "text" && changeMode("text")}
        >
          <TextFieldsIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="rect" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="rect"
          color={drawMode.mode === "rect" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "rect" && changeMode("rect")}
        >
          <RectangleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="circle" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="circle"
          color={drawMode.mode === "circle" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "circle" && changeMode("circle")}
        >
          <CircleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="copy" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="copy"
          color={drawMode.mode === "copy" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "copy" && changeMode("copy")}
        >
          <ContentCopyIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="move" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="move"
          color={drawMode.mode === "move" ? "success" : "primary"}
          onClick={() => drawMode.mode !== "move" && changeMode("move")}
        >
          <MoveDownIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ModeButtons;
