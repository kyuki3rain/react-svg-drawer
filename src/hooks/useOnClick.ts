import { useDrawMode } from "../states/drawModeState";

export const useOnClick = () => {
  const { drawMode } = useDrawMode();

  const onClick = () => {
    switch (drawMode.mode) {
      case "line": {
        break;
      }
      case "text": {
        break;
      }
      case "copy": {
        break;
      }
      default:
    }
  };
};
