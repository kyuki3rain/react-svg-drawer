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
  const { groupPoint, draw, onClick } = useGroup({
    obj,
    parentPoint,
    parentId,
  });
  if (!groupPoint || !draw) return null;

  return (
    <svg onClick={(e) => onClick(e.stopPropagation)}>
      {obj.objectIds.map((id) => (
        <SvgObjectWrapper
          key={id}
          svgId={id}
          parentId={obj.id}
          parentPoint={groupPoint}
          isSelected={isSelected}
        ></SvgObjectWrapper>
      ))}
    </svg>
  );
};

export default GroupObject;
