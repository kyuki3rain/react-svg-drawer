import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useEdge } from "../../../hooks/objects/useEdge";

type Props = {
  obj: EdgeObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const EdgeObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { r1, r2, onClick, onMouseDown } = useEdge({
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
        stroke={isSelected ? "blue" : "red"}
      ></line>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        strokeWidth={CLICK_TARGET_OBJECT.defaultStrokeWidth + 1}
        stroke="black"
        strokeOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        onClick={(e) => {
          console.log(e);
          onClick(() => e.stopPropagation());
        }}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      ></line>
    </>
  );
};

export default EdgeObject;
