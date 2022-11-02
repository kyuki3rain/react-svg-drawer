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
  const { points, draw, onClick, onMouseDown } = usePolyline({
    obj,
    parentPoint,
    parentId,
  });
  const area = useArea({
    obj,
    parentPoint,
    parentId,
  });
  if (!draw) return null;

  return (
    <>
      <polyline
        points={points}
        {...obj.style}
        stroke={isSelected ? "blue" : obj.style.stroke}
      ></polyline>
      <polyline
        points={points}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
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
          stroke="red"
          fill="none"
        ></rect>
      )}
    </>
  );
};

export default PolylineObject;
