import { useRecoilCallback } from "recoil";
import { useResetPreview } from "../../operators/useResetPreview";
import { snapGridState } from "../../states/snapGridState";

export const useKeyController = () => {
  const { resetPreview } = useResetPreview();

  const onKeyUp = useRecoilCallback(
    ({ set }) =>
      (key: string) => {
        switch (key) {
          case "Alt":
            set(snapGridState, true);
            break;
          default:
        }
      },
    []
  );

  const onKeyDown = useRecoilCallback(
    ({ set }) =>
      (key: string) => {
        switch (key) {
          case "Escape":
            resetPreview();
            break;
          case "Alt":
            set(snapGridState, false);
            break;
          default:
        }
      },
    [resetPreview]
  );

  return {
    onKeyDown,
    onKeyUp,
  };
};
