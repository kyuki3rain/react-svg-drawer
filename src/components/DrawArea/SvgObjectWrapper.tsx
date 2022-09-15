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
  parentId?: SvgId | "preview";
  isSelected: boolean;
};

const SvgObjectWrapper: React.FC<Props> = ({
  svgId,
  parentPoint,
  isSelected,
  parentId,
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
          parentId={parentId}
        ></LineObject>
      );
    case "polyline":
      return (
        <PolylineObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></PolylineObject>
      );
    case "text":
      return (
        <TextObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></TextObject>
      );
    case "rect":
      return (
        <RectObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></RectObject>
      );
    case "circle":
      return (
        <CircleObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></CircleObject>
      );
    case "group":
      return (
        <GroupObject
          obj={obj}
          parentPoint={parentPoint ?? rootPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></GroupObject>
      );
  }
};

export default SvgObjectWrapper;
