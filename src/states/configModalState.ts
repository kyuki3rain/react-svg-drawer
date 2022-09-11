import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type ConfigModalState = {
  id: SvgId;
  isOpen: boolean;
  configList: ObjectConfigs | null;
  type: ConfigType;
};

const configModalState = atom({
  key: "configModalState",
  default: {
    isOpen: false,
    type: "none",
  } as ConfigModalState,
});

export const useSetConfigModal = () => {
  const setConfigModal = useSetRecoilState(configModalState);

  const openModal = (
    type: ConfigType,
    id: SvgId,
    configList: ObjectConfigs
  ) => {
    setConfigModal({ isOpen: true, type, configList, id });
  };

  const closeModal = () => {
    setConfigModal({
      isOpen: false,
      type: "none",
      id: "none" as SvgId,
      configList: null,
    });
  };

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
