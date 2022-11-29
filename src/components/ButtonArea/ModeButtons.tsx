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
import ButtonWithMenu from "../common/ButtonWithMenu";

const ModeButtons: React.FC = () => {
  const { drawMode, changeMode } = useModeButtons();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginLeft: 5,
      }}
    >
      <Tooltip title="selector" style={{ marginRight: 5 }} arrow>
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
      <ButtonWithMenu
        title="line"
        icon={<HorizontalRuleIcon />}
        color={
          drawMode === "line" || drawMode === "wire" ? "success" : "primary"
        }
        items={[
          {
            title: "line",
            onClick: () => drawMode !== "line" && changeMode("line"),
          },
          {
            title: "wire",
            onClick: () => drawMode !== "wire" && changeMode("wire"),
          },
        ]}
      ></ButtonWithMenu>
      <Tooltip title="polyline" style={{ marginRight: 5 }} arrow>
        <Fab
          aria-label="polyline"
          color={drawMode === "polyline" ? "success" : "primary"}
          onClick={() => drawMode !== "polyline" && changeMode("polyline")}
        >
          <ShowChartIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="text" style={{ marginRight: 5 }} arrow>
        <Fab
          aria-label="text"
          color={drawMode === "text" ? "success" : "primary"}
          onClick={() => drawMode !== "text" && changeMode("text")}
        >
          <TextFieldsIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="rect" style={{ marginRight: 5 }} arrow>
        <Fab
          aria-label="rect"
          color={drawMode === "rect" ? "success" : "primary"}
          onClick={() => drawMode !== "rect" && changeMode("rect")}
        >
          <RectangleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="circle" style={{ marginRight: 5 }} arrow>
        <Fab
          aria-label="circle"
          color={drawMode === "circle" ? "success" : "primary"}
          onClick={() => drawMode !== "circle" && changeMode("circle")}
        >
          <CircleIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="delete" style={{ marginRight: 5 }} arrow>
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
