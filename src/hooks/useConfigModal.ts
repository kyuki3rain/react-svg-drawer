import { useCallback } from "react";
import { useConfigModal } from "../states/configModalState";
import { useSetDrawMode } from "../states/drawModeState";
import { useSvgObject } from "../states/svgObjectState";

export const useConfig = () => {
  const { isOpen, id, type, configList, closeModal } = useConfigModal();
  const { svgObject, addOrUpdateSvgObject } = useSvgObject(id);
  const { changeMode } = useSetDrawMode();

  const saveConfig = useCallback(
    (configMap: Map<string, string>) => {
      if (!svgObject || !svgObject.configMap) return;

      if (
        ![...configMap].every(
          (c) => svgObject.configMap?.get(c[0]) !== undefined
        )
      ) {
        console.error("configMap is not matched to svgObject.configMap!");
        return;
      }
      addOrUpdateSvgObject({
        ...svgObject,
        configMap: new Map([...svgObject.configMap, ...configMap]),
      });

      closeModal();
    },
    [addOrUpdateSvgObject, closeModal, svgObject]
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
