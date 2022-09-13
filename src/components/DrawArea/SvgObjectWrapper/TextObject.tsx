import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";

type Props = {
  obj: TextObject;
};

const TextObject: React.FC<Props> = ({ obj }) => {
  const { toReal } = usePoint();

  if (!obj.point || !obj.fixedPoint) return null;
  const text = obj.configMap?.get("text");
  if (!text) return null;
  const r = toReal(vp.add(obj.point, obj.fixedPoint));
  return (
    <text x={r.x} y={r.y} {...obj.style}>
      {text}
    </text>
  );
};

export default TextObject;
