import { useRecoilCallback } from "recoil";
import { useConfigModal } from "../states/configModalState";
import { drawModeState } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";
import { useSetSvgObject, useSvgObjects } from "../states/svgObjectState";

export const useResetPreview = () => {
  const { deleteSvgObject, addOrUpdateSvgObject } = useSetSvgObject("preview");
  const { resetPreviewGroup } = useSvgObjects();
  const { openModal } = useConfigModal();
  const { resetSelect } = useSetSelectedSvgId();

  const resetPreview = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        resetPreviewGroup();

        switch (drawMode.mode) {
          case "text": {
            const textConfig = [{ key: "text", defaultValue: "" }];
            addOrUpdateSvgObject({
              type: "text",
              configMap: new Map(
                textConfig.map((c) => [c.key, c.defaultValue])
              ),
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
      },
    [
      addOrUpdateSvgObject,
      deleteSvgObject,
      openModal,
      resetSelect,
      resetPreviewGroup,
    ]
  );

  return {
    resetPreview,
  };
};
