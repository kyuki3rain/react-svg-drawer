import { useCallback } from "react";
import { useRecoilCallback } from "recoil";
import { useConfigModal } from "../states/configModalState";
import { useSetDrawMode } from "../states/drawModeState";
import { svgObjectStates, useSetSvgObject } from "../states/svgObjectState";

export const useConfig = () => {
  const { isOpen, id, type, configList, closeModal } = useConfigModal();
  const { addOrUpdateSvgObject } = useSetSvgObject(id);
  const { changeMode } = useSetDrawMode();

  const saveConfig = useRecoilCallback(
    ({ snapshot }) =>
      (configMap: Map<string, string>) => {
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
    [addOrUpdateSvgObject, closeModal, id]
  );

  const closeModalWithoutMode = useCallback(() => {
    closeModal();
    changeMode("selector");
  }, [changeMode, closeModal]);

  return {
    configList,
    type,
    isOpen,
    saveConfig,
    closeModalWithoutMode,
  };
};
