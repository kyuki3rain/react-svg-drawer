import { useMemo } from "react";
import * as vp from "../../../helpers/virtualPoint";
import { useObject } from "../../../hooks/useObject";
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
  const { onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });
  const groupPoint = useMemo(
    () => obj.fixedPoint && vp.add(obj.fixedPoint, parentPoint),
    [obj.fixedPoint, parentPoint]
  );

  if (!groupPoint || obj.objectIds.length === 0) return null;

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
