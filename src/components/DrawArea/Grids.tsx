import { useGrid } from "../../hooks/useGrid";
import { useWindowSize } from "../../hooks/useWindowSize";

const Grids: React.FC = () => {
  const { VerticalGridArray, HorizontalGridArray } = useGrid();
  const { height, width } = useWindowSize();

  return (
    <svg>
      {VerticalGridArray.map((rp, i) => (
        <line
          key={`vertical-grid-${i}`}
          x1={rp.x}
          x2={rp.x}
          y1={rp.y}
          y2={height}
          stroke="lightgray"
          strokeWidth={1}
        />
      ))}
      {HorizontalGridArray.map((rp, i) => (
        <line
          key={`horizontal-grid-${i}`}
          x1={rp.x}
          x2={width}
          y1={rp.y}
          y2={rp.y}
          stroke="lightgray"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
};

export default Grids;
