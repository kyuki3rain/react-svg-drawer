import { useRecoilCallback } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { configModalState, draftConfigState } from "../states/configModalState";
import { drawModeState } from "../states/drawModeState";
import { svgObjectListState, svgObjectStates } from "../states/svgObjectState";
import { usePreview } from "./usePreview";
import { useSelect } from "./useSelect";

const textConfig = new Map([["text", ""]]);

export const useResetPreview = () => {
  const { deletePreview, updatePreview } = usePreview();
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

  const resetPreviewGroup = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (!obj || obj.type !== "group" || !obj.fixedPoint) return;

        if (obj.isCopy) {
          obj.objectIds.map((id) => {
            set(svgObjectStates(id), null);
          });
        } else {
          const correction = vp.sub(vp.zero(), obj.firstFixedPoint);
          obj.objectIds.map((id) =>
            set(svgObjectStates(id), (prev) => {
              if (!prev) return prev;
              if (!prev.fixedPoint) return prev;
              return (
                prev && {
                  ...prev,
                  fixedPoint: vp.sub(prev.fixedPoint, correction),
                }
              );
            })
          );
          set(svgObjectListState, (prev) => {
            obj.objectIds.map((id) => prev.add(id));
            return new Set(prev);
          });
        }
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
