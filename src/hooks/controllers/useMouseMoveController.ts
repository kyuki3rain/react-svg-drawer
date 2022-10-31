import { drawModeState } from "../../states/drawModeState";
import { svgObjectStates } from "../../states/svgObjectState";
import { configModalState } from "../../states/configModalState";
import { useCallback, useRef } from "react";
import { usePoint } from "../../operators/usePoint";
import { useRecoilCallback } from "recoil";
import { usePreview } from "../../operators/usePreview";
import { vp } from "../../helpers/virtualPoint";
import { rp } from "../../helpers/realPoint";
import { useKeyControllerRef } from "../../operators/useKeyControllerRef";

export const useOnMouseMoveController = () => {
  const { updatePreview } = usePreview();
  const { toVirtual } = usePoint();
  const pointRef = useRef<VirtualPoint | null>(null);
  const { focus } = useKeyControllerRef();

  const omMouseMoveLine = useCallback(
    (obj: LineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      updatePreview({
        ...obj,
        point2: vp.sub(v, obj.fixedPoint) as VirtualAbsolute,
      });
    },
    [updatePreview]
  );

  const omMouseMovePolyline = useCallback(
    (obj: PolylineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      updatePreview({
        ...obj,
        previewPoint: vp.sub(v, obj.fixedPoint) as VirtualAbsolute,
      });
    },
    [updatePreview]
  );

  const onMouseMoveText = useCallback(
    (obj: TextObject | null, v: VirtualPoint) => {
      if (!obj) return;

      updatePreview({
        ...obj,
        fixedPoint: v as VirtualAbsolute,
        point: vp.zero() as VirtualAbsolute,
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
        ) as VirtualAbsolute,
        size: vp.create(
          diff.vx > 0 ? diff.vx : -diff.vx,
          diff.vy > 0 ? diff.vy : -diff.vy
        ) as VirtualRelative,
      });
    },
    [updatePreview]
  );

  const onMouseMoveCircle = useCallback(
    (obj: CircleObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      const c = vp.divConst(vp.sub(v, obj.fixedPoint), 2) as VirtualAbsolute;
      const r = vp.abs(c) as VirtualRelative;

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
        fixedPoint: v as VirtualAbsolute,
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

        focus();

        switch (drawMode) {
          case "selector": {
            switch (obj?.type) {
              case "group":
                onMouseMoveGroup(obj, v);
                break;
              case "rect":
                onMouseMoveRect(obj, v);
                break;
              default:
            }
            break;
          }
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
          default:
        }
      },
    [
      focus,
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
