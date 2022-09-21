import { drawModeState } from "../../states/drawModeState";
import {
  svgObjectStates,
  useSetSvgObjectList,
  useSvgObjects,
} from "../../states/svgObjectState";
import { usePoint } from "../../operators/usePoint";
import * as rp from "../../helpers/realPoint";
import * as vp from "../../helpers/virtualPoint";
import { useCallback } from "react";
import { configModalState } from "../../states/configModalState";
import { selectedSvgIdState } from "../../states/selectedSvgIdState";
import { useRecoilCallback } from "recoil";
import { useSelect } from "../../operators/useSelect";
import { usePreview } from "../../operators/usePreview";
import { useSvgObject } from "../../operators/useSvgObject";

export const useClickController = () => {
  const { updatePreview, deletePreview } = usePreview();
  const { addObject } = useSvgObject();
  const { toVirtual } = usePoint();
  const { resetSelect } = useSelect();
  const { copySvgObjects } = useSvgObjects();
  const { updateFixedPoint } = useSvgObjects();
  const { addIds, deleteIds } = useSetSvgObjectList();

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

  const onClickCopy = useRecoilCallback(
    ({ snapshot }) =>
      (obj: GroupObject | null, v: VirtualPoint) => {
        if (!obj || !obj.fixedPoint) {
          const selectedSvgId = snapshot
            .getLoadable(selectedSvgIdState)
            .getValue();
          const newIds = copySvgObjects([...selectedSvgId]);
          updateFixedPoint([...selectedSvgId], vp.create(0, 0));
          deleteIds([...selectedSvgId]);
          updatePreview({
            type: "group" as const,
            objectIds: newIds,
            fixedPoint: v,
            firstFixedPoint: v,
            style: {},
            isCopy: true,
          });
          return;
        }

        const correction = vp.sub(vp.create(0, 0), obj.fixedPoint);
        updateFixedPoint(obj.objectIds, correction);
        addIds(obj.objectIds);
        deletePreview();
      },
    [
      addIds,
      updatePreview,
      copySvgObjects,
      deleteIds,
      deletePreview,
      updateFixedPoint,
    ]
  );

  const onClickMove = useRecoilCallback(
    ({ snapshot }) =>
      (obj: GroupObject | null, v: VirtualPoint) => {
        const selectedSvgId = snapshot
          .getLoadable(selectedSvgIdState)
          .getValue();
        if (!obj || !obj.fixedPoint) {
          updateFixedPoint([...selectedSvgId], vp.create(0, 0));
          deleteIds([...selectedSvgId]);
          updatePreview({
            type: "group" as const,
            objectIds: [...selectedSvgId],
            fixedPoint: v,
            firstFixedPoint: v,
            style: {},
            isCopy: false,
          });
          return;
        }

        const correction = vp.sub(vp.create(0, 0), obj.fixedPoint);
        updateFixedPoint(obj.objectIds, correction);
        addIds(obj.objectIds);
        deletePreview();
      },
    [addIds, updatePreview, deleteIds, deletePreview, updateFixedPoint]
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
