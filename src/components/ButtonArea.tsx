/* eslint-disable no-console */
import { HorizontalRule, ShowChart, TextFields } from "@mui/icons-material";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CircleIcon from "@mui/icons-material/Circle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Fab, SvgIcon, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useDrawMode } from "../states/drawModeState";
import { ReactComponent as CursorIcon } from "../assets/CursorIcon.svg";
import { useResetPreview } from "../hooks/useResetPreview";
import { useView } from "../hooks/useView";

const ButtonArea: React.FC = () => {
  const { drawMode, changeMode } = useDrawMode();
  const { resetPreview } = useResetPreview();
  const { toJSON, fromJSON } = useView();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetPreview(), [drawMode]);

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
      <Tooltip title="upload" style={{ marginLeft: 5 }} arrow>
        <Fab
          aria-label="upload"
          color="default"
          onClick={() =>
            fromJSON(
              '{"allSvgObject":[{"id":"1S3uh_bkOA7E5OgvtJ20z","type":"polyline","fixedPoint":{"vx":14,"vy":34},"points":[{"vx":0,"vy":0},{"vx":31,"vy":-2},{"vx":26,"vy":-13},{"vx":13,"vy":0},{"vx":15,"vy":12},{"vx":28,"vy":18},{"vx":37,"vy":10},{"vx":39,"vy":-3},{"vx":30,"vy":-8},{"vx":26,"vy":-9}],"style":{"stroke":"black","fill":"none"}},{"type":"text","configMap":[["text","text"]],"style":{"stroke":"black"},"id":"apVXTmfz65U4StbVxB_dC","fixedPoint":{"vx":37,"vy":43},"point":{"vx":0,"vy":0}},{"id":"gBH2zr6VCDvd7_q1fL-vB","type":"rect","upperLeft":{"vx":0,"vy":0},"fixedPoint":{"vx":22,"vy":19},"style":{"stroke":"black","fill":"none"},"size":{"vx":32,"vy":26}},{"id":"A2HWQ2PsgdRIgXBvmlFso","type":"circle","fixedPoint":{"vx":23,"vy":39},"style":{"stroke":"black","fill":"none"},"r":{"vx":2.5,"vy":2},"c":{"vx":2.5,"vy":2}},{"id":"8b-ouYq0zaXiK_46AHPOz","type":"line","fixedPoint":{"vx":18,"vy":15},"point1":{"vx":0,"vy":0},"style":{"stroke":"black"},"point2":{"vx":47,"vy":49}}]}'
            )
          }
        >
          <FileUploadIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="download" style={{ marginLeft: 5 }} arrow>
        <Fab aria-label="download" color="default" onClick={() => toJSON()}>
          <FileDownloadIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ButtonArea;
