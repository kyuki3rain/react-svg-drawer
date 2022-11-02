import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useArea } from "../../../hooks/objects/useArea";
import { useLine } from "../../../hooks/objects/useLine";

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
  const { r1, r2, onClick, onMouseDown } = useLine({
    obj,
    parentPoint,
    parentId,
  });
  const area = useArea({
    obj,
    parentPoint,
    parentId,
    isSelected,
  });
  if (!r1 || !r2) return null;

  return (
    <>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        {...obj.style}
        stroke={isSelected ? "blue" : obj.style.stroke}
      ></line>
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
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      ></line>
      {area && (
        <rect
          x={area.x}
          y={area.y}
          width={area.width}
          height={area.height}
          stroke="blue"
          fill="none"
          strokeDasharray="4 4"
        ></rect>
      )}
    </>
  );
};

export default LineObject;
