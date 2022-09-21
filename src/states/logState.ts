import { atom } from "recoil";

type Log = {
  objects: SvgObject[];
};

export const logsState = atom({
  key: "logs",
  default: [] as Log[],
});

export const logIndexState = atom({
  key: "logIndex",
  default: 0,
});

export const stopLogState = atom({
  key: "stopLog",
  default: false,
});
