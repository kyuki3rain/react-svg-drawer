import { useDrawMode } from "../states/drawModeState";
import {
  useSetSvgObject,
  useSvgObject,
  useSvgObjects,
} from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useConfigModal } from "../states/configModalState";
import { useSelectedSvgId } from "../states/selectedSvgIdState";
import { useGroup } from "./useGroup";

export const useOnClick = () => {
  const { drawMode } = useDrawMode();
  const {
    svgObject: obj,
    addOrUpdateSvgObject: addOrUpdatePreview,
    deleteSvgObject: deletePreview,
  } = useSvgObject("preview");
  const [id, setId] = useState(nanoid() as SvgId);
  const { addOrUpdateSvgObject: addOrUpdateNew } = useSetSvgObject(id);
  const { toVirtual } = usePoint();
  const { isOpen } = useConfigModal();
  const { selectedSvgId, resetSelect } = useSelectedSvgId();
  const { grouping, ungrouping } = useGroup();
  const { copySvgObjects } = useSvgObjects();

  const setNewId = () => setId(nanoid() as SvgId);

  const onClickLine = (obj: LineObject | null, v: VirtualPoint) => {
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
  };

  const onClickPolyline = (obj: PolylineObject | null, v: VirtualPoint) => {
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
  };

  const onClickText = (obj: TextObject | null, v: VirtualPoint) => {
    if (!obj) return;
    addOrUpdateNew({
      ...obj,
      fixedPoint: v,
      point: vp.create(0, 0),
    });
    setNewId();
  };

  const onClickRect = (obj: RectObject | null, v: VirtualPoint) => {
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

    if (diff.vx > 0 && diff.vy > 0) {
      addOrUpdateNew({
        ...obj,
        upperLeft: vp.create(0, 0),
        size: diff,
      });
    } else if (diff.vx > 0) {
      addOrUpdateNew({
        ...obj,
        upperLeft: vp.create(0, diff.vy),
        size: vp.create(diff.vx, -diff.vy),
      });
    } else if (diff.vy > 0) {
      addOrUpdateNew({
        ...obj,
        upperLeft: vp.create(diff.vx, 0),
        size: vp.create(-diff.vx, diff.vy),
      });
    } else {
      addOrUpdateNew({
        ...obj,
        upperLeft: diff,
        size: vp.create(-diff.vx, -diff.vy),
      });
    }
    setNewId();
    deletePreview();
  };

  const onClickCircle = (obj: CircleObject | null, v: VirtualPoint) => {
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
  };

  const onClickCopy = (obj: GroupObject | null, v: VirtualPoint) => {
    if (!obj) {
      const newIds = copySvgObjects([...selectedSvgId]);
      grouping(v, newIds);
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

    ungrouping(obj);
    setNewId();
    deletePreview();
  };

  const onClickMove = (obj: GroupObject | null, v: VirtualPoint) => {
    if (!obj) {
      grouping(v, [...selectedSvgId]);
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

    ungrouping(obj);
    setNewId();
    deletePreview();
  };

  const onClick = (x: number, y: number) => {
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
  };

  const onContextMenu = () => {
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
  };

  return { onClick, onContextMenu };
};
