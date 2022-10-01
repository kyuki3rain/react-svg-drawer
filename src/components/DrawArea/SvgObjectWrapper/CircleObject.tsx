import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useCircle } from "../../../hooks/objects/useCircle";

type Props = {
  obj: CircleObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview" | "select";
};

const CircleObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { c, r, onClick, onMouseDown, onMouseUp } = useCircle({
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
        onClick={(e) =>
          onClick(() => e.stopPropagation(), isSelected, e.shiftKey)
        }
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            isSelected,
            e.clientX,
            e.clientY
          )
        }
        // onMouseUp={(e) => onMouseUp(() => e.stopPropagation())}
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
