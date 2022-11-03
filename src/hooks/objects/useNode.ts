import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { vp } from "../../helpers/virtualPoint";
import { hasEdgeSelector } from "../../selectors/wireSelector";
import { areaConfigState } from "../../states/areaConfigState";

type Props = {
  obj: NodeObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useNode = ({ obj, parentPoint }: Props) => {
  const edgeCount = useRecoilValue(hasEdgeSelector(obj.id));
  const { pitch } = useRecoilValue(areaConfigState);

  const rp = useMemo(
    () =>
      obj.fixedPoint && vp.toReal(vp.add(obj.fixedPoint, parentPoint), pitch),
    [obj.fixedPoint, parentPoint, pitch]
  );

  const isCircle = useMemo(() => edgeCount >= 2, [edgeCount]);

  return {
    rp,
    isCircle,
  };
};
