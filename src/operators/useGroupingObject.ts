import { useRecoilCallback } from "recoil";
import { svgObjectStates } from "../states/svgObjectState";
import { useSelect } from "./useSelect";
import { useSvgObject } from "./useSvgObject";
import { useSvgObjectList } from "./useSvgObjectList";
import { useCorrectFixedPoint } from "./useCorrectFixedPoint";
import { nanoid } from "nanoid";
import { usePreview } from "./usePreview";
import { useCallback } from "react";
import { vp } from "../helpers/virtualPoint";
import { selectObjectSelector } from "../selectors/selectObjectSelector";

export const useGroupingObject = () => {
  const { resetSelect, select } = useSelect();
  const { addObject, deleteObject, copyObject } = useSvgObject();
  const { updateFixedPoints } = useCorrectFixedPoint();
  const { includeIds, excludeIds } = useSvgObjectList();
  const { updatePreview, deletePreview } = usePreview();

  const groupingObject = useCallback(
    (
      parentPoint: VirtualPoint,
      ids: SvgId[],
      id: SvgId | "preview" | "select" = nanoid() as SvgId
    ) => {
      if (id === "select") return;
      updateFixedPoints(ids, parentPoint);
      excludeIds(ids);

      const groupObject = {
        type: "group" as const,
        objectIds: ids,
        fixedPoint: parentPoint as VirtualAbsolute,
        firstFixedPoint: parentPoint as VirtualAbsolute,
        style: {},
        isCopy: false,
      };

      if (id === "preview") {
        updatePreview(groupObject);
        return;
      } else {
        addObject(groupObject, id);
        return id;
      }
    },
    [addObject, excludeIds, updateFixedPoints, updatePreview]
  );

  const ungroupingObject = useRecoilCallback(
    ({ snapshot }) =>
      (id: SvgId | "preview", parentPoint?: VirtualPoint) => {
        const obj = snapshot.getLoadable(svgObjectStates(id)).getValue();
        if (!obj || obj.type !== "group") return;
        if (!obj.fixedPoint) return;

        const correction = vp.sub(vp.zero(), parentPoint ?? obj.fixedPoint);
        updateFixedPoints(obj.objectIds, correction);
        includeIds(obj.objectIds);

        if (id === "preview") {
          deletePreview();
          return;
        } else {
          deleteObject(id);
          return id;
        }
      },
    [deleteObject, deletePreview, includeIds, updateFixedPoints]
  );

  const groupingPreview = useRecoilCallback(
    ({ snapshot }) =>
      (parentPoint: VirtualPoint, withCopy?: boolean) => {
        const selectedIdList = snapshot
          .getLoadable(selectObjectSelector)
          .getValue();
        const newIds = withCopy
          ? selectedIdList.map((id) => copyObject(id)).flatMap((x) => x ?? [])
          : selectedIdList;
        groupingObject(parentPoint, newIds, "preview");
      }
  );
  const ungroupingPreview = (parentPoint: VirtualPoint) =>
    ungroupingObject("preview", parentPoint);

  const groupingSelectedObject = useRecoilCallback(
    ({ snapshot }) =>
      (parentPoint: VirtualPoint) => {
        const selectedIdList = snapshot
          .getLoadable(selectObjectSelector)
          .getValue();

        const newId = nanoid() as SvgId;
        groupingObject(parentPoint, selectedIdList, newId);

        resetSelect();
        select(newId);
      },
    [groupingObject, resetSelect, select]
  );

  const ungroupingSelectedObject = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const selectedIdList = snapshot
          .getLoadable(selectObjectSelector)
          .getValue();

        selectedIdList.forEach((id) => {
          const obj = snapshot.getLoadable(svgObjectStates(id)).getValue();
          if (!obj || !obj.fixedPoint) return;
          ungroupingObject(id);
        });

        resetSelect();
        selectedIdList.forEach((id) => {
          const obj = snapshot.getLoadable(svgObjectStates(id)).getValue();
          if (
            !obj ||
            !obj.id ||
            obj.id === "preview" ||
            obj.id === "select" ||
            !obj.fixedPoint
          )
            return;
          if (obj.type !== "group") select(obj.id);
          else obj.objectIds.map((objId) => select(objId));
        });
      },
    [resetSelect, select, ungroupingObject]
  );

  return {
    groupingObject,
    ungroupingObject,
    groupingPreview,
    ungroupingPreview,
    groupingSelectedObject,
    ungroupingSelectedObject,
  };
};
