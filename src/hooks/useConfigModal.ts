import { useCallback } from "react";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useSvgObject } from "../operators/useSvgObject";
import { configModalState, draftConfigState } from "../states/configModalState";
import { drawModeState } from "../states/drawModeState";
import { svgObjectStates } from "../states/svgObjectState";

export const useConfigModal = () => {
  const configModal = useRecoilValue(configModalState);
  const { updateObject } = useSvgObject();
  const [draftConfigs, setDraftConfigs] = useRecoilState(draftConfigState);
  const setDrawMode = useSetRecoilState(drawModeState);

  const changeMode = useCallback(
    (mode: DrawMode) => {
      setDrawMode((prev) => (prev === mode ? prev : mode));
    },
    [setDrawMode]
  );

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
        updateObject({
          ...obj,
          configMap: new Map([...obj.configMap, ...configMap]),
        });

        closeModal();
      },
    [updateObject, closeModal]
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
