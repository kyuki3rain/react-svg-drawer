import { atom } from "recoil";

type ConfigModalState = {
  id: SvgId | "preview";
  isOpen: boolean;
  configList: ObjectConfigs | null;
  type: ConfigType;
};

export const configModalState = atom<ConfigModalState>({
  key: "configModalState",
  default: {
    isOpen: false,
    type: "none",
    id: "preview",
    configList: null,
  },
});

export const draftConfigState = atom<Map<string, string>>({
  key: "draftConfigState",
  default: new Map(),
});
