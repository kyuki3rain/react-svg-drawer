import { usePoint } from "../../../operators/usePoint";
import * as vp from "../../../helpers/virtualPoint";
import { useOnClickObject } from "../../../operators/useOnClickObject";

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
  const { toReal } = usePoint();
  const { onClick } = useOnClickObject();

  if (!obj.size || !obj.fixedPoint) return null;
  const r = toReal(
    vp.add(vp.add(obj.upperLeft, obj.fixedPoint), parentPoint),
    true
  );
  const s = toReal(obj.size, true);
  return (
    <>
      <rect
        x={r.x}
        y={r.y}
        width={s.x}
        height={s.y}
        {...obj.style}
        strokeWidth={(obj.style.strokeWidth ?? 0) + 10}
        strokeOpacity="0"
        onClick={(e) => {
          if (!parentId || !obj.id) return;
          if (parentId ?? obj.id === "preview") return;
          if (onClick(parentId ?? obj.id)) e.stopPropagation();
        }}
      ></rect>
      <rect
        x={r.x}
        y={r.y}
        width={s.x}
        height={s.y}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
      ></rect>
    </>
  );
};

export default RectObject;
