import { drawModeState } from "../../states/drawModeState";
import {
  svgObjectStates,
  useSetSvgObject,
  useSetSvgObjectList,
  useSvgObjects,
} from "../../states/svgObjectState";
import { usePoint } from "../../hooks/usePoint";
import * as rp from "../../helpers/realPoint";
import * as vp from "../../helpers/virtualPoint";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { configModalState } from "../../states/configModalState";
import {
  selectedSvgIdState,
  useSelectedSvgId,
} from "../../states/selectedSvgIdState";
import { useRecoilCallback } from "recoil";

export const useClickController = () => {
  const {
    addOrUpdateSvgObject: addOrUpdatePreview,
    deleteSvgObject: deletePreview,
  } = useSetSvgObject("preview");
  const [id, setId] = useState(nanoid() as SvgId);
  const { addOrUpdateSvgObject: addOrUpdateNew } = useSetSvgObject(id);
  const { toVirtual } = usePoint();
  const { resetSelect } = useSelectedSvgId();
  const { copySvgObjects } = useSvgObjects();
  const { updateFixedPoint } = useSvgObjects();
  const { addIds, deleteIds } = useSetSvgObjectList();

  const setNewId = useCallback(() => setId(nanoid() as SvgId), []);

  const onClickLine = useCallback(
    (obj: LineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        addOrUpdatePreview({
          id: "preview",
          type: "line",
          fixedPoint: v,
          point1: vp.create(0, 0),
          style: { stroke: "black" },
        });
        return;
      }

      addOrUpdateNew({
        ...obj,
        point2: vp.sub(v, obj.fixedPoint),
      });
      setNewId();
      deletePreview();
    },
    [addOrUpdateNew, addOrUpdatePreview, deletePreview, setNewId]
  );

  const onClickPolyline = useCallback(
    (obj: PolylineObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        addOrUpdatePreview({
          id: "preview",
          type: "polyline",
          fixedPoint: v,
          points: [vp.create(0, 0)],
          style: { stroke: "black", fill: "none" },
        });
        return;
      }

      addOrUpdatePreview({
        ...obj,
        points: [...obj.points, vp.sub(v, obj.fixedPoint)],
      });
    },
    [addOrUpdatePreview]
  );

  const onClickText = useCallback(
    (obj: TextObject | null, v: VirtualPoint) => {
      if (!obj) return;
      addOrUpdateNew({
        ...obj,
        fixedPoint: v,
        point: vp.create(0, 0),
      });
      setNewId();
    },
    [addOrUpdateNew, setNewId]
  );

  const onClickRect = useCallback(
    (obj: RectObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        addOrUpdatePreview({
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

      addOrUpdateNew({
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

      setNewId();
      deletePreview();
    },
    [addOrUpdateNew, addOrUpdatePreview, deletePreview, setNewId]
  );

  const onClickCircle = useCallback(
    (obj: CircleObject | null, v: VirtualPoint) => {
      if (!obj?.fixedPoint) {
        addOrUpdatePreview({
          id: "preview",
          type: "circle",
          fixedPoint: v,
          style: { stroke: "black", fill: "none" },
        });
        return;
      }

      const c = vp.divConst(vp.sub(v, obj.fixedPoint), 2);
      const r = vp.abs(c);

      addOrUpdateNew({
        ...obj,
        r,
        c,
      });
      setNewId();
      deletePreview();
    },
    [addOrUpdateNew, addOrUpdatePreview, deletePreview, setNewId]
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
          addOrUpdatePreview({
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
        setNewId();
        deletePreview();
      },
    [
      addIds,
      addOrUpdatePreview,
      copySvgObjects,
      deleteIds,
      deletePreview,
      setNewId,
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
          addOrUpdatePreview({
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
        setNewId();
        deletePreview();
      },
    [
      addIds,
      addOrUpdatePreview,
      deleteIds,
      deletePreview,
      setNewId,
      updateFixedPoint,
    ]
  );

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      (x: number, y: number) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        const isOpen = snapshot.getLoadable(configModalState).getValue().isOpen;
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (isOpen) return;
        const v = toVirtual(rp.create(x, y));

        switch (drawMode.mode) {
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
        switch (drawMode.mode) {
          case "polyline": {
            if (obj?.type !== "polyline") break;
            addOrUpdateNew({
              ...obj,
              previewPoint: undefined,
            });
            setNewId();
            deletePreview();
            break;
          }
          default:
        }
      },
    [addOrUpdateNew, deletePreview, setNewId]
  );

  return { onClick, onContextMenu };
};
