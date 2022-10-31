import TextFieldsIcon from "@mui/icons-material/TextFields";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Fab, SvgIcon, Tooltip } from "@mui/material";
import React from "react";
import { ReactComponent as CursorIcon } from "../../assets/CursorIcon.svg";
import { useModeButtons } from "../../hooks/buttons/useModeButtons";

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
          color={drawMode === "selector" ? "success" : "primary"}
          onClick={() => drawMode !== "selector" && changeMode("selector")}
        >
          <SvgIcon>
            <CursorIcon />
          </SvgIcon>
        </Fab>
      </Tooltip>
      <Tooltip title="line" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="line"
          color={drawMode === "line" ? "success" : "primary"}
          onClick={() => drawMode !== "line" && changeMode("line")}
        >
          <HorizontalRuleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="polyline" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="polyline"
          color={drawMode === "polyline" ? "success" : "primary"}
          onClick={() => drawMode !== "polyline" && changeMode("polyline")}
        >
          <ShowChartIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="text" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="text"
          color={drawMode === "text" ? "success" : "primary"}
          onClick={() => drawMode !== "text" && changeMode("text")}
        >
          <TextFieldsIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="rect" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="rect"
          color={drawMode === "rect" ? "success" : "primary"}
          onClick={() => drawMode !== "rect" && changeMode("rect")}
        >
          <RectangleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="circle" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="circle"
          color={drawMode === "circle" ? "success" : "primary"}
          onClick={() => drawMode !== "circle" && changeMode("circle")}
        >
          <CircleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="delete" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="delete"
          color={drawMode === "delete" ? "success" : "primary"}
          onClick={() => drawMode !== "delete" && changeMode("delete")}
        >
          <DeleteForeverIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ModeButtons;
