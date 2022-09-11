import { useDrawMode } from "../states/drawModeState";
import { useSetSvgObject, useSvgObject } from "../states/svgObjectState";
import { usePoint } from "./usePoint";
import * as rp from "../helpers/realPoint";
import { nanoid } from "nanoid";
import { useState } from "react";

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

  const onClick = (x: number, y: number) => {
    const v = toVirtual(rp.create(x, y));

    switch (drawMode.mode) {
      case "line": {
        if (obj && obj.type !== "line") break;
        onClickLine(obj, v);
        break;
      }
      case "text": {
        break;
      }
      case "copy": {
        break;
      }
      default:
    }
  };

  return { onClick };
};
