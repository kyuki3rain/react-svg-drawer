import { useDrawMode } from "../states/drawModeState";
import { useSvgObject } from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";
import { useConfigModal } from "../states/configModalState";

export const useOnMouseMove = () => {
  const { drawMode } = useDrawMode();
  const { svgObject: obj, addOrUpdateSvgObject: updatePreview } =
    useSvgObject("preview");
  const { toVirtual } = usePoint();
  const { isOpen } = useConfigModal();

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

  const onMouseMoveText = (obj: TextObject | null, v: VirtualPoint) => {
    if (!obj) return;

    updatePreview({
      ...obj,
      point: v,
    });
  };

  const omMouseMove = (x: number, y: number) => {
    if (isOpen) return;
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
        if (obj && obj.type !== "text") break;
        onMouseMoveText(obj, v);
        break;
      }
      default:
    }
  };

  return { omMouseMove };
};
