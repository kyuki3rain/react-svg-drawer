import { useMemo } from "react";
import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useObject } from "../../../hooks/useObject";

type Props = {
  obj: CircleObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const CircleObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { toRealAbsolute, toRealRelative, onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const c = useMemo(
    () => obj.c && toRealAbsolute(obj.c),
    [obj.c, toRealAbsolute]
  );
  const r = useMemo(
    () => obj.r && toRealRelative(obj.r),
    [obj.r, toRealRelative]
  );

  if (!c || !r) return null;

  return (
    <>
      <ellipse
        cx={c.x}
        cy={c.y}
        rx={r.x}
        ry={r.y}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        onClick={(e) => onClick(e.stopPropagation)}
      ></ellipse>
      <ellipse
        cx={c.x}
        cy={c.y}
        rx={r.x}
        ry={r.y}
        {...obj.style}
        style={{ pointerEvents: "none" }}
        stroke={isSelected ? "blue" : "black"}
      ></ellipse>
    </>
  );
};

export default CircleObject;
