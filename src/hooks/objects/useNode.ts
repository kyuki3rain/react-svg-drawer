import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useObject } from "../../operators/useObject";
import { hasEdgeSelector } from "../../selectors/wireSelector";

type Props = {
  obj: NodeObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useNode = ({ obj, parentPoint, parentId }: Props) => {
  const edgeCount = useRecoilValue(hasEdgeSelector(obj.id));
  const { toRealAbsolute } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const rp = useMemo(
    () => obj.fixedPoint && toRealAbsolute(obj.fixedPoint),
    [obj.fixedPoint, toRealAbsolute]
  );

  const isCircle = useMemo(() => edgeCount >= 2, [edgeCount]);

  return {
    rp,
    isCircle,
  };
};
