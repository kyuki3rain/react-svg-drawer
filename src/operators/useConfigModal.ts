import { useCallback } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { configModalState, draftConfigState } from "../states/configModalState";
import { useSetDrawMode } from "../states/drawModeState";
import { svgObjectStates, useSetSvgObject } from "../states/svgObjectState";

export const useConfigModal = () => {
  const configModal = useRecoilValue(configModalState);
  const { addOrUpdateSvgObject } = useSetSvgObject(configModal.id);
  const { changeMode } = useSetDrawMode();
  const [draftConfigs, setDraftConfigs] = useRecoilState(draftConfigState);

  const closeModal = useRecoilCallback(
    ({ set }) =>
      () => {
        set(configModalState, {
          isOpen: false,
          type: "none",
          id: "preview",
          configList: null,
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
        addOrUpdateSvgObject({
          ...obj,
          configMap: new Map([...obj.configMap, ...configMap]),
        });

        closeModal();
      },
    [addOrUpdateSvgObject, closeModal]
  );

  const closeModalWithoutMode = useCallback(() => {
    closeModal();
    changeMode("selector");
  }, [changeMode, closeModal]);

  const onChange = useCallback(
    (key: string, value: string) => {
      setDraftConfigs((prev) => new Map(prev.set(key, value)));
    },
    [setDraftConfigs]
  );

  const handleClose = useCallback(() => {
    closeModalWithoutMode();
    setDraftConfigs(new Map());
  }, [closeModalWithoutMode, setDraftConfigs]);

  return {
    type: configModal.type,
    isOpen: configModal.isOpen,
    draftConfigs,
    onChange,
    handleClose,
    saveConfig,
  };
};
