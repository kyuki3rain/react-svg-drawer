import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useArea } from "../../../hooks/objects/useArea";
import { useRect } from "../../../hooks/objects/useRect";

type Props = {
  obj: RectObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const RectObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { r, s, onClick, onMouseDown } = useRect({
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
  if (!r || !s) return null;

  return (
    <>
      <rect
        x={r.x}
        y={r.y}
        width={s.x}
        height={s.y}
        {...obj.style}
        stroke={isSelected ? "blue" : obj.style.stroke}
      ></rect>
      <rect
        x={r.x}
        y={r.y}
        width={s.x}
        height={s.y}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity="0"
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.preventDefault(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      ></rect>

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

export default RectObject;
