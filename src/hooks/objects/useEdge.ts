import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { vp } from "../../helpers/virtualPoint";
import { useObject } from "../../operators/useObject";
import { edgePointsSelector } from "../../selectors/wireSelector";
import { areaConfigState } from "../../states/areaConfigState";

type Props = {
  obj: EdgeObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useEdge = ({ obj, parentPoint, parentId }: Props) => {
  const [point1, point2] = useRecoilValue(edgePointsSelector(obj.id));
  const { pitch } = useRecoilValue(areaConfigState);
  const { onClick, onMouseDown } = useObject({
    obj,
    parentPoint,
    parentId,
  });

  const r1 = useMemo(
    () => point1 && vp.toReal(vp.add(point1, parentPoint), pitch),
    [parentPoint, pitch, point1]
  );
  const r2 = useMemo(
    () => point2 && vp.toReal(vp.add(point2, parentPoint), pitch),
    [parentPoint, pitch, point2]
  );

  return {
    r1,
    r2,
    onClick,
    onMouseDown,
  };
};
