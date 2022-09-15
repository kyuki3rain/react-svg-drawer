import { useSetSvgObjectList, useSvgObjects } from "../states/svgObjectState";
import * as vp from "../helpers/virtualPoint";

export const useGroup = () => {
  const { updateFixedPoint, deleteObjects } = useSvgObjects();
  const { addIds, deleteIds } = useSetSvgObjectList();

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
      const correction = vp.sub(vp.create(0, 0), obj.firstFixedPoint);
      updateFixedPoint(obj.objectIds, correction);
      addIds(obj.objectIds);
    }
  };

  return { grouping, ungrouping, resetPreviewGroup };
};
