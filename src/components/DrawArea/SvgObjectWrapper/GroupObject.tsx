import { useArea } from "../../../hooks/objects/useArea";
import { useGroup } from "../../../hooks/objects/useGroup";
import SvgObjectWrapper from "../SvgObjectWrapper";

type Props = {
  obj: GroupObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const GroupObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { groupPoint, draw, onClick, onMouseDown } = useGroup({
    obj,
    parentPoint,
    parentId,
  });
  const area = useArea({
    obj,
    parentPoint,
    parentId,
  });
  if (!groupPoint || !draw) return null;

  return (
    <svg
      onClick={(e) => onClick(() => e.stopPropagation())}
      onMouseDown={(e) =>
        onMouseDown(() => e.stopPropagation(), e.clientX, e.clientY, isSelected)
      }
    >
      {obj.objectIds.map((id) => (
        <SvgObjectWrapper
          key={id}
          svgId={id}
          parentId={obj.id}
          parentPoint={groupPoint}
          isSelected={isSelected}
        ></SvgObjectWrapper>
      ))}
      {area && (
        <rect
          x={area.x}
          y={area.y}
          width={area.width}
          height={area.height}
          stroke="red"
          fill="none"
        ></rect>
      )}
    </svg>
  );
};

export default GroupObject;
