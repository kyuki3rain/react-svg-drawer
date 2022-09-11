/* eslint-disable no-console */
import { HorizontalRule } from "@mui/icons-material";
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
          disabled={drawMode.mode === "selector"}
          color="primary"
          onClick={() => changeMode("selector")}
        >
          <SvgIcon>
            <CursorIcon></CursorIcon>
          </SvgIcon>
        </Fab>
      </Tooltip>
      <Tooltip title="line" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="line"
          disabled={drawMode.mode === "line"}
          color="primary"
          onClick={() => changeMode("line")}
        >
          <HorizontalRule />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ButtonArea;
