import { useText } from "../../../hooks/objects/useText";

type Props = {
  obj: TextObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const TextObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { r, text, onClick } = useText({ obj, parentPoint, parentId });
  if (!r || !text) return null;

  return (
    <>
      <text
        x={r.x}
        y={r.y}
        {...obj.style}
        stroke={isSelected ? "blue" : "black"}
        onClick={(e) => onClick(e.stopPropagation)}
      >
        {text}
      </text>
    </>
  );
};

export default TextObject;
