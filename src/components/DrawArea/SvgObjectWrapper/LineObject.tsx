import { useMemo } from "react";
import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useObject } from "../../../hooks/useObject";

type Props = {
  obj: LineObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const LineObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { toRealAbsolute, onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r1 = useMemo(
    () => obj.point1 && toRealAbsolute(obj.point1),
    [obj.point1, toRealAbsolute]
  );
  const r2 = useMemo(
    () => obj.point2 && toRealAbsolute(obj.point2),
    [obj.point2, toRealAbsolute]
  );

  if (!r1 || !r2) return null;

  return (
    <>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        onClick={(e) => onClick(e.stopPropagation)}
      ></line>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
      ></line>
    </>
  );
};

export default LineObject;
