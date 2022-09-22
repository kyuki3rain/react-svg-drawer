import { useMemo } from "react";
import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useObject } from "../../../hooks/useObject";

type Props = {
  obj: PolylineObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const PolylineObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { toRealAbsolute, onClick, pointToText } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const points = useMemo(
    () =>
      (obj.previewPoint ? [...obj.points, obj.previewPoint] : obj.points)
        .map((v) => pointToText(toRealAbsolute(v)))
        .join(" "),
    [obj.points, obj.previewPoint, pointToText, toRealAbsolute]
  );

  return (
    <>
      <polyline
        points={points}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity="0"
        onClick={(e) => onClick(e.stopPropagation)}
      ></polyline>
      <polyline
        points={points}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
      ></polyline>
    </>
  );
};

export default PolylineObject;
