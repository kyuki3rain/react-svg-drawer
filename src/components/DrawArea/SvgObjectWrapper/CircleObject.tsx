import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";

type Props = {
  obj: CircleObject;
  parentPoint: VirtualPoint;
};

const CircleObject: React.FC<Props> = ({ obj, parentPoint }) => {
  const { toReal } = usePoint();

  if (!obj.c || !obj.r || !obj.fixedPoint) return null;
  const c = toReal(vp.add(vp.add(obj.c, obj.fixedPoint), parentPoint), true);
  const r = toReal(obj.r, true);
  return <ellipse cx={c.x} cy={c.y} rx={r.x} ry={r.y} {...obj.style}></ellipse>;
};

export default CircleObject;
