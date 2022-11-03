import { useEdge } from "../../../hooks/objects/useEdge";

type Props = {
  obj: EdgeObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const EdgeObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { r1, r2 } = useEdge({
    obj,
    parentPoint,
    parentId,
  });
  if (!r1 || !r2) return null;

  return (
    <>
      <line
        x1={r1.x}
        y1={r1.y}
        x2={r2.x}
        y2={r2.y}
        stroke={isSelected ? "blue" : "red"}
      ></line>
    </>
  );
};

export default EdgeObject;
