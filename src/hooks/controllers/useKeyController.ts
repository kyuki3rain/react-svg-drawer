import { useRecoilCallback } from "recoil";
import { useResetPreview } from "../../operators/useResetPreview";
import { useSelectMode } from "../../operators/useSelectMode";
import { snapGridState } from "../../states/snapGridState";

export const useKeyController = () => {
  const { resetPreview } = useResetPreview();
  const { toMoveMode, toCopyMode } = useSelectMode();

  const onKeyUp = useRecoilCallback(
    ({ set }) =>
      (key: string) => {
        switch (key) {
          case "Control":
            toMoveMode();
            break;
          case "Alt":
            set(snapGridState, true);
            break;
          default:
        }
      },
    [toMoveMode]
  );

  const onKeyDown = useRecoilCallback(
    ({ set }) =>
      (key: string) => {
        switch (key) {
          case "Escape":
            resetPreview();
            break;
          case "Control":
            toCopyMode();
            break;
          case "Alt":
            set(snapGridState, false);
            break;
          default:
        }
      },
    [resetPreview, toCopyMode]
  );

  return {
    onKeyDown,
    onKeyUp,
  };
};
