import { useSvgObjects } from "../states/svgObjectState";
import * as vp from "../helpers/virtualPoint";
import { usePoint } from "./usePoint";

export const useGroup = () => {
  const { updateFixedPoint, setSvgObjectList, deleteObjects } = useSvgObjects();
  const { rootPoint } = usePoint();

  const createPreviewGroup = (newPoint: VirtualPoint, ids: SvgId[]) => {
    const correction = vp.sub(newPoint, rootPoint);
    updateFixedPoint([...ids], correction);
  };

  const deletePreviewGroup = (obj: GroupObject) => {
    if (!obj.fixedPoint) return;

    const correction = vp.sub(rootPoint, obj.fixedPoint);
    updateFixedPoint(obj.objectIds, correction);
    if (obj.isCopy)
      setSvgObjectList((prev) => {
        obj.objectIds.map((id) => prev.add(id));
        return new Set(prev);
      });
  };

  const resetPreviewGroup = (obj: GroupObject) => {
    if (!obj.fixedPoint) return;

    const correction = vp.sub(rootPoint, obj.fixedPoint);
    updateFixedPoint(obj.objectIds, correction);
    if (obj.isCopy) deleteObjects(obj.objectIds);
  };

  return { createPreviewGroup, deletePreviewGroup, resetPreviewGroup };
};
