import { svgObjectStates } from "../../states/svgObjectState";
import TextObject from "./SvgObjectWrapper/TextObject";
import LineObject from "./SvgObjectWrapper/LineObject";
import PolylineObject from "./SvgObjectWrapper/PolylineObject";
import RectObject from "./SvgObjectWrapper/RectObject";
import CircleObject from "./SvgObjectWrapper/CircleObject";
import GroupObject from "./SvgObjectWrapper/GroupObject";
import { useRecoilValue } from "recoil";

type Props = {
  svgId: SvgId | "preview" | "select";
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview" | "select";
  isSelected: boolean;
};

const SvgObjectWrapper: React.FC<Props> = ({
  svgId,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const obj = useRecoilValue(svgObjectStates(svgId));

  if (!obj) return null;

  switch (obj.type) {
    case "line":
      return (
        <LineObject
          obj={obj}
          parentPoint={parentPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></LineObject>
      );
    case "polyline":
      return (
        <PolylineObject
          obj={obj}
          parentPoint={parentPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></PolylineObject>
      );
    case "text":
      return (
        <TextObject
          obj={obj}
          parentPoint={parentPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></TextObject>
      );
    case "rect":
      return (
        <RectObject
          obj={obj}
          parentPoint={parentPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></RectObject>
      );
    case "circle":
      return (
        <CircleObject
          obj={obj}
          parentPoint={parentPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></CircleObject>
      );
    case "group":
      return (
        <GroupObject
          obj={obj}
          parentPoint={parentPoint}
          isSelected={isSelected}
          parentId={parentId}
        ></GroupObject>
      );
  }
};

export default SvgObjectWrapper;
