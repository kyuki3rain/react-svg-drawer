import { useNode } from "../../../hooks/objects/useNode";

type Props = {
  obj: NodeObject;
  parentPoint: VirtualPoint;
  isSelected: boolean;
  parentId?: SvgId | "preview";
};

const LineObject: React.FC<Props> = ({
  obj,
  parentPoint,
  isSelected,
  parentId,
}) => {
  const { rp, isCircle } = useNode({
    obj,
    parentPoint,
    parentId,
  });

  if (!rp) return null;

  if (isCircle)
    return (
      <>
        <circle
          cx={rp.x}
          cy={rp.y}
          fill="black"
          stroke={isSelected ? "blue" : "black"}
          r={4}
        />
      </>
    );

  return (
    <>
      <rect
        x={rp.x - 4}
        y={rp.y - 4}
        fill="white"
        stroke={isSelected ? "blue" : "black"}
        strokeWidth={1}
        width={8}
        height={8}
      />
    </>
  );
};

export default LineObject;
