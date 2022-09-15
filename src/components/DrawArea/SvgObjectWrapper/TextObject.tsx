import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";
import { useSelect } from "../../../hooks/useSelect";

type Props = {
  obj: TextObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const TextObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { toReal } = usePoint();
  const { onClick } = useSelect();

  if (!obj.point || !obj.fixedPoint) return null;
  const text = obj.configMap?.get("text");
  if (!text) return null;
  const r = toReal(
    vp.add(vp.add(obj.point, obj.fixedPoint), parentPoint),
    true
  );
  return (
    <>
      <text
        x={r.x}
        y={r.y}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
        onClick={(e) => {
          if (onClick(parentId ?? obj.id)) e.stopPropagation();
        }}
      >
        {text}
      </text>
    </>
  );
};

export default TextObject;
