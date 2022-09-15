import * as vp from "../../../helpers/virtualPoint";
import SvgObjectWrapper from "../SvgObjectWrapper";

type Props = {
  obj: GroupObject;
  parentPoint: VirtualPoint;
};

const GroupObject: React.FC<Props> = ({ obj, parentPoint }) => {
  if (!obj.fixedPoint || obj.objectIds.length === 0) return null;
  const groupPoint = vp.add(obj.fixedPoint, parentPoint);

  return (
    <svg>
      {obj.objectIds.map((id) => (
        <SvgObjectWrapper
          svgId={id}
          parentPoint={groupPoint}
          key={id}
        ></SvgObjectWrapper>
      ))}
    </svg>
  );
};

export default GroupObject;
