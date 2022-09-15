import { useConfigModal } from "../states/configModalState";
import { useDrawMode } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";
import { useSetSvgObject } from "../states/svgObjectState";

export const useResetPreview = () => {
  const { deleteSvgObject, addOrUpdateSvgObject } = useSetSvgObject("preview");
  const { drawMode } = useDrawMode();
  const { openModal } = useConfigModal();
  const { resetSelect } = useSetSelectedSvgId();

  const resetPreview = () => {
    switch (drawMode.mode) {
      case "selector":
        break;
      case "line":
        resetSelect();
        break;
      case "polyline":
        resetSelect();
        break;
      case "text": {
        resetSelect();
        const textConfig = [{ key: "text", defaultValue: "" }];
        addOrUpdateSvgObject({
          type: "text",
          configMap: new Map(textConfig.map((c) => [c.key, c.defaultValue])),
          style: { stroke: "black" },
        });
        openModal("text", "preview", textConfig);
        break;
      }
      case "rect":
        resetSelect();
        break;
      case "circle":
        resetSelect();
        break;
      default:
        deleteSvgObject();
    }
  };

  return {
    resetPreview,
  };
};
