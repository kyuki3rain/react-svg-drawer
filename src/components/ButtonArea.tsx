/* eslint-disable no-console */
import { HorizontalRule, ShowChart, TextFields } from "@mui/icons-material";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CircleIcon from "@mui/icons-material/Circle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Fab, SvgIcon, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useDrawMode } from "../states/drawModeState";
import { ReactComponent as CursorIcon } from "../assets/CursorIcon.svg";
import { useResetPreview } from "../hooks/useResetPreview";
import { useView } from "../hooks/useView";
import { useSave } from "../hooks/useSave";

const ButtonArea: React.FC = () => {
  const { drawMode, changeMode } = useDrawMode();
  const { resetPreview } = useResetPreview();
  const { importJSON, exportJSON } = useView();
  const { save, load, newView } = useSave();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetPreview(), [drawMode]);

  return (
    <div style={{ float: "left", marginTop: 5 }}>
      <div style={{ marginBottom: 10 }}>
        <Tooltip title="selector" style={{ marginLeft: 5 }} arrow>
          <Fab
            aria-label="selector"
            color={drawMode.mode === "selector" ? "secondary" : "primary"}
            onClick={() =>
              drawMode.mode !== "selector" && changeMode("selector")
            }
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
            onClick={() =>
              drawMode.mode !== "polyline" && changeMode("polyline")
            }
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
      <div>
        <Tooltip title="new" style={{ marginLeft: 5 }} arrow>
          <Fab aria-label="new" color="default" onClick={newView}>
            <NoteAddIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="save" style={{ marginLeft: 5 }} arrow>
          <Fab aria-label="save" color="default" onClick={save}>
            <CloudUploadIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="load" style={{ marginLeft: 5 }} arrow>
          <Fab aria-label="load" color="default" onClick={load}>
            <CloudDownloadIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="import" style={{ marginLeft: 5 }} arrow>
          <Fab aria-label="import" color="default" onClick={importJSON}>
            <FileUploadIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="export" style={{ marginLeft: 5 }} arrow>
          <Fab aria-label="export" color="default" onClick={exportJSON}>
            <FileDownloadIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default ButtonArea;
