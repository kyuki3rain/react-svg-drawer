import { useSetAreaConfig } from "../states/areaConfigState";

const useMove = () => {
  const { setUpperLeftRelative } = useSetAreaConfig();

  return {
    MoveToLeft: (d: number) => setUpperLeftRelative(-d, 0),
    MoveToRight: (d: number) => setUpperLeftRelative(d, 0),
    MoveToTop: (d: number) => setUpperLeftRelative(0, -d),
    MoveToBottom: (d: number) => setUpperLeftRelative(0, d),
  };
};
