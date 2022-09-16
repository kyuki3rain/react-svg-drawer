import { useSetSvgObjectList, useSvgObjects } from "../states/svgObjectState";
import * as vp from "../helpers/virtualPoint";
import { useCallback } from "react";

export const useGroup = () => {
  const { updateFixedPoint, deleteObjects } = useSvgObjects();
  const { addIds, deleteIds } = useSetSvgObjectList();

  const grouping = useCallback(
    (newPoint: VirtualPoint, ids: SvgId[]) => {
      updateFixedPoint([...ids], newPoint);
      deleteIds(ids);
    },
    [deleteIds, updateFixedPoint]
  );

  const ungrouping = useCallback(
    (obj: GroupObject) => {
      if (!obj.fixedPoint) return;

      const correction = vp.sub(vp.create(0, 0), obj.fixedPoint);
      updateFixedPoint(obj.objectIds, correction);
      addIds(obj.objectIds);
    },
    [addIds, updateFixedPoint]
  );

  const resetPreviewGroup = useCallback(
    (obj: GroupObject) => {
      if (!obj.fixedPoint) return;

      if (obj.isCopy) {
        deleteObjects(obj.objectIds);
      } else {
        const correction = vp.sub(vp.create(0, 0), obj.firstFixedPoint);
        updateFixedPoint(obj.objectIds, correction);
        addIds(obj.objectIds);
      }
    },
    [addIds, deleteObjects, updateFixedPoint]
  );

  return { grouping, ungrouping, resetPreviewGroup };
};
