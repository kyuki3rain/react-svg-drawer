import { useResetPreview } from "./useResetPreview";

export const useKey = () => {
  const { resetPreview } = useResetPreview();

  const onKeyDown = (code: string) => {
    console.log(code);
    switch (code) {
      case "Escape":
        resetPreview();
        break;
      default:
    }
  };

  return {
    onKeyDown,
  };
};
