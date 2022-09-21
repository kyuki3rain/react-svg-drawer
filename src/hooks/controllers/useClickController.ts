import { drawModeState } from "../../states/drawModeState";
import { svgObjectStates } from "../../states/svgObjectState";
import { usePoint } from "../../operators/usePoint";
import * as rp from "../../helpers/realPoint";
import * as vp from "../../helpers/virtualPoint";
import { useCallback } from "react";
import { configModalState } from "../../states/configModalState";
import { useRecoilCallback } from "recoil";
import { useSelect } from "../../operators/useSelect";
import { usePreview } from "../../operators/usePreview";
import { useSvgObject } from "../../operators/useSvgObject";
import { useGroupingObject } from "../../operators/useGroupingObject";

export const useClickController = () => {
  const { updatePreview, deletePreview } = usePreview();
  const { addObject } = useSvgObject();
  const { toVirtual } = usePoint();
  const { resetSelect } = useSelect();
  const { groupingPreview, ungroupingPreview } = useGroupingObject();

  const onClickLine = useCallback(
    (obj: LineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        updatePreview({
          id: "preview",
          type: "line",
          fixedPoint: v,
          point1: vp.create(0, 0),
          style: { stroke: "black" },
        });
        return;
      }

      addObject({
        ...obj,
        point2: vp.sub(v, obj.fixedPoint),
      });
      deletePreview();
    },
    [addObject, updatePreview, deletePreview]
  );

  const onClickPolyline = useCallback(
    (obj: PolylineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        updatePreview({
          id: "preview",
          type: "polyline",
          fixedPoint: v,
          points: [vp.create(0, 0)],
          style: { stroke: "black", fill: "none" },
        });
        return;
      }

      updatePreview({
        ...obj,
        points: [...obj.points, vp.sub(v, obj.fixedPoint)],
      });
    },
    [updatePreview]
  );

  const onClickText = useCallback(
    (obj: TextObject | null, v: VirtualPoint) => {
      if (!obj) return;
      addObject({
        ...obj,
        fixedPoint: v,
        point: vp.create(0, 0),
      });
    },
    [addObject]
  );

  const onClickRect = useCallback(
    (obj: RectObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        updatePreview({
          id: "preview",
          type: "rect",
          upperLeft: vp.create(0, 0),
          fixedPoint: v,
          style: { stroke: "black", fill: "none" },
        });
        return;
      }

      const diff = vp.sub(v, obj.fixedPoint);
      if (diff.vx == 0 || diff.vy == 0) {
        console.log("size is not equal to 0!");
        return;
      }

      addObject({
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

      deletePreview();
    },
    [addObject, updatePreview, deletePreview]
  );

  const onClickCircle = useCallback(
    (obj: CircleObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        updatePreview({
          id: "preview",
          type: "circle",
          fixedPoint: v,
          style: { stroke: "black", fill: "none" },
        });
        return;
      }

      const c = vp.divConst(vp.sub(v, obj.fixedPoint), 2);
      const r = vp.abs(c);

      addObject({
        ...obj,
        r,
        c,
      });
      deletePreview();
    },
    [addObject, updatePreview, deletePreview]
  );

  const onClickCopy = useCallback(
    (obj: GroupObject | null, v: VirtualPoint) => {
      if (!obj || !obj.fixedPoint) {
        groupingPreview(v, true);
        return;
      }

      ungroupingPreview(v);
    },
    [ungroupingPreview, groupingPreview]
  );

  const onClickMove = useCallback(
    (obj: GroupObject | null, v: VirtualPoint) => {
      if (!obj || !obj.fixedPoint) {
        groupingPreview(v, false);
        return;
      }

      ungroupingPreview(v);
    },
    [ungroupingPreview, groupingPreview]
  );

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      (x: number, y: number) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (isOpen) return;
        const v = toVirtual(rp.create(x, y));

        switch (drawMode) {
          case "line": {
            if (obj && obj.type !== "line") break;
            onClickLine(obj, v);
            break;
          }
          case "polyline": {
            if (obj && obj.type !== "polyline") break;
            onClickPolyline(obj, v);
            break;
          }
          case "text": {
            if (obj && obj.type !== "text") break;
            onClickText(obj, v);
            break;
          }
          case "rect": {
            if (obj && obj.type !== "rect") break;
            onClickRect(obj, v);
            break;
          }
          case "circle": {
            if (obj && obj.type !== "circle") break;
            onClickCircle(obj, v);
            break;
          }
          case "copy": {
            if (obj && obj.type !== "group") break;
            onClickCopy(obj, v);
            break;
          }
          case "move": {
            if (obj && obj.type !== "group") break;
            onClickMove(obj, v);
            break;
          }
          case "selector": {
            resetSelect();
            break;
          }
          default:
        }
      },
    [
      onClickCircle,
      onClickCopy,
      onClickLine,
      onClickMove,
      onClickPolyline,
      onClickRect,
      onClickText,
      resetSelect,
      toVirtual,
    ]
  );

  const onContextMenu = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (isOpen) return;
        switch (drawMode) {
          case "polyline": {
            if (obj?.type !== "polyline") break;
            addObject({
              ...obj,
              previewPoint: undefined,
            });
            deletePreview();
            break;
          }
          default:
        }
      },
    [addObject, deletePreview]
  );

  return { onClick, onContextMenu };
};
