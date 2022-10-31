import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useObject } from "../../operators/useObject";
import { showAreaModeState } from "../../states/areaConfigState";

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
  const showAreaMode = useRecoilValue(showAreaModeState);

  const upperLeft = useMemo(
    () => obj.area.upperLeft && toRealAbsolute(obj.area.upperLeft),
    [obj.area.upperLeft, toRealAbsolute]
  );

  const bottomRight = useMemo(
    () => obj.area.bottomRight && toRealAbsolute(obj.area.bottomRight),
    [obj.area.bottomRight, toRealAbsolute]
  );

  if (!upperLeft || !bottomRight) return null;
  if (!showAreaMode) return null;

  return {
    x: upperLeft.x,
    y: upperLeft.y,
    width: bottomRight.x - upperLeft.x,
    height: bottomRight.y - upperLeft.y,
  };
};
