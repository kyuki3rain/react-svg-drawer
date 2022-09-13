import { useConfigModal } from "../states/configModalState";
import { useDrawMode } from "../states/drawModeState";
import { useSetSvgObject } from "../states/svgObjectState";

export const useResetPreview = () => {
  const { deleteSvgObject, addOrUpdateSvgObject } = useSetSvgObject("preview");
  const { drawMode } = useDrawMode();
  const { openModal } = useConfigModal();

  const resetPreview = () => {
    switch (drawMode.mode) {
      case "text": {
        const textConfig = [{ key: "text", defaultValue: "" }];
        addOrUpdateSvgObject({
          type: "text",
          configMap: new Map(textConfig.map((c) => [c.key, c.defaultValue])),
          style: { stroke: "black" },
        });
        openModal("text", "preview", textConfig);
        break;
      }
      default:
        deleteSvgObject();
    }
  };

  return {
    resetPreview,
  };
};
