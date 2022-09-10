import { useGrid } from "../../hooks/useGrid";
import { useWindowSize } from "../../hooks/useWindowSize";

const Grids: React.FC = () => {
  const { VerticalGridArray, HorizontalGridArray } = useGrid();
  const { height, width } = useWindowSize();

  return (
    <svg>
      {VerticalGridArray.map((x, i) => (
        <line
          key={`vertical-grid-${i}`}
          x1={x}
          x2={x}
          y1={0}
          y2={height}
          stroke="lightgray"
          strokeWidth={1}
        />
      ))}
      {HorizontalGridArray.map((y, i) => (
        <line
          key={`horizontal-grid-${i}`}
          x1={0}
          x2={width}
          y1={y}
          y2={y}
          stroke="lightgray"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
};

export default Grids;
