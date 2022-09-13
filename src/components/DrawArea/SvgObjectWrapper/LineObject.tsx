import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";

type Props = {
  obj: LineObject;
  parentPoint: VirtualPoint;
};

const LineObject: React.FC<Props> = ({ obj, parentPoint }) => {
  const { toReal } = usePoint();

  if (!obj.point1 || !obj.point2 || !obj.fixedPoint) return null;
  const r1 = toReal(
    vp.add(vp.add(obj.point1, obj.fixedPoint), parentPoint),
    true
  );
  const r2 = toReal(
    vp.add(vp.add(obj.point2, obj.fixedPoint), parentPoint),
    true
  );
  return <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} {...obj.style}></line>;
};

export default LineObject;
