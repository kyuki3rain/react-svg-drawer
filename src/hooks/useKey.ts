import { useCallback } from "react";
import { useSetSnapGrid } from "../states/snapGridState";
import { useResetPreview } from "./useResetPreview";

export const useKey = () => {
  const { resetPreview } = useResetPreview();
  const { snapGridOff, snapGridOn } = useSetSnapGrid();

  const onKeyUp = useCallback(
    (key: string) => {
      switch (key) {
        case "Alt":
          snapGridOn();
          break;
        default:
      }
    },
    [snapGridOn]
  );

  const onKeyDown = useCallback(
    (key: string) => {
      switch (key) {
        case "Escape":
          resetPreview();
          break;
        case "Alt":
          snapGridOff();
          break;
        default:
      }
    },
    [resetPreview, snapGridOff]
  );

  return {
    onKeyDown,
    onKeyUp,
  };
};
