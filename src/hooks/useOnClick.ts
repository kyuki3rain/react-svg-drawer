import { useDrawMode } from "../states/drawModeState";
import { useSetSvgObject, useSvgObject } from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";
import * as vp from "../helpers/virtualPoint";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useConfigModal } from "../states/configModalState";

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

  const setNewId = () => setId(nanoid() as SvgId);

  const onClickLine = (obj: LineObject | null, v: VirtualPoint) => {
    if (!obj?.point1) {
      addOrUpdatePreview({
        id: "preview",
        type: "line",
        point1: v,
        style: { stroke: "black" },
      });
      return;
    }

    addOrUpdateNew({
      ...obj,
      point2: v,
    });
    setNewId();
    deletePreview();
  };

  const onClickPolyline = (obj: PolylineObject | null, v: VirtualPoint) => {
    if (!obj?.previewPoint) {
      addOrUpdatePreview({
        id: "preview",
        type: "polyline",
        points: [v],
        style: { stroke: "black", fill: "none" },
      });
      return;
    }

    addOrUpdatePreview({
      ...obj,
      points: [...obj.points, v],
    });
  };

  const onClickText = (obj: TextObject | null, v: VirtualPoint) => {
    if (!obj) return;
    addOrUpdateNew({
      ...obj,
      point: v,
    });
    setNewId();
  };

  const onClickRect = (obj: RectObject | null, v: VirtualPoint) => {
    if (!obj) {
      addOrUpdatePreview({
        id: "preview",
        type: "rect",
        upperLeft: v,
        point: v,
        style: { stroke: "black", fill: "none" },
      });
      return;
    }

    const diff = vp.sub(v, obj.point);
    if (diff.vx == 0 || diff.vy == 0) {
      console.log("size is not equal to 0!");
      return;
    }

    if (diff.vx > 0 && diff.vy > 0) {
      addOrUpdateNew({
        ...obj,
        upperLeft: obj.point,
        size: diff,
      });
    } else if (diff.vx > 0) {
      addOrUpdateNew({
        ...obj,
        upperLeft: vp.create(obj.point.vx, v.vy),
        size: vp.create(diff.vx, -diff.vy),
      });
    } else if (diff.vy > 0) {
      addOrUpdateNew({
        ...obj,
        upperLeft: vp.create(v.vx, obj.point.vy),
        size: vp.create(-diff.vx, diff.vy),
      });
    } else {
      addOrUpdateNew({
        ...obj,
        upperLeft: vp.create(v.vx, v.vy),
        size: vp.create(-diff.vx, -diff.vy),
      });
    }
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
