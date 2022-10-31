import { useMemo } from "react";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: SvgObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useArea = ({ obj, parentPoint, parentId }: Props) => {
  const { toRealAbsolute } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const upperLeft = useMemo(
    () => obj.area.upperLeft && toRealAbsolute(obj.area.upperLeft),
    [obj.area.upperLeft, toRealAbsolute]
  );

  const bottomRight = useMemo(
    () => obj.area.bottomRight && toRealAbsolute(obj.area.bottomRight),
    [obj.area.bottomRight, toRealAbsolute]
  );

  if (!upperLeft || !bottomRight) return null;

  return {
    x: upperLeft.x,
    y: upperLeft.y,
    width: bottomRight.x - upperLeft.x,
    height: bottomRight.y - upperLeft.y,
  };
};
