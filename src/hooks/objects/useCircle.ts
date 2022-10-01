import { useMemo } from "react";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: CircleObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview" | "select";
};

export const useCircle = ({ obj, parentPoint, parentId }: Props) => {
  const { toRealAbsolute, toRealRelative, onClick, onMouseDown, onMouseUp } =
    useObject({
      obj,
      parentPoint,
      parentId,
    });

  const c = useMemo(
    () => obj.c && toRealAbsolute(obj.c),
    [obj.c, toRealAbsolute]
  );
  const r = useMemo(
    () => obj.r && toRealRelative(obj.r),
    [obj.r, toRealRelative]
  );

  return {
    c,
    r,
    onClick,
    onMouseDown,
    onMouseUp,
  };
};
