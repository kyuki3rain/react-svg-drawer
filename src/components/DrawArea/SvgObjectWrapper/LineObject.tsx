import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";
import { useSelect } from "../../../hooks/useSelect";

type Props = {
  obj: LineObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
};

const LineObject: React.FC<Props> = ({ obj, parentPoint, isSelected }) => {
  const { toReal } = usePoint();
  const { onClick } = useSelect();

  if (!obj.point1 || !obj.point2 || !obj.fixedPoint) return null;
  const r1 = toReal(
    vp.add(vp.add(obj.point1, obj.fixedPoint), parentPoint),
    true
  );
  const r2 = toReal(
    vp.add(vp.add(obj.point2, obj.fixedPoint), parentPoint),
    true
  );
  return (
    <>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        {...obj.style}
        strokeWidth={(obj.style.strokeWidth ?? 0) + 10}
        strokeOpacity="0"
        onClick={(e) => {
          if (onClick(obj.id)) e.stopPropagation();
        }}
      ></line>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
      ></line>
    </>
  );
};

export default LineObject;
