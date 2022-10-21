import { useMemo } from "react";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: PolylineObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const usePolyline = ({ obj, parentPoint, parentId }: Props) => {
  const { toRealAbsolute, onClick, onMouseDown, pointToText } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const points = useMemo(
    () =>
      (obj.previewPoint ? [...obj.points, obj.previewPoint] : obj.points)
        .map((v) => pointToText(toRealAbsolute(v)))
        .flatMap((x) => (x === "" ? [] : x))
        .join(" "),
    [obj.points, obj.previewPoint, pointToText, toRealAbsolute]
  );
  return {
    points,
    draw: points !== "",
    onClick,
    onMouseDown,
  };
};
