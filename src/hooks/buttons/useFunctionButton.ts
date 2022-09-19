import { nanoid } from "nanoid";
import { useCallback, useRef } from "react";
import { useRecoilCallback } from "recoil";
import { useJSON } from "../../operators/useJSON";
import { logIndexAtom, logsAtom, stopLogState } from "../../states/logState";
import {
  selectedSvgIdState,
  useSelectedSvgId,
} from "../../states/selectedSvgIdState";
import {
  allSvgObjectSelector,
  useSetSvgObject,
  useSetSvgObjectList,
  useSvgObjects,
} from "../../states/svgObjectState";
import * as vp from "../../helpers/virtualPoint";
import { useFileUpload } from "../../operators/useFileUpload";
import dayjs from "dayjs";

const defaultJSON = JSON.stringify({
  appName: __APP_NAME__,
  version: __APP_VERSION__,
  objects: [],
});

export const useFunctionButton = () => {
  const { fromJSON, toJSON } = useJSON();
  const { uploadFile } = useFileUpload();

  const { resetSelect, select } = useSelectedSvgId();
  const id = useRef(nanoid() as SvgId);
  const { addOrUpdateSvgObject } = useSetSvgObject(id.current);
  const { updateFixedPoint, getObjects, deleteObjects } = useSvgObjects();
  const { addIds, deleteIds } = useSetSvgObjectList();

  const resetId = useCallback(() => (id.current = nanoid() as SvgId), []);

  const undo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const logs = snapshot.getLoadable(logsAtom).getValue();
        const nextIndex = snapshot.getLoadable(logIndexAtom).getValue() - 1;
        set(allSvgObjectSelector, logs[nextIndex - 1].objects);
        set(logIndexAtom, nextIndex);
        set(stopLogState, true);
      },
    []
  );

  const redo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const logs = snapshot.getLoadable(logsAtom).getValue();
        const nextIndex = snapshot.getLoadable(logIndexAtom).getValue() + 1;
        set(allSvgObjectSelector, logs[nextIndex - 1].objects);
        set(logIndexAtom, nextIndex);
        set(stopLogState, true);
      },
    []
  );

  const grouping = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const selectedSvgId = snapshot
          .getLoadable(selectedSvgIdState)
          .getValue();
        updateFixedPoint([...selectedSvgId], vp.create(0, 0));
        deleteIds([...selectedSvgId]);
        addOrUpdateSvgObject({
          type: "group" as const,
          objectIds: [...selectedSvgId],
          fixedPoint: vp.create(0, 0),
          firstFixedPoint: vp.create(0, 0),
          style: {},
          isCopy: false,
        });
        resetId();
        resetSelect();
        select(id.current);
      },
    [
      addOrUpdateSvgObject,
      deleteIds,
      resetId,
      resetSelect,
      select,
      updateFixedPoint,
    ]
  );

  const ungrouping = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const selectedSvgId = snapshot
          .getLoadable(selectedSvgIdState)
          .getValue();
        getObjects([...selectedSvgId]).map((obj) => {
          if (!obj || obj.type !== "group") return;
          if (!obj.id || obj.id === "preview") return;

          if (!obj.fixedPoint) return;

          const correction = vp.sub(vp.create(0, 0), obj.fixedPoint);
          updateFixedPoint(obj.objectIds, correction);
          addIds(obj.objectIds);
          deleteObjects([obj.id]);
          obj.objectIds.map((objId) => select(objId));
        });
      },
    [addIds, deleteObjects, getObjects, select, updateFixedPoint]
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
  }, [fromJSON]);

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
