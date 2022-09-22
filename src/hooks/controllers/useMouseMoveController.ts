import { drawModeState } from "../../states/drawModeState";
import { svgObjectStates } from "../../states/svgObjectState";
import { configModalState } from "../../states/configModalState";
import { useCallback, useRef } from "react";
import { usePoint } from "../../operators/usePoint";
import { useRecoilCallback } from "recoil";
import { usePreview } from "../../operators/usePreview";
import { vp } from "../../helpers/virtualPoint";
import { rp } from "../../helpers/realPoint";

export const useOnMouseMoveController = () => {
  const { updatePreview } = usePreview();
  const { toVirtual } = usePoint();
  const pointRef = useRef<VirtualPoint | null>(null);

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
        point: vp.zero(),
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

      updatePreview({
        ...obj,
        upperLeft: vp.create(
          diff.vx > 0 ? 0 : diff.vx,
          diff.vy > 0 ? 0 : diff.vy
        ),
        size: vp.create(
          diff.vx > 0 ? diff.vx : -diff.vx,
          diff.vy > 0 ? diff.vy : -diff.vy
        ),
      });
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

  const omMouseMove = useRecoilCallback(
    ({ snapshot }) =>
      (x: number, y: number) => {
        const v = toVirtual(rp.create(x, y));
        if (pointRef.current && vp.eq(v, pointRef.current)) return;
        pointRef.current = v;

        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
        if (isOpen) return;

        switch (drawMode) {
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
