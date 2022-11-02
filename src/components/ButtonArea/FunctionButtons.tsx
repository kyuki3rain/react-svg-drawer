import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { Fab, Tooltip } from "@mui/material";
import React from "react";
import { useFunctionButton } from "../../hooks/buttons/useFunctionButton";
import ButtonWithMenu from "../common/ButtonWithMenu";

const FunctionButtons: React.FC = () => {
  const {
    canUndo,
    canRedo,
    redo,
    undo,
    grouping,
    ungrouping,
    saveFile,
    loadFile,
    newFile,
    importObjects,
    importFile,
    exportObjects,
    exportFile,
    logFile,
  } = useFunctionButton();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
      }}
    >
      <Tooltip title="undo" style={{ marginRight: 5 }} arrow>
        <Fab color="info" aria-label="undo" onClick={undo} disabled={!canUndo}>
          <UndoIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="redo" arrow style={{ marginRight: 5 }}>
        <Fab color="info" aria-label="redo" onClick={redo} disabled={!canRedo}>
          <RedoIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="grouping" style={{ marginRight: 5 }} arrow>
        <Fab aria-label="grouping" color="default" onClick={grouping}>
          <LinkIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="ungrouping" style={{ marginRight: 5 }} arrow>
        <Fab aria-label="ungrouping" color="default" onClick={ungrouping}>
          <LinkOffIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="new" style={{ marginRight: 5 }} arrow>
        <Fab aria-label="new" color="default" onClick={newFile}>
          <NoteAddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="save" style={{ marginRight: 5 }} arrow>
        <Fab aria-label="save" color="default" onClick={saveFile}>
          <CloudUploadIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="load" style={{ marginRight: 5 }} arrow>
        <Fab aria-label="load" color="default" onClick={loadFile}>
          <CloudDownloadIcon />
        </Fab>
      </Tooltip>
      <ButtonWithMenu
        title="import"
        icon={<FileUploadIcon />}
        items={[
          { title: "objects", onClick: () => importObjects() },
          { title: "file", onClick: () => importFile() },
        ]}
      ></ButtonWithMenu>
      <ButtonWithMenu
        title="export"
        icon={<FileDownloadIcon />}
        items={[
          { title: "objects", onClick: () => exportObjects() },
          { title: "file", onClick: () => exportFile() },
        ]}
      ></ButtonWithMenu>
      <Tooltip title="log" style={{ marginRight: 5 }} arrow>
        <Fab aria-label="log" color="default" onClick={logFile}>
          <LogoDevIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default FunctionButtons;
