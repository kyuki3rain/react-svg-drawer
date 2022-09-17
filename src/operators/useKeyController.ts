import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useResetPreview } from "../hooks/useResetPreview";
import { snapGridState } from "../states/snapGridState";

export const useKeyController = () => {
  const { resetPreview } = useResetPreview();

  const setSnapGrid = useSetRecoilState(snapGridState);

  const snapGridOff = useCallback(() => setSnapGrid(false), [setSnapGrid]);
  const snapGridOn = useCallback(() => setSnapGrid(true), [setSnapGrid]);

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
