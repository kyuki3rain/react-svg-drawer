import { useMemo } from "react";
import { vp } from "../../helpers/virtualPoint";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: GroupObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useGroup = ({ obj, parentPoint, parentId }: Props) => {
  const { onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });
  const groupPoint = useMemo(
    () => obj.fixedPoint && vp.add(obj.fixedPoint, parentPoint),
    [obj.fixedPoint, parentPoint]
  );

  return {
    groupPoint,
    draw: obj.objectIds.length === 0,
    onClick,
  };
};
