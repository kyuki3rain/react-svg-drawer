import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useArea } from "../../../hooks/objects/useArea";
import { usePolyline } from "../../../hooks/objects/usePolyline";

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
  const { points, draw, onClick, onMouseDown, style } = usePolyline({
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
  if (!draw || !style) return null;

  return (
    <>
      <polyline
        points={points}
        {...style}
        stroke={isSelected ? "blue" : style.stroke}
      ></polyline>
      <polyline
        points={points}
        {...style}
        strokeWidth={
          (style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity="0"
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      ></polyline>
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

export default PolylineObject;
