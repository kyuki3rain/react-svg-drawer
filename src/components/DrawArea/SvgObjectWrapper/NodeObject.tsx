import { CLICK_TARGET_OBJECT } from "../../../helpers/clickTargetObject";
import { useNode } from "../../../hooks/objects/useNode";

type Props = {
  obj: NodeObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const NodeObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { rp, isCircle, onClick, onMouseDown } = useNode({
    obj,
    parentPoint,
    parentId,
  });

  if (!rp) return null;

  if (isCircle)
    return (
      <>
        <circle
          cx={rp.x}
          cy={rp.y}
          fill="red"
          stroke={isSelected ? "blue" : "red"}
          r={4}
        />
        <circle
          cx={rp.x}
          cy={rp.y}
          r={4}
          fill="black"
          stroke="black"
          strokeWidth={1 + CLICK_TARGET_OBJECT.defaultStrokeWidth}
          strokeOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
          fillOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
          onClick={(e) => onClick(() => e.stopPropagation())}
          onMouseDown={(e) =>
            onMouseDown(
              () => e.stopPropagation(),
              e.clientX,
              e.clientY,
              isSelected
            )
          }
        />
      </>
    );

  return (
    <>
      <rect
        x={rp.x - 4}
        y={rp.y - 4}
        fill="white"
        stroke={isSelected ? "blue" : "red"}
        strokeWidth={1}
        width={8}
        height={8}
      />
      <rect
        x={rp.x - 4}
        y={rp.y - 4}
        width={8}
        height={8}
        fill="black"
        stroke="black"
        strokeWidth={1 + CLICK_TARGET_OBJECT.defaultStrokeWidth}
        strokeOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        fillOpacity={CLICK_TARGET_OBJECT.strokeOpacity}
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      />
    </>
  );
};

export default NodeObject;
