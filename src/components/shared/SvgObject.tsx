import { usePoint } from "../../hooks/usePoint";
import { useSvgObject } from "../../states/svgObjectState";

type Props = {
  svgId: SvgId;
};

const SvgObject: React.FC<Props> = ({ svgId }) => {
  const { svgObject: obj } = useSvgObject(svgId);
  const { toReal } = usePoint();

  if (!obj) return null;

  switch (obj.type) {
    case "line": {
      if (!obj.point2) return null;
      const r1 = toReal(obj.point1);
      const r2 = toReal(obj.point2);
      return (
        <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} {...obj.style}></line>
      );
    }
    case "polyline": {
      const points = (
        obj.previewPoint ? [...obj.points, obj.previewPoint] : obj.points
      )
        .map((p) => {
          const r = toReal(p);
          return `${r.x},${r.y}`;
        })
        .join(" ");
      return <polyline points={points} {...obj.style}></polyline>;
    }
    case "text": {
      const r = toReal(obj.point);
      return (
        <text x={r.x} y={r.y} {...obj.style}>
          {obj.text}
        </text>
      );
    }
  }
};

export default SvgObject;
