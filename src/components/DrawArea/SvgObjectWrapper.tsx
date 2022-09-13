import { useSvgObject } from "../../states/svgObjectState";
import TextObject from "./SvgObjectWrapper/TextObject";
import LineObject from "./SvgObjectWrapper/LineObject";
import PolylineObject from "./SvgObjectWrapper/PolylineObject";
import RectObject from "./SvgObjectWrapper/RectObject";
import CircleObject from "./SvgObjectWrapper/CircleObject";
import { usePoint } from "../../hooks/usePoint";

type Props = {
  svgId: SvgId | "preview";
  parentPoint?: VirtualPoint;
};

const SvgObjectWrapper: React.FC<Props> = ({ svgId, parentPoint }) => {
  const { svgObject: obj } = useSvgObject(svgId);
  const { rootPoint } = usePoint();

  if (!obj) return null;

  switch (obj.type) {
    case "line":
      return (
        <LineObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
        ></LineObject>
      );
    case "polyline":
      return (
        <PolylineObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
        ></PolylineObject>
      );
    case "text":
      return (
        <TextObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
        ></TextObject>
      );
    case "rect":
      return (
        <RectObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
        ></RectObject>
      );
    case "circle":
      return (
        <CircleObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
        ></CircleObject>
      );
  }
};

export default SvgObjectWrapper;
