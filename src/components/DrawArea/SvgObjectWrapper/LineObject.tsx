import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";

type Props = {
  obj: LineObject;
};

const LineObject: React.FC<Props> = ({ obj }) => {
  const { toReal } = usePoint();

  if (!obj.point1 || !obj.point2 || !obj.fixedPoint) return null;
  const r1 = toReal(vp.add(obj.point1, obj.fixedPoint));
  const r2 = toReal(vp.add(obj.point2, obj.fixedPoint));
  return <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} {...obj.style}></line>;
};

export default LineObject;
