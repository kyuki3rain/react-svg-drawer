import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type ConfigModalState = {
  id: SvgId | "preview";
  isOpen: boolean;
  configList: ObjectConfigs | null;
  type: ConfigType;
};

const configModalState = atom<ConfigModalState>({
  key: "configModalState",
  default: {
    isOpen: false,
    type: "none",
    id: "preview",
    configList: null,
  },
});

export const useSetConfigModal = () => {
  const setConfigModal = useSetRecoilState(configModalState);

  const openModal = useCallback(
    (type: ConfigType, id: SvgId | "preview", configList: ObjectConfigs) => {
      setConfigModal({ isOpen: true, type, configList, id });
    },
    [setConfigModal]
  );

  const closeModal = useCallback(() => {
    setConfigModal({
      isOpen: false,
      type: "none",
      id: "preview",
      configList: null,
    });
  }, [setConfigModal]);

  return {
    openModal,
    closeModal,
  };
};

export const useConfigModal = () => {
  const configModal = useRecoilValue(configModalState);
  const setConfigModal = useSetConfigModal();

  return {
    ...configModal,
    ...setConfigModal,
  };
};
