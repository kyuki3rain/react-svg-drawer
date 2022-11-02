import { useArea } from "../../../hooks/objects/useArea";
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
  const { r, text, onClick, onMouseDown } = useText({
    obj,
    parentPoint,
    parentId,
  });
  const area = useArea({
    obj,
    parentPoint,
    parentId,
    isSelected,
  });
  if (!r || !text) return null;

  return (
    <>
      <text
        x={r.x}
        y={r.y}
        {...obj.style}
        stroke={isSelected ? "blue" : obj.style.stroke}
        onClick={(e) => onClick(() => e.stopPropagation())}
        onMouseDown={(e) =>
          onMouseDown(
            () => e.stopPropagation(),
            e.clientX,
            e.clientY,
            isSelected
          )
        }
      >
        {text}
      </text>
      {area && (
        <rect
          x={area.x}
          y={area.y}
          width={area.width}
          height={area.height}
          stroke="blue"
          fill="none"
          strokeDasharray="4 4"
        ></rect>
      )}
    </>
  );
};

export default TextObject;
