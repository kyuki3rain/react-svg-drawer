import { useRecoilCallback } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { drawModeState } from "../states/drawModeState";
import { svgObjectListState, svgObjectStates } from "../states/svgObjectState";
import { useHandleConfigModal } from "./useHandleConfigModal";
import { usePreview } from "./usePreview";

const textConfig = new Map([["text", ""]]);

export const useResetPreview = () => {
  const { deletePreview, updatePreview } = usePreview();
  const { openModal } = useHandleConfigModal();

  const resetPreviewGroup = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (!obj || obj.type !== "group" || !obj.fixedPoint) return;

        const correction = vp.sub(vp.zero(), obj.firstFixedPoint);
        obj.objectIds.map((id) =>
          set(svgObjectStates(id), (prev) => {
            if (!prev) return prev;
            if (!prev.fixedPoint) return prev;
            return (
              prev && {
                ...prev,
                fixedPoint: vp.sub(
                  prev.fixedPoint,
                  correction
                ) as VirtualAbsolute,
              }
            );
          })
        );
        set(svgObjectListState, (prev) => {
          obj.objectIds.map((id) => prev.add(id));
          return new Set(prev);
        });
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
              style: { stroke: "black", strokeWidth: 1, fill: "none" },
              area: {
                upperLeft: vp.zero() as VirtualAbsolute,
                bottomRight: vp.zero() as VirtualAbsolute,
              },
            });
            openModal("text", "preview", configMap ?? new Map(textConfig));
            break;
          }
          default:
            deletePreview();
        }
      },
    [updatePreview, deletePreview, openModal, resetPreviewGroup]
  );

  return {
    resetPreview,
  };
};
