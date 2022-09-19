import { drawModeState } from "../../states/drawModeState";
import { svgObjectStates, useSetSvgObject } from "../../states/svgObjectState";
import * as rp from "../../helpers/realPoint";
import * as vp from "../../helpers/virtualPoint";
import { configModalState } from "../../states/configModalState";
import { useCallback } from "react";
import { usePoint } from "../../operators/usePoint";
import { useRecoilCallback } from "recoil";

export const useOnMouseMoveController = () => {
  const { addOrUpdateSvgObject } = useSetSvgObject("preview");
  const { toVirtual } = usePoint();

  const omMouseMoveLine = useCallback(
    (obj: LineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      addOrUpdateSvgObject({
        ...obj,
        point2: vp.sub(v, obj.fixedPoint),
      });
    },
    [addOrUpdateSvgObject]
  );

  const omMouseMovePolyline = useCallback(
    (obj: PolylineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      addOrUpdateSvgObject({
        ...obj,
        previewPoint: vp.sub(v, obj.fixedPoint),
      });
    },
    [addOrUpdateSvgObject]
  );

  const onMouseMoveText = useCallback(
    (obj: TextObject | null, v: VirtualPoint) => {
      if (!obj) return;

      addOrUpdateSvgObject({
        ...obj,
        fixedPoint: v,
        point: vp.create(0, 0),
      });
    },
    [addOrUpdateSvgObject]
  );

  const onMouseMoveRect = useCallback(
    (obj: RectObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      const diff = vp.sub(v, obj.fixedPoint);
      if (diff.vx == 0 || diff.vy == 0) {
        addOrUpdateSvgObject({
          ...obj,
          size: undefined,
        });
        return;
      }

      addOrUpdateSvgObject({
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
    [addOrUpdateSvgObject]
  );

  const onMouseMoveCircle = useCallback(
    (obj: CircleObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) return;

      const c = vp.divConst(vp.sub(v, obj.fixedPoint), 2);
      const r = vp.abs(c);

      addOrUpdateSvgObject({
        ...obj,
        r,
        c,
      });
    },
    [addOrUpdateSvgObject]
  );

  const onMouseMoveGroup = useCallback(
    (obj: GroupObject | null, v: VirtualPoint) => {
      if (!obj) return;

      addOrUpdateSvgObject({
        ...obj,
        fixedPoint: v,
      });
    },
    [addOrUpdateSvgObject]
  );

  const omMouseMove = useRecoilCallback(
    ({ snapshot }) =>
      (x: number, y: number) => {
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
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
