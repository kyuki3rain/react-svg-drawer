import { useDrawMode } from "../states/drawModeState";
import { useSetSvgObject, useSvgObject } from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useConfigModal } from "../states/configModalState";

export const useOnClick = () => {
  const { drawMode } = useDrawMode();
  const {
    svgObject: obj,
    addOrUpdateSvgObject: addOrUpdatePreview,
    deleteSvgObject: deletePreview,
  } = useSvgObject("preview" as SvgId);
  const [id, setId] = useState(nanoid() as SvgId);
  const { addOrUpdateSvgObject: addOrUpdateNew } = useSetSvgObject(id);
  const { toVirtual } = usePoint();
  const { isOpen } = useConfigModal();

  const setNewId = () => setId(nanoid() as SvgId);

  const onClickLine = (obj: LineObject | null, v: VirtualPoint) => {
    if (!obj?.point1) {
      addOrUpdatePreview({
        id: "preview" as SvgId,
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
        id: "preview" as SvgId,
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
