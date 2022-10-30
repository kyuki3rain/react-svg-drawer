import { useCallback } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useJSON } from "../../operators/useJSON";
import { logIndexState, logsState, stopLogState } from "../../states/logState";
import { useFileUpload } from "../../operators/useFileUpload";
import dayjs from "dayjs";
import {
  redoEnableSelector,
  undoEnableSelector,
} from "../../selectors/logSelector";
import { allSvgObjectSelector } from "../../selectors/objectSelector";
import { useGroupingObject } from "../../operators/useGroupingObject";
import { useLog } from "../../operators/useLog";
import { vp } from "../../helpers/virtualPoint";
import { useSelect } from "../../operators/useSelect";

const defaultJSON = JSON.stringify({
  appName: __APP_NAME__,
  version: __APP_VERSION__,
  objects: [],
});

export const useFunctionButton = () => {
  const canUndo = useRecoilValue(undoEnableSelector);
  const canRedo = useRecoilValue(redoEnableSelector);

  const { fromJSON, toJSON } = useJSON();
  const { uploadFile } = useFileUpload();
  const { groupingSelectedObject, ungroupingSelectedObject } =
    useGroupingObject();
  const { resetLog } = useLog();
  const { resetSelect } = useSelect();

  const undo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const logs = snapshot.getLoadable(logsState).getValue();
        const nextIndex = snapshot.getLoadable(logIndexState).getValue() - 1;
        set(allSvgObjectSelector, logs[nextIndex - 1].objects);
        set(logIndexState, nextIndex);
        set(stopLogState, true);
        resetSelect();
      },
    [resetSelect]
  );

  const redo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const logs = snapshot.getLoadable(logsState).getValue();
        const nextIndex = snapshot.getLoadable(logIndexState).getValue() + 1;
        set(allSvgObjectSelector, logs[nextIndex - 1].objects);
        set(logIndexState, nextIndex);
        set(stopLogState, true);
        resetSelect();
      },
    [resetSelect]
  );

  const grouping = useCallback(
    () => groupingSelectedObject(vp.zero()),
    [groupingSelectedObject]
  );

  const ungrouping = useCallback(
    () => ungroupingSelectedObject(),
    [ungroupingSelectedObject]
  );

  const saveFile = useCallback(() => {
    const json = toJSON();

    localStorage.setItem("view", json);
  }, [toJSON]);

  const loadFile = useCallback(() => {
    const json = localStorage.getItem("view");
    if (!json) {
      console.error("Cannot load a backup view");
      return;
    }

    fromJSON(json);
  }, [fromJSON]);

  const newFile = useCallback(() => {
    fromJSON(defaultJSON);
    resetLog();
  }, [fromJSON, resetLog]);

  const importFile = useCallback(() => {
    if (!uploadFile) return;
    uploadFile({ accept: "*.json", multiple: false }, (p) => {
      p[0].file.text().then((s) => {
        fromJSON(s);
      });
    });
  }, [fromJSON, uploadFile]);

  const exportFile = useCallback(() => {
    const fileName =
      "svg_drawer_" + dayjs().format("YYYYMMDD_HHmmss") + ".json";
    const data = new Blob([toJSON()], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  }, [toJSON]);

  const logFile = useCallback(() => console.log(toJSON()), [toJSON]);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    grouping,
    ungrouping,
    saveFile,
    loadFile,
    newFile,
    importFile,
    exportFile,
    logFile,
  };
};
