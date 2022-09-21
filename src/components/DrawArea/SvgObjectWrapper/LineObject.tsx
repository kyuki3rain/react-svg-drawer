import * as vp from "../../../helpers/virtualPoint";
import { useOnClickObject } from "../../../operators/useOnClickObject";
import { usePoint } from "../../../operators/usePoint";

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
  const { toReal } = usePoint();
  const { onClick } = useOnClickObject();

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
          const id = parentId ?? obj.id;
          if (!id) return;
          if (id === "preview") return;
          if (onClick(id)) e.stopPropagation();
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
