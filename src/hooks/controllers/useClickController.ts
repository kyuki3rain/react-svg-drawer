import { drawModeState } from "../../states/drawModeState";
import { svgObjectStates } from "../../states/svgObjectState";
import { usePoint } from "../../operators/usePoint";
import { useCallback } from "react";
import { configModalState } from "../../states/configModalState";
import { useRecoilCallback } from "recoil";
import { useSelect } from "../../operators/useSelect";
import { usePreview } from "../../operators/usePreview";
import { useSvgObject } from "../../operators/useSvgObject";
import { useGroupingObject } from "../../operators/useGroupingObject";
import { vp } from "../../helpers/virtualPoint";
import { rp } from "../../helpers/realPoint";
import { useSelectMode } from "../../operators/useSelectMode";
import { moveModeState, selectModeState } from "../../states/selectModeState";
import {
  copyingIdsState,
  selectedIdListState,
} from "../../states/selectedIdListState";
import { useResetPreview } from "../../operators/useResetPreview";

export const useClickController = () => {
  const { updatePreview, deletePreview } = usePreview();
  const { addObject } = useSvgObject();
  const { toVirtual } = usePoint();
  const { resetSelect, select } = useSelect();
  const { ungroupingPreview } = useGroupingObject();
  const { toRangeSelectMode, resetSelectMode } = useSelectMode();
  const { copyObject, removeTagFromId } = useSvgObject();
  const { resetPreview } = useResetPreview();

  const onClickLine = useCallback(
    (obj: LineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        updatePreview({
          id: "preview",
          type: "line",
          fixedPoint: v as VirtualAbsolute,
          point1: vp.zero() as VirtualAbsolute,
          style: { stroke: "black" },
          area: {
            upperLeft: vp.zero() as VirtualAbsolute,
            bottomRight: vp.zero() as VirtualAbsolute,
          },
        });
        return;
      }
      if (!obj.point1) return;

      const point2 = vp.sub(v, obj.fixedPoint) as VirtualAbsolute;
      addObject({
        ...obj,
        point2,
        area: {
          upperLeft: vp.min(obj.point1, point2) as VirtualAbsolute,
          bottomRight: vp.max(obj.point1, point2) as VirtualAbsolute,
        },
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
          fixedPoint: v as VirtualAbsolute,
          points: [vp.zero() as VirtualAbsolute],
          style: { stroke: "black", fill: "none" },
          area: {
            upperLeft: vp.zero() as VirtualAbsolute,
            bottomRight: vp.zero() as VirtualAbsolute,
          },
        });
        return;
      }

      const point2 = vp.sub(v, obj.fixedPoint);

      updatePreview({
        ...obj,
        points: [...obj.points, point2 as VirtualAbsolute],
        area: {
          upperLeft: vp.min(obj.area.upperLeft, point2) as VirtualAbsolute,
          bottomRight: vp.max(obj.area.bottomRight, point2) as VirtualAbsolute,
        },
      });
    },
    [updatePreview]
  );

  const onClickText = useCallback(
    (obj: TextObject | null, v: VirtualPoint) => {
      if (!obj) return;
      addObject({
        ...obj,
        fixedPoint: v as VirtualAbsolute,
        point: vp.zero() as VirtualAbsolute,
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
          upperLeft: vp.zero() as VirtualAbsolute,
          fixedPoint: v as VirtualAbsolute,
          style: { stroke: "black", fill: "none" },
          area: {
            upperLeft: vp.zero() as VirtualAbsolute,
            bottomRight: vp.zero() as VirtualAbsolute,
          },
        });
        return;
      }

      const diff = vp.sub(v, obj.fixedPoint);
      if (diff.vx == 0 || diff.vy == 0) {
        console.log("size is not equal to 0!");
        return;
      }

      const upperLeft = vp.create(
        diff.vx > 0 ? 0 : diff.vx,
        diff.vy > 0 ? 0 : diff.vy
      ) as VirtualAbsolute;
      const bottomRight = vp.create(
        diff.vx > 0 ? diff.vx : 0,
        diff.vy > 0 ? diff.vy : 0
      ) as VirtualAbsolute;

      addObject({
        ...obj,
        upperLeft,
        size: vp.sub(bottomRight, upperLeft) as VirtualRelative,
        area: { upperLeft, bottomRight },
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
          fixedPoint: v as VirtualAbsolute,
          style: { stroke: "black", fill: "none" },
          area: {
            upperLeft: vp.zero() as VirtualAbsolute,
            bottomRight: vp.zero() as VirtualAbsolute,
          },
        });
        return;
      }

      const point2 = vp.sub(v, obj.fixedPoint);
      const c = vp.divConst(point2, 2) as VirtualAbsolute;
      const r = vp.abs(c) as VirtualRelative;

      addObject({
        ...obj,
        r,
        c,
        area: {
          upperLeft: vp.min(point2, vp.zero()) as VirtualAbsolute,
          bottomRight: vp.max(point2, vp.zero()) as VirtualAbsolute,
        },
      });
      deletePreview();
    },
    [addObject, updatePreview, deletePreview]
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
          case "selector": {
            resetSelect();
            break;
          }
          default:
        }
      },
    [
      onClickCircle,
      onClickLine,
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

  const onMousedown = useRecoilCallback(
    ({ snapshot }) =>
      (x: number, y: number) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
        if (drawMode !== "selector" || isOpen) return;
        if (!toRangeSelectMode()) return;

        const v = toVirtual(rp.create(x, y));
        updatePreview({
          id: "preview",
          type: "rect",
          upperLeft: vp.zero() as VirtualAbsolute,
          fixedPoint: v as VirtualAbsolute,
          style: { stroke: "black", fill: "none" },
          area: {
            upperLeft: vp.zero() as VirtualAbsolute,
            bottomRight: vp.zero() as VirtualAbsolute,
          },
        });
      },
    [toRangeSelectMode, toVirtual, updatePreview]
  );

  const onMouseup = useRecoilCallback(
    ({ snapshot, set }) =>
      (x: number, y: number) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
        if (drawMode !== "selector" || isOpen) return;

        const selectMode = snapshot.getLoadable(selectModeState).getValue();
        const v = toVirtual(rp.create(x, y));

        if (selectMode === "range") {
          resetPreview();
        } else if (selectMode == "move") {
          const moveMode = snapshot.getLoadable(moveModeState).getValue();
          ungroupingPreview(v);

          if (moveMode === "move") {
            set(copyingIdsState, new Set());
          } else {
            const selectedIdList = [
              ...snapshot.getLoadable(selectedIdListState).getValue(),
            ];
            const newIds = selectedIdList.flatMap(
              (id) => copyObject(id, true, true) ?? []
            );
            resetSelect();
            newIds.map((id) => select(id));

            const copyingIds = [
              ...snapshot.getLoadable(copyingIdsState).getValue(),
            ];
            copyingIds.map((id) => removeTagFromId(id, "copy"));
          }
        }

        resetSelectMode();
      },
    [
      copyObject,
      removeTagFromId,
      resetPreview,
      resetSelect,
      resetSelectMode,
      select,
      toVirtual,
      ungroupingPreview,
    ]
  );

  return { onClick, onContextMenu, onMousedown, onMouseup };
};
