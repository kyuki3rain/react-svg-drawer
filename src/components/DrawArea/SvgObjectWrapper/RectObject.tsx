import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";

type Props = {
  obj: RectObject;
};

const RectObject: React.FC<Props> = ({ obj }) => {
  const { toReal } = usePoint();

  if (!obj.size || !obj.fixedPoint) return null;
  const r = toReal(vp.add(obj.upperLeft, obj.fixedPoint));
  const s = toReal(obj.size, true);
  return <rect x={r.x} y={r.y} width={s.x} height={s.y} {...obj.style}></rect>;
};

export default RectObject;
