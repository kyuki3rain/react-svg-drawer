import { useCallback } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useChangeMode } from "../operators/useChangeMode";
import { useDraftConfig } from "../operators/useDraftConfig";
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

  const closeModal = useRecoilCallback(
    ({ set }) =>
      () => {
        set(configModalState, {
          isOpen: false,
          type: "none" as const,
          id: "preview",
        });
      },
    []
  );

  const saveConfig = useRecoilCallback(
    ({ snapshot }) =>
      (configMap: Map<string, string>) => {
        const id = snapshot.getLoadable(configModalState).getValue().id;
        const obj = snapshot.getLoadable(svgObjectStates(id)).getValue();
        if (!obj || !obj.configMap) return;

        if (
          ![...configMap].every((c) => obj.configMap?.get(c[0]) !== undefined)
        ) {
          console.error("configMap is not matched to obj.configMap!");
          return;
        }

        if (id === "preview") {
          updatePreview({
            ...obj,
            configMap: new Map([...obj.configMap, ...configMap]),
          });
        } else {
          updateObject({
            ...obj,
            configMap: new Map([...obj.configMap, ...configMap]),
          });
        }

        closeModal();
      },
    [closeModal, updatePreview, updateObject]
  );

  const closeModalWithoutMode = useCallback(() => {
    closeModal();
    changeMode("selector");
  }, [changeMode, closeModal]);

  const onChange = useCallback(
    (key: string, value: string) => updateDraft(key, value),
    [updateDraft]
  );

  const handleClose = useCallback(() => {
    closeModalWithoutMode();
    resetDraft();
  }, [closeModalWithoutMode, resetDraft]);

  return {
    type: configModal.type,
    isOpen: configModal.isOpen,
    draftConfigs,
    onChange,
    handleClose,
    saveConfig,
  };
};
