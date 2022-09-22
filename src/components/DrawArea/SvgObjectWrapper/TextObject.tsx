import { useMemo } from "react";
import { useObject } from "../../../hooks/useObject";

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
  const { toRealAbsolute, onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r = useMemo(
    () => obj.point && toRealAbsolute(obj.point),
    [obj.point, toRealAbsolute]
  );
  const text = useMemo(() => obj.configMap?.get("text"), [obj.configMap]);

  if (!r || !text) return null;

  return (
    <>
      <text
        x={r.x}
        y={r.y}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
        onClick={(e) => onClick(e.stopPropagation)}
      >
        {text}
      </text>
    </>
  );
};

export default TextObject;
