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
        deleteSvgObject();
        break;
      case "polyline":
        resetSelect();
        deleteSvgObject();
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
        deleteSvgObject();
        break;
      case "circle":
        resetSelect();
        deleteSvgObject();
        break;
      default:
        deleteSvgObject();
    }
  };

  return {
    resetPreview,
  };
};
