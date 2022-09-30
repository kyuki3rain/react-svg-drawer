import { atom } from "recoil";

type ConfigModalState = {
  id: SvgId | "preview" | "select";
  isOpen: boolean;
  type: ConfigType;
};

export const configModalState = atom<ConfigModalState>({
  key: "configModalState",
  default: {
    isOpen: false,
    type: "none",
    id: "preview",
  },
});

export const draftConfigState = atom<Map<string, string>>({
  key: "draftConfigState",
  default: new Map(),
});
