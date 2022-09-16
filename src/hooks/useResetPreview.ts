import { useCallback } from "react";
import { useConfigModal } from "../states/configModalState";
import { useDrawMode } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";
import { useSvgObject } from "../states/svgObjectState";
import { useGroup } from "./useGroup";

export const useResetPreview = () => {
  const { deleteSvgObject, addOrUpdateSvgObject, svgObject } =
    useSvgObject("preview");
  const { drawMode } = useDrawMode();
  const { openModal } = useConfigModal();
  const { resetSelect } = useSetSelectedSvgId();
  const { resetPreviewGroup } = useGroup();

  const resetPreview = useCallback(() => {
    if (svgObject && svgObject.type === "group") {
      resetPreviewGroup(svgObject);
    }

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
      case "move":
        deleteSvgObject();
        break;
      default:
        resetSelect();
        deleteSvgObject();
    }
  }, [
    addOrUpdateSvgObject,
    deleteSvgObject,
    drawMode.mode,
    openModal,
    resetPreviewGroup,
    resetSelect,
    svgObject,
  ]);

  return {
    resetPreview,
  };
};
