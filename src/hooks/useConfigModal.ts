import { useCallback } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useChangeMode } from "../operators/useChangeMode";
import { useDraftConfig } from "../operators/useDraftConfig";
import { useHandleConfigModal } from "../operators/useHandleConfigModal";
import { usePreview } from "../operators/usePreview";
import { useSvgObject } from "../operators/useSvgObject";
import { configModalState, draftConfigState } from "../states/configModalState";
import { svgObjectStates } from "../states/svgObjectState";

export const useConfigModal = () => {
  const configModal = useRecoilValue(configModalState);
  const draftConfigs = useRecoilValue(draftConfigState);
  const { updateObject } = useSvgObject();
  const { updatePreview } = usePreview();
  const { changeMode } = useChangeMode();
  const { updateDraft, resetDraft } = useDraftConfig();
  const { closeModal } = useHandleConfigModal();

  const saveConfig = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const id = snapshot.getLoadable(configModalState).getValue().id;
        const obj = snapshot.getLoadable(svgObjectStates(id)).getValue();
        const draftConfigs = snapshot.getLoadable(draftConfigState).getValue();
        if (!obj || !obj.configMap) return;

        if (
          ![...draftConfigs].every(
            (c) => obj.configMap?.get(c[0]) !== undefined
          )
        ) {
          console.error("configMap is not matched to obj.configMap!");
          return;
        }

        if (id === "preview") {
          updatePreview({
            ...obj,
            configMap: new Map([...obj.configMap, ...draftConfigs]),
          });
        } else {
          updateObject({
            ...obj,
            configMap: new Map([...obj.configMap, ...draftConfigs]),
          });
        }
        closeModal();
      },
    [closeModal, updatePreview, updateObject]
  );

  const onChange = useCallback(
    (key: string, value: string) => updateDraft(key, value),
    [updateDraft]
  );

  const handleClose = useCallback(() => {
    closeModal();
    changeMode("selector");
    resetDraft();
  }, [changeMode, closeModal, resetDraft]);

  return {
    type: configModal.type,
    isOpen: configModal.isOpen,
    draftConfigs,
    onChange,
    handleClose,
    saveConfig,
  };
};
