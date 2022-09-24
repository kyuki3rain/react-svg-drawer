import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useLine } from "../../../hooks/objects/useLine";

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
  const { r1, r2, onClick } = useLine({
    obj,
    parentPoint,
    parentId,
  });
  if (!r1 || !r2) return null;

  return (
    <>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        {...obj.style}
        strokeWidth={
          (obj.style.strokeWidth ?? 0) + CLICK_TARGET_OBJECT.defaultStrokeWidth
        }
        strokeOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        onClick={(e) => onClick(e.stopPropagation)}
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
