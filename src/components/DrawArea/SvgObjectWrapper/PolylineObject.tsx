import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";
import { useSelect } from "../../../hooks/useSelect";

type Props = {
  obj: PolylineObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
};

const PolylineObject: React.FC<Props> = ({ obj, parentPoint, isSelected }) => {
  const { toReal } = usePoint();
  const { onClick } = useSelect();

  if (!obj.fixedPoint) return null;
  const fp = obj.fixedPoint;
  const points = (
    obj.previewPoint ? [...obj.points, obj.previewPoint] : obj.points
  )
    .map((p) => {
      const r = toReal(vp.add(vp.add(p, fp), parentPoint), true);
      return `${r.x},${r.y}`;
    })
    .join(" ");
  return (
    <>
      <polyline
        points={points}
        {...obj.style}
        strokeWidth={(obj.style.strokeWidth ?? 0) + 10}
        strokeOpacity="0"
        onClick={(e) => {
          if (onClick(obj.id)) e.stopPropagation();
        }}
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
