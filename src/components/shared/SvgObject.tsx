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
    case "text": {
      return <text></text>;
    }
  }
};

export default SvgObject;
