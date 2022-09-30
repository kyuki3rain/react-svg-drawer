import { useRecoilCallback } from "recoil";
import { useResetPreview } from "../../operators/useResetPreview";

export const useKeyController = () => {
  const { resetPreview } = useResetPreview();

  const onKeyUp = useRecoilCallback(
    () => (key: string) => {
      switch (key) {
        case "Alt":
        default:
      }
    },
    []
  );

  const onKeyDown = useRecoilCallback(
    () => (key: string) => {
      switch (key) {
        case "Escape":
          resetPreview();
          break;
        case "Alt":
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
