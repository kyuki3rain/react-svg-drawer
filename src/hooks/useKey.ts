import { useSetSnapGrid } from "../states/snapGridState";
import { useResetPreview } from "./useResetPreview";

export const useKey = () => {
  const { resetPreview } = useResetPreview();
  const { snapGridOff, snapGridOn } = useSetSnapGrid();

  const onKeyUp = (key: string) => {
    switch (key) {
      case "Alt":
        snapGridOn();
        break;
      default:
    }
  };

  const onKeyDown = (key: string) => {
    switch (key) {
      case "Escape":
        resetPreview();
        break;
      case "Alt":
        snapGridOff();
        break;
      default:
    }
  };

  return {
    onKeyDown,
    onKeyUp,
  };
};
