import { selector } from "recoil";
import { logIndexState, logsState } from "../states/logState";

export const undoEnableSelector = selector({
  key: "undoEnableSelector",
  get: ({ get }) => get(logIndexState) > 1,
});

export const redoEnableSelector = selector({
  key: "redoEnableSelector",
  get: ({ get }) => get(logIndexState) < get(logsState).length,
});
