import { useSvgObject } from "../../states/svgObjectState";
import TextObject from "./SvgObjectWrapper/TextObject";
import LineObject from "./SvgObjectWrapper/LineObject";
import PolylineObject from "./SvgObjectWrapper/PolylineObject";
import RectObject from "./SvgObjectWrapper/RectObject";
import CircleObject from "./SvgObjectWrapper/CircleObject";

type Props = {
  svgId: SvgId | "preview";
};

const SvgObjectWrapper: React.FC<Props> = ({ svgId }) => {
  const { svgObject: obj } = useSvgObject(svgId);

  if (!obj) return null;

  switch (obj.type) {
    case "line":
      return <LineObject obj={obj}></LineObject>;
    case "polyline":
      return <PolylineObject obj={obj}></PolylineObject>;
    case "text":
      return <TextObject obj={obj}></TextObject>;
    case "rect":
      return <RectObject obj={obj}></RectObject>;
    case "circle":
      return <CircleObject obj={obj}></CircleObject>;
  }
};

export default SvgObjectWrapper;
