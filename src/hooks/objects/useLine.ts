import { useMemo } from "react";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: LineObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview" | "select";
};

export const useLine = ({ obj, parentPoint, parentId }: Props) => {
  const { toRealAbsolute, onClick, onMouseDown, onMouseUp } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r1 = useMemo(
    () => obj.point1 && toRealAbsolute(obj.point1),
    [obj.point1, toRealAbsolute]
  );
  const r2 = useMemo(
    () => obj.point2 && toRealAbsolute(obj.point2),
    [obj.point2, toRealAbsolute]
  );

  return {
    r1,
    r2,
    onClick,
    onMouseDown,
    onMouseUp,
  };
};
