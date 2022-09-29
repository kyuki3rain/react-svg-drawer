import { useRecoilCallback } from "recoil";
import { configModalState, draftConfigState } from "../states/configModalState";

export const useHandleConfigModal = () => {
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

  return {
    openModal,
    closeModal,
  };
};
