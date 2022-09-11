import { useDrawMode } from "../states/drawModeState";
import { useSvgObject } from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";

export const useOnMouseMove = () => {
  const { drawMode } = useDrawMode();
  const { svgObject: obj, addOrUpdateSvgObject: updatePreview } = useSvgObject(
    "preview" as SvgId
  );
  const { toVirtual } = usePoint();

  const omMouseMoveLine = (obj: LineObject | null, v: VirtualPoint) => {
    if (!obj?.point1) return;

    updatePreview({
      ...obj,
      point2: v,
    });
  };

  const omMouseMovePolyline = (obj: PolylineObject | null, v: VirtualPoint) => {
    if (!obj?.points.length) return;

    updatePreview({
      ...obj,
      previewPoint: v,
    });
  };

  const omMouseMove = (x: number, y: number) => {
    const v = toVirtual(rp.create(x, y));

    switch (drawMode.mode) {
      case "line": {
        if (obj && obj.type !== "line") break;
        omMouseMoveLine(obj, v);
        break;
      }
      case "polyline": {
        if (obj && obj.type !== "polyline") break;
        omMouseMovePolyline(obj, v);
        break;
      }
      case "text": {
        break;
      }
      default:
    }
  };

  return { omMouseMove };
};
