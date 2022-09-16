import { useDrawMode } from "../states/drawModeState";
import { useSvgObject } from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { useConfigModal } from "../states/configModalState";
import { useCallback } from "react";

export const useOnMouseMove = () => {
  const { drawMode } = useDrawMode();
  const { svgObject: obj, addOrUpdateSvgObject: updatePreview } =
    useSvgObject("preview");
  const { toVirtual } = usePoint();
  const { isOpen } = useConfigModal();

  const omMouseMoveLine = useCallback(
    (obj: LineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      updatePreview({
        ...obj,
        point2: vp.sub(v, obj.fixedPoint),
      });
    },
    [updatePreview]
  );

  const omMouseMovePolyline = useCallback(
    (obj: PolylineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      updatePreview({
        ...obj,
        previewPoint: vp.sub(v, obj.fixedPoint),
      });
    },
    [updatePreview]
  );

  const onMouseMoveText = useCallback(
    (obj: TextObject | null, v: VirtualPoint) => {
      if (!obj) return;

      updatePreview({
        ...obj,
        fixedPoint: v,
        point: vp.create(0, 0),
      });
    },
    [updatePreview]
  );

  const onMouseMoveRect = useCallback(
    (obj: RectObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      const diff = vp.sub(v, obj.fixedPoint);
      if (diff.vx == 0 || diff.vy == 0) {
        updatePreview({
          ...obj,
          size: undefined,
        });
        return;
      }

      if (diff.vx > 0 && diff.vy > 0) {
        updatePreview({
          ...obj,
          upperLeft: vp.create(0, 0),
          size: diff,
        });
      } else if (diff.vx > 0) {
        updatePreview({
          ...obj,
          upperLeft: vp.create(0, diff.vy),
          size: vp.create(diff.vx, -diff.vy),
        });
      } else if (diff.vy > 0) {
        updatePreview({
          ...obj,
          upperLeft: vp.create(diff.vx, 0),
          size: vp.create(-diff.vx, diff.vy),
        });
      } else {
        updatePreview({
          ...obj,
          upperLeft: diff,
          size: vp.create(-diff.vx, -diff.vy),
        });
      }
    },
    [updatePreview]
  );

  const onMouseMoveCircle = useCallback(
    (obj: CircleObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      const c = vp.divConst(vp.sub(v, obj.fixedPoint), 2);
      const r = vp.abs(c);

      updatePreview({
        ...obj,
        r,
        c,
      });
    },
    [updatePreview]
  );

  const onMouseMoveGroup = useCallback(
    (obj: GroupObject | null, v: VirtualPoint) => {
      if (!obj) return;

      updatePreview({
        ...obj,
        fixedPoint: v,
      });
    },
    [updatePreview]
  );

  const omMouseMove = useCallback(
    (x: number, y: number) => {
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
        case "rect": {
          if (obj && obj.type !== "rect") break;
          onMouseMoveRect(obj, v);
          break;
        }
        case "circle": {
          if (obj && obj.type !== "circle") break;
          onMouseMoveCircle(obj, v);
          break;
        }
        case "copy": {
          if (obj && obj.type !== "group") break;
          onMouseMoveGroup(obj, v);
          break;
        }
        case "move": {
          if (obj && obj.type !== "group") break;
          onMouseMoveGroup(obj, v);
          break;
        }
        default:
      }
    },
    [
      drawMode.mode,
      isOpen,
      obj,
      omMouseMoveLine,
      omMouseMovePolyline,
      onMouseMoveCircle,
      onMouseMoveGroup,
      onMouseMoveRect,
      onMouseMoveText,
      toVirtual,
    ]
  );

  return { omMouseMove };
};
