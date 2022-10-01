import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";
import { rp } from "../helpers/realPoint";
import { areaConfigState } from "../states/areaConfigState";
import { drawModeState } from "../states/drawModeState";
import { svgObjectStates } from "../states/svgObjectState";
import { useGroupingObject } from "./useGroupingObject";
import { useSelect } from "./useSelect";
import { useSvgObject } from "./useSvgObject";

export const useOnClickObject = () => {
  const { select, unselect, resetSelect } = useSelect();
  const { addObject, copyObject, deleteObject } = useSvgObject();
  const { groupingObject, ungroupingObject } = useGroupingObject();

  const onClickObject = useRecoilCallback(
    ({ snapshot }) =>
      (id: SvgId, isSelected: boolean, isShift: boolean) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;

        if (isSelected) {
          if (isShift) unselect(id);
        } else select(id, isShift);

        return true;
      },
    [select, unselect]
  );

  const onMouseDownObject = useRecoilCallback(
    ({ snapshot, set }) =>
      (isSelected: boolean, x: number, y: number) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;
        if (!isSelected) return false;

        const selectObject = snapshot
          .getLoadable(svgObjectStates("select"))
          .getValue();
        if (selectObject?.type !== "group") return;

        const { pitch, upperLeft } = snapshot
          .getLoadable(areaConfigState)
          .getValue();
        const v = rp.toVirtual(rp.create(x, y), pitch, upperLeft);

        set(drawModeState, "move");
        if (selectObject) {
          const newId = nanoid() as SvgId;
          addObject(selectObject, newId);
          groupingObject(v, [newId], "preview");
        }

        return true;
      },
    [addObject, groupingObject]
  );

  const onMouseUpObject = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        console.log(drawMode);
        if (drawMode !== "copy" && drawMode !== "move") return false;

        const previewObject = snapshot
          .getLoadable(svgObjectStates("preview"))
          .getValue();
        console.log(previewObject);
        if (!previewObject) return false;
        if (previewObject.type !== "group") return false;
        if (previewObject.objectIds.length !== 1) return false;

        const object = snapshot
          .getLoadable(svgObjectStates(previewObject.objectIds[0]))
          .getValue();
        console.log(object);
        if (!object) return false;
        if (object.type !== "group") return false;

        if (drawMode === "copy") {
          resetSelect();
          ungroupingObject("preview");
          const newId = copyObject(previewObject.objectIds[0]);
          deleteObject(previewObject.objectIds[0]);
          if (newId) ungroupingObject(newId);
        } else {
          resetSelect(true);
          ungroupingObject("preview");
          ungroupingObject(previewObject.objectIds[0]);
          object.objectIds.map((id) => select(id, true));
        }

        set(drawModeState, "selector");

        return true;
      },
    [copyObject, deleteObject, resetSelect, select, ungroupingObject]
  );

  return {
    onClickObject,
    onMouseDownObject,
    onMouseUpObject,
  };
};
