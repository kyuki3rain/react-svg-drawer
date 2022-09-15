import { useConfigModal } from "../states/configModalState";
import { useDrawMode } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";
import { useSvgObject } from "../states/svgObjectState";
import { useGroup } from "./usePreviewGroup";

export const useResetPreview = () => {
  const { deleteSvgObject, addOrUpdateSvgObject, svgObject } =
    useSvgObject("preview");
  const { drawMode } = useDrawMode();
  const { openModal } = useConfigModal();
  const { resetSelect } = useSetSelectedSvgId();
  const { resetPreviewGroup } = useGroup();

  const resetPreview = () => {
    if (svgObject && svgObject.type === "group") resetPreviewGroup(svgObject);

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
      case "copy":
        deleteSvgObject();
        break;
      default:
        resetSelect();
        deleteSvgObject();
    }
  };

  return {
    resetPreview,
  };
};
