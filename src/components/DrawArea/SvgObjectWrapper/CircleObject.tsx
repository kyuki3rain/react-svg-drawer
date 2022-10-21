import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useCircle } from "../../../hooks/objects/useCircle";

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
  const { c, r, onClick, onMouseDown } = useCircle({
    obj,
    parentPoint,
    parentId,
  });
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
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) => onMouseDown(() => e.stopPropagation(), isSelected)}
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
