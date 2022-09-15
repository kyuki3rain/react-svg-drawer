import { useSvgObject } from "../../states/svgObjectState";
import TextObject from "./SvgObjectWrapper/TextObject";
import LineObject from "./SvgObjectWrapper/LineObject";
import PolylineObject from "./SvgObjectWrapper/PolylineObject";
import RectObject from "./SvgObjectWrapper/RectObject";
import CircleObject from "./SvgObjectWrapper/CircleObject";
import { usePoint } from "../../hooks/usePoint";
import GroupObject from "./SvgObjectWrapper/GroupObject";

type Props = {
  svgId: SvgId | "preview";
  parentPoint?: VirtualPoint;
  isSelected: boolean;
};

const SvgObjectWrapper: React.FC<Props> = ({
  svgId,
  parentPoint,
  isSelected,
}) => {
  const { svgObject: obj } = useSvgObject(svgId);
  const { rootPoint } = usePoint();

  if (!obj) return null;

  switch (obj.type) {
    case "line":
      return (
        <LineObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
        ></LineObject>
      );
    case "polyline":
      return (
        <PolylineObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
        ></PolylineObject>
      );
    case "text":
      return (
        <TextObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
        ></TextObject>
      );
    case "rect":
      return (
        <RectObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
        ></RectObject>
      );
    case "circle":
      return (
        <CircleObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
        ></CircleObject>
      );
    case "group":
      return (
        <GroupObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
        ></GroupObject>
      );
  }
};

export default SvgObjectWrapper;
