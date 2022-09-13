import { usePoint } from "../../hooks/usePoint";
import { useSvgObject } from "../../states/svgObjectState";
import * as vp from "../../helpers/virtualPoint";

type Props = {
  svgId: SvgId | "preview";
};

const SvgObject: React.FC<Props> = ({ svgId }) => {
  const { svgObject: obj } = useSvgObject(svgId);
  const { toReal } = usePoint();

  if (!obj) return null;

  switch (obj.type) {
    case "line": {
      if (!obj.point1 || !obj.point2 || !obj.fixedPoint) return null;
      const r1 = toReal(vp.add(obj.point1, obj.fixedPoint));
      const r2 = toReal(vp.add(obj.point2, obj.fixedPoint));
      return (
        <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} {...obj.style}></line>
      );
    }
    case "polyline": {
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
    }
    case "text": {
      if (!obj.point || !obj.fixedPoint) return null;
      const text = obj.configMap?.get("text");
      if (!text) return null;
      const r = toReal(vp.add(obj.point, obj.fixedPoint));
      return (
        <text x={r.x} y={r.y} {...obj.style}>
          {text}
        </text>
      );
    }
    case "rect": {
      if (!obj.size || !obj.fixedPoint) return null;
      const r = toReal(vp.add(obj.upperLeft, obj.fixedPoint));
      const s = toReal(obj.size, true);
      return (
        <rect x={r.x} y={r.y} width={s.x} height={s.y} {...obj.style}></rect>
      );
    }
    case "circle": {
      if (!obj.c || !obj.r || !obj.fixedPoint) return null;
      const c = toReal(vp.add(obj.c, obj.fixedPoint));
      const r = toReal(obj.r, true);
      return (
        <ellipse cx={c.x} cy={c.y} rx={r.x} ry={r.y} {...obj.style}></ellipse>
      );
    }
  }
};

export default SvgObject;
