import { usePoint } from "../../../operators/usePoint";
import * as vp from "../../../helpers/virtualPoint";
import { useOnClickObject } from "../../../operators/useOnClickObject";

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
  const { toReal } = usePoint();
  const { onClick } = useOnClickObject();

  if (!obj.c || !obj.r || !obj.fixedPoint) return null;
  const c = toReal(vp.add(vp.add(obj.c, obj.fixedPoint), parentPoint), true);
  const r = toReal(obj.r, true);
  return (
    <>
      <ellipse
        cx={c.x}
        cy={c.y}
        rx={r.x}
        ry={r.y}
        {...obj.style}
        strokeWidth={(obj.style.strokeWidth ?? 0) + 10}
        strokeOpacity="0"
        onClick={(e) => {
          if (!parentId || !obj.id) return;
          if (parentId ?? obj.id === "preview") return;
          if (onClick(parentId ?? obj.id)) e.stopPropagation();
        }}
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
