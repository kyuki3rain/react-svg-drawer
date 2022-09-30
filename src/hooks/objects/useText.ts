import { useMemo } from "react";
import { useObject } from "../../operators/useObject";

type Props = {
  obj: TextObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview" | "select";
};

export const useText = ({ obj, parentPoint, parentId }: Props) => {
  const { toRealAbsolute, onClick } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r = useMemo(
    () => obj.point && toRealAbsolute(obj.point),
    [obj.point, toRealAbsolute]
  );
  const text = useMemo(() => obj.configMap?.get("text"), [obj.configMap]);

  return {
    r,
    text,
    onClick,
  };
};
