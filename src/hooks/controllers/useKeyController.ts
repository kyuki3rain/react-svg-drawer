import { useRecoilCallback } from "recoil";
import { useResetPreview } from "../../operators/useResetPreview";
import { drawModeState } from "../../states/drawModeState";

export const useKeyController = () => {
  const { resetPreview } = useResetPreview();

  const onKeyUp = useRecoilCallback(
    ({ snapshot, set }) =>
      (key: string) => {
        switch (key) {
          case "Alt":
            if (snapshot.getLoadable(drawModeState).getValue() === "copy")
              set(drawModeState, "move");
            break;
          default:
        }
      },
    []
  );

  const onKeyDown = useRecoilCallback(
    ({ snapshot, set }) =>
      (key: string) => {
        switch (key) {
          case "Escape":
            resetPreview();
            break;
          case "Alt":
            if (snapshot.getLoadable(drawModeState).getValue() === "move")
              set(drawModeState, "copy");
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
