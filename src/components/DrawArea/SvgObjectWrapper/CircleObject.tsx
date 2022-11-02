import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useArea } from "../../../hooks/objects/useArea";
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
  const area = useArea({
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
        style={{ pointerEvents: "none" }}
        stroke={isSelected ? "blue" : obj.style.stroke}
      ></ellipse>
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
        fillOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      ></ellipse>
      {area && (
        <rect
          x={area.x}
          y={area.y}
          width={area.width}
          height={area.height}
          stroke="red"
          fill="none"
        ></rect>
      )}
    </>
  );
};

export default CircleObject;
