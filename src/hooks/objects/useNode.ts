import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { vp } from "../../helpers/virtualPoint";
import { useObject } from "../../operators/useObject";
import { useSvgObject } from "../../operators/useSvgObject";
import { hasEdgeSelector } from "../../selectors/wireSelector";
import { areaConfigState } from "../../states/areaConfigState";

type Props = {
  obj: NodeObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useNode = ({ obj, parentPoint, parentId }: Props) => {
  const edgeCount = useRecoilValue(hasEdgeSelector(obj.id));
  const { pitch } = useRecoilValue(areaConfigState);
  const { onClick, onMouseDown } = useObject({
    obj,
    parentPoint,
    parentId,
  });
  const { setNodeObjectPoint } = useSvgObject();

  useEffect(
    () =>
      obj.fixedPoint &&
      setNodeObjectPoint(obj, vp.add(obj.fixedPoint, parentPoint)),
    [obj, parentPoint, setNodeObjectPoint]
  );

  const rp = useMemo(
    () =>
      obj.fixedPoint && vp.toReal(vp.add(obj.fixedPoint, parentPoint), pitch),
    [obj, parentPoint, pitch]
  );

  const isCircle = useMemo(() => edgeCount >= 2, [edgeCount]);

  return {
    rp,
    isCircle,
    onClick,
    onMouseDown,
  };
};
