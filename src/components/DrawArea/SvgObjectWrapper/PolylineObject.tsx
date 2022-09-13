import { usePoint } from "../../../hooks/usePoint";
import * as vp from "../../../helpers/virtualPoint";

type Props = {
  obj: PolylineObject;
};

const PolylineObject: React.FC<Props> = ({ obj }) => {
  const { toReal } = usePoint();

  if (!obj.fixedPoint) return null;
  const fp = obj.fixedPoint;
  const points = (
    obj.previewPoint ? [...obj.points, obj.previewPoint] : obj.points
  )
    .map((p) => {
      const r = toReal(vp.add(p, fp));
      return `${r.x},${r.y}`;
    })
    .join(" ");
  return <polyline points={points} {...obj.style}></polyline>;
};

export default PolylineObject;
