import { useRecoilCallback } from "recoil";
import { configModalState, draftConfigState } from "../states/configModalState";
import { drawModeState } from "../states/drawModeState";
import { svgObjectStates, useSvgObjects } from "../states/svgObjectState";
import { usePreview } from "./usePreview";
import { useSelect } from "./useSelect";

const textConfig = new Map([["text", ""]]);

export const useResetPreview = () => {
  const { deletePreview, updatePreview } = usePreview();
  const { resetPreviewGroup } = useSvgObjects();
  const { resetSelect } = useSelect();

  const openModal = useRecoilCallback(
    ({ set }) =>
      (
        type: ConfigType,
        id: SvgId | "preview",
        configMap: Map<string, string>
      ) => {
        set(configModalState, { isOpen: true, type, id });
        set(draftConfigState, new Map(configMap));
      },
    []
  );

  const resetPreview = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        resetPreviewGroup();

        switch (drawMode) {
          case "text": {
            const configMap = snapshot
              .getLoadable(svgObjectStates("preview"))
              .getValue()?.configMap;
            updatePreview({
              type: "text",
              configMap: configMap ?? new Map(textConfig),
              style: { stroke: "black" },
            });
            openModal("text", "preview", configMap ?? new Map(textConfig));
            break;
          }
          case "copy":
            deletePreview();
            break;
          case "move":
            deletePreview();
            break;
          default:
            resetSelect();
            deletePreview();
        }
      },
    [updatePreview, deletePreview, openModal, resetSelect, resetPreviewGroup]
  );

  return {
    resetPreview,
  };
};
