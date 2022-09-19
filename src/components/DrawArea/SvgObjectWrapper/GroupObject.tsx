import * as vp from "../../../helpers/virtualPoint";
import { useSelect } from "../../../operators/useSelect";
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
  const { onClick } = useSelect();

  if (!obj.fixedPoint || obj.objectIds.length === 0) return null;
  const groupPoint = vp.add(obj.fixedPoint, parentPoint);

  return (
    <svg
      onClick={(e) => {
        if (onClick(parentId ?? obj.id)) e.stopPropagation();
      }}
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
    </svg>
  );
};

export default GroupObject;
