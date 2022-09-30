import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { usePolyline } from "../../../hooks/objects/usePolyline";

type Props = {
  obj: PolylineObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview" | "select";
};

const PolylineObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { points, draw, onClick } = usePolyline({ obj, parentPoint, parentId });
  if (!draw) return null;

  return (
    <>
      <polyline
        points={points}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity="0"
        onClick={(e) =>
          onClick(() => e.stopPropagation(), isSelected, e.shiftKey)
        }
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
