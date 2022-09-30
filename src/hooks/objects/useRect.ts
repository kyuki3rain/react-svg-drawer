import { useMemo } from "react";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: RectObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview" | "select";
};

export const useRect = ({ obj, parentPoint, parentId }: Props) => {
  const { toRealAbsolute, toRealRelative, onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r = useMemo(
    () => obj.upperLeft && toRealAbsolute(obj.upperLeft),
    [obj.upperLeft, toRealAbsolute]
  );
  const s = useMemo(
    () => obj.size && toRealRelative(obj.size),
    [obj.size, toRealRelative]
  );

  return {
    r,
    s,
    onClick,
  };
};
