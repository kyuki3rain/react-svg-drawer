import { useMemo } from "react";
import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useObject } from "../../../hooks/useObject";

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
  const { toRealAbsolute, toRealRelative, onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r = useMemo(
    () => obj.upperLeft && toRealAbsolute(obj.upperLeft),
    [obj.upperLeft, toRealAbsolute]
  );
  const s = useMemo(
    () => obj.size && toRealRelative(obj.size),
    [obj.size, toRealRelative]
  );

  if (!r || !s) return null;

  return (
    <>
      <rect
        x={r.x}
        y={r.y}
        width={s.x}
        height={s.y}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity="0"
        onClick={(e) => onClick(e.stopPropagation)}
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
