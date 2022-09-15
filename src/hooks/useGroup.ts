import {
  useSetSvgObjectList,
  usePreviewSvgObjects,
} from "../states/svgObjectState";
import * as vp from "../helpers/virtualPoint";
import { usePoint } from "./usePoint";

export const useGroup = () => {
  const { updateFixedPoint, deleteObjects } = usePreviewSvgObjects();
  const { addIds, deleteIds } = useSetSvgObjectList();
  const { rootPoint } = usePoint();

  const grouping = (newPoint: VirtualPoint, ids: SvgId[]) => {
    updateFixedPoint([...ids], newPoint);
    deleteIds(ids);
  };

  const ungrouping = (obj: GroupObject) => {
    if (!obj.fixedPoint) return;

    const correction = vp.sub(vp.create(0, 0), obj.fixedPoint);
    updateFixedPoint(obj.objectIds, correction);
    addIds(obj.objectIds);
  };

  const resetPreviewGroup = (obj: GroupObject) => {
    if (!obj.fixedPoint) return;

    if (obj.isCopy) deleteObjects(obj.objectIds);
    else {
      const correction = vp.sub(rootPoint, obj.fixedPoint);
      updateFixedPoint(obj.objectIds, correction);
    }
  };

  return { grouping, ungrouping, resetPreviewGroup };
};
