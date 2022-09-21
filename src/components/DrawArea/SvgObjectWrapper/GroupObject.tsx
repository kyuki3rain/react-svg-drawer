import * as vp from "../../../helpers/virtualPoint";
import { useOnClickObject } from "../../../operators/useOnClickObject";
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
  const { onClick } = useOnClickObject();

  if (!obj.fixedPoint || obj.objectIds.length === 0) return null;
  const groupPoint = vp.add(obj.fixedPoint, parentPoint);

  return (
    <svg
      onClick={(e) => {
        const id = parentId ?? obj.id;
        if (!id) return;
        if (id === "preview") return;
        if (onClick(id)) e.stopPropagation();
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
